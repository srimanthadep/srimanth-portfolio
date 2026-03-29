import "dotenv/config";
import { Hono, type Context, type Next } from "hono";
import { handle } from "@hono/node-server/vercel";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { getCookie, setCookie } from "hono/cookie";
import { db } from "./firebase.js";
import { verifyToken, createToken } from "./auth.js";
import fs from "node:fs/promises";
import path from "node:path";
import { put, del } from "@vercel/blob";

const app = new Hono();

// Middlewares
app.use("*", logger());
app.use("*", cors({
  origin: (origin) => origin,
  credentials: true,
}));

// Auth check middleware
const authMiddleware = async (c: Context, next: Next) => {
  const token = getCookie(c, "auth_token") || c.req.header("Authorization")?.split(" ")[1];
  if (!token) return c.json({ error: "Unauthorized" }, 401);
  
  const payload = await verifyToken(token);
  if (!payload) return c.json({ error: "Unauthorized" }, 401);
  
  c.set("admin", payload);
  await next();
};

// API Routes
app.get("/api/health", (c) => c.text("OK"));

// Diagnostic Debug Route
app.get("/api/debug", async (c) => {
  let dbStatus = "Checking...";
  let dbError = null;

  try {
    await db.listCollections();
    dbStatus = "Connected";
  } catch (err: any) {
    dbStatus = "Failed";
    dbError = err.message;
  }

  return c.json({
    status: "OK",
    database: {
      status: dbStatus,
      error: dbError,
    },
    env: {
      has_firebase_project: !!process.env.FIREBASE_PROJECT_ID,
      has_admin_pass: !!process.env.ADMIN_PASSWORD,
      node_env: process.env.NODE_ENV,
    }
  });
});

// Helper to get all docs from a collection
async function getCollectionDocs(collectionName: string) {
  const snapshot = await db.collection(collectionName).get();
  return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
}

// PUBLIC: Get all portfolio data
app.get("/api/portfolio", async (c) => {
  try {
    const [exp, edu, proj, sk, settingsSnapshot] = await Promise.all([
      getCollectionDocs("experiences"),
      getCollectionDocs("education"),
      getCollectionDocs("projects"),
      getCollectionDocs("skills"),
      db.collection("site_settings").get(),
    ]);

    const settingsObj = settingsSnapshot.docs.reduce((acc: Record<string, string>, doc: any) => {
      const data = doc.data();
      acc[data.key] = data.value;
      return acc;
    }, {});

    return c.json({
      experiences: exp,
      education: edu,
      projects: proj,
      skills: sk,
      settings: settingsObj,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return c.json({ error: message }, 500);
  }
});

// AUTH: Admin Login
app.post("/api/auth/login", async (c) => {
  try {
    const body = await c.req.json().catch(() => ({}));
    const { password } = body;
    
    if (!process.env.ADMIN_PASSWORD) {
      return c.json({ error: "Server configuration error: ADMIN_PASSWORD missing" }, 500);
    }

    if (password === process.env.ADMIN_PASSWORD) {
      const token = await createToken({ admin: true });
      setCookie(c, "auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        maxAge: 60 * 60 * 24,
        path: "/",
      });
      return c.json({ success: true, token });
    }
    return c.json({ error: "Invalid password" }, 401);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return c.json({ error: "Login failed", details: message }, 500);
  }
});

// GENERIC ADMIN CRUD HELPERS
const handleAdminAction = async (c: Context, collection: string, method: string) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    
    if (method === "POST") {
      const docRef = await db.collection(collection).add({ ...body, createdAt: new Date() });
      const doc = await docRef.get();
      return c.json({ id: doc.id, ...doc.data() });
    }
    
    if (method === "PUT" && id) {
      await db.collection(collection).doc(id).update({ ...body, updatedAt: new Date() });
      const doc = await db.collection(collection).doc(id).get();
      return c.json({ id: doc.id, ...doc.data() });
    }
    
    if (method === "DELETE" && id) {
      await db.collection(collection).doc(id).delete();
      return c.json({ success: true });
    }
    
    return c.json({ error: "Invalid request" }, 400);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
};

// ADMIN: CRUD Endpoints
app.post("/api/admin/experiences", authMiddleware, (c) => handleAdminAction(c, "experiences", "POST"));
app.put("/api/admin/experiences/:id", authMiddleware, (c) => handleAdminAction(c, "experiences", "PUT"));
app.delete("/api/admin/experiences/:id", authMiddleware, (c) => handleAdminAction(c, "experiences", "DELETE"));

app.post("/api/admin/projects", authMiddleware, (c) => handleAdminAction(c, "projects", "POST"));
app.put("/api/admin/projects/:id", authMiddleware, (c) => handleAdminAction(c, "projects", "PUT"));
app.delete("/api/admin/projects/:id", authMiddleware, (c) => handleAdminAction(c, "projects", "DELETE"));

app.post("/api/admin/education", authMiddleware, (c) => handleAdminAction(c, "education", "POST"));
app.put("/api/admin/education/:id", authMiddleware, (c) => handleAdminAction(c, "education", "PUT"));
app.delete("/api/admin/education/:id", authMiddleware, (c) => handleAdminAction(c, "education", "DELETE"));

app.post("/api/admin/skills", authMiddleware, (c) => handleAdminAction(c, "skills", "POST"));
app.put("/api/admin/skills/:id", authMiddleware, (c) => handleAdminAction(c, "skills", "PUT"));
app.delete("/api/admin/skills/:id", authMiddleware, (c) => handleAdminAction(c, "skills", "DELETE"));

// ADMIN: Update Site Settings
app.put("/api/admin/settings", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const batch = db.batch();
    
    for (const [key, value] of Object.entries(body)) {
      const q = await db.collection("site_settings").where("key", "==", key).get();
      if (!q.empty) {
        batch.update(q.docs[0].ref, { value, updatedAt: new Date() });
      } else {
        const docRef = db.collection("site_settings").doc();
        batch.set(docRef, { key, value, createdAt: new Date() });
      }
    }
    
    await batch.commit();
    return c.json({ success: true });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// ADMIN: Resume File Management (Vercel Blob)
app.post("/api/admin/resume/upload", authMiddleware, async (c) => {
  try {
    const body = await c.req.parseBody();
    const file = body["file"] as File;
    
    if (!file) return c.json({ error: "No file uploaded" }, 400);
    
    // Upload to Vercel Blob
    const blob = await put(file.name || "resume.pdf", file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN
    });
    
    const publicUrl = blob.url;
    
    // Update settings in Firestore
    const q = await db.collection("site_settings").where("key", "==", "resume_url").get();
    if (!q.empty) {
      await q.docs[0].ref.update({ value: publicUrl, updatedAt: new Date() });
    } else {
      await db.collection("site_settings").add({ key: "resume_url", value: publicUrl, createdAt: new Date() });
    }
    
    return c.json({ success: true, url: publicUrl });
  } catch (error: any) {
    console.error("Vercel Blob upload error:", error.message);
    return c.json({ error: error.message }, 500);
  }
});

app.delete("/api/admin/resume/delete", authMiddleware, async (c) => {
  try {
    const q = await db.collection("site_settings").where("key", "==", "resume_url").get();
    if (q.empty || !q.docs[0].data().value) {
      return c.json({ error: "No resume found to delete" }, 404);
    }
    
    const resumeUrl = q.docs[0].data().value;
    
    // Delete from Vercel Blob if it's a blob URL
    if (resumeUrl.includes("vercel-storage.com")) {
      try {
        await del(resumeUrl, { token: process.env.BLOB_READ_WRITE_TOKEN });
      } catch (e: any) {
        console.warn("Vercel Blob delete failed or file not found:", e.message);
      }
    } else {
      // Cleanup local file if it was still there (legacy)
      const fileName = resumeUrl.startsWith("/") ? resumeUrl.slice(1) : resumeUrl;
      const filePath = path.join(process.cwd(), "public", fileName);
      try {
        await fs.unlink(filePath);
      } catch (e) {}
    }
    
    await q.docs[0].ref.update({ value: "", updatedAt: new Date() });
    
    return c.json({ success: true });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Vercel Handler
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const OPTIONS = handle(app);
export const PATCH = handle(app);

// RUN SERVER (For local dev)
if (process.env.NODE_ENV !== "production") {
  const port = parseInt(process.env.PORT || "3001");
  console.log(`Server is running on port ${port}`);
  serve({
    fetch: app.fetch,
    port
  });
}

export default app;
