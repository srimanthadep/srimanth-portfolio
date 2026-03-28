import { Hono, type Context, type Next } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { getCookie, setCookie } from "hono/cookie";
import { db } from "../src/db";
import { experiences, education, projects, skills, siteSettings } from "../src/db/schema";
import { eq } from "drizzle-orm";
import { verifyToken, createToken } from "./auth";
import * as dotenv from "dotenv";

dotenv.config();

const app = new Hono();

// Middlewares
app.use("*", logger());
app.use("*", cors({
  origin: "*", // Allow all for now, can be restricted later
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

// PUBLIC: Get all portfolio data
app.get("/api/portfolio", async (c) => {
  try {
    const [exp, edu, proj, sk, settings] = await Promise.all([
      db.select().from(experiences).orderBy(experiences.id),
      db.select().from(education).orderBy(education.id),
      db.select().from(projects).orderBy(projects.id),
      db.select().from(skills).orderBy(skills.id),
      db.select().from(siteSettings),
    ]);

    const settingsObj = settings.reduce((acc: Record<string, string>, curr) => {
      acc[curr.key] = curr.value;
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
    const { password } = await c.req.json();
    if (password === process.env.ADMIN_PASSWORD) {
      const token = await createToken({ admin: true });
      setCookie(c, "auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 60 * 60 * 24, // 24 hours
      });
      return c.json({ success: true, token });
    }
    return c.json({ error: "Invalid password" }, 401);
  } catch (error) {
    return c.json({ error: "Login failed" }, 500);
  }
});

// ADMIN: Update Experiences
app.post("/api/admin/experiences", authMiddleware, async (c) => {
  const body = await c.req.json();
  const res = await db.insert(experiences).values(body).returning();
  return c.json(res[0]);
});

app.put("/api/admin/experiences/:id", authMiddleware, async (c) => {
  const idStr = c.req.param("id");
  if (!idStr) return c.json({ error: "Missing ID" }, 400);
  const id = parseInt(idStr);
  const body = await c.req.json();
  const res = await db.update(experiences).set(body).where(eq(experiences.id, id)).returning();
  return c.json(res[0]);
});

app.delete("/api/admin/experiences/:id", authMiddleware, async (c) => {
  const idStr = c.req.param("id");
  if (!idStr) return c.json({ error: "Missing ID" }, 400);
  const id = parseInt(idStr);
  await db.delete(experiences).where(eq(experiences.id, id));
  return c.json({ success: true });
});

// ADMIN: Update Projects
app.post("/api/admin/projects", authMiddleware, async (c) => {
  const body = await c.req.json();
  const res = await db.insert(projects).values(body).returning();
  return c.json(res[0]);
});

app.put("/api/admin/projects/:id", authMiddleware, async (c) => {
  const idStr = c.req.param("id");
  if (!idStr) return c.json({ error: "Missing ID" }, 400);
  const id = parseInt(idStr);
  const body = await c.req.json();
  const res = await db.update(projects).set(body).where(eq(projects.id, id)).returning();
  return c.json(res[0]);
});

app.delete("/api/admin/projects/:id", authMiddleware, async (c) => {
  const idStr = c.req.param("id");
  if (!idStr) return c.json({ error: "Missing ID" }, 400);
  const id = parseInt(idStr);
  await db.delete(projects).where(eq(projects.id, id));
  return c.json({ success: true });
});

// ADMIN: Update Education
app.post("/api/admin/education", authMiddleware, async (c) => {
  const body = await c.req.json();
  const res = await db.insert(education).values(body).returning();
  return c.json(res[0]);
});

app.put("/api/admin/education/:id", authMiddleware, async (c) => {
  const idStr = c.req.param("id");
  if (!idStr) return c.json({ error: "Missing ID" }, 400);
  const id = parseInt(idStr);
  const body = await c.req.json();
  const res = await db.update(education).set(body).where(eq(education.id, id)).returning();
  return c.json(res[0]);
});

app.delete("/api/admin/education/:id", authMiddleware, async (c) => {
  const idStr = c.req.param("id");
  if (!idStr) return c.json({ error: "Missing ID" }, 400);
  const id = parseInt(idStr);
  await db.delete(education).where(eq(education.id, id));
  return c.json({ success: true });
});

// ADMIN: Update Skills
app.post("/api/admin/skills", authMiddleware, async (c) => {
  const body = await c.req.json();
  const res = await db.insert(skills).values(body).returning();
  return c.json(res[0]);
});

app.put("/api/admin/skills/:id", authMiddleware, async (c) => {
  const idStr = c.req.param("id");
  if (!idStr) return c.json({ error: "Missing ID" }, 400);
  const id = parseInt(idStr);
  const body = await c.req.json();
  const res = await db.update(skills).set(body).where(eq(skills.id, id)).returning();
  return c.json(res[0]);
});

app.delete("/api/admin/skills/:id", authMiddleware, async (c) => {
  const idStr = c.req.param("id");
  if (!idStr) return c.json({ error: "Missing ID" }, 400);
  const id = parseInt(idStr);
  await db.delete(skills).where(eq(skills.id, id));
  return c.json({ success: true });
});

// ADMIN: Update Site Settings
app.put("/api/admin/settings", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    for (const [key, value] of Object.entries(body)) {
      const existing = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
      if (existing.length > 0) {
        await db.update(siteSettings).set({ value: value as string }).where(eq(siteSettings.key, key));
      } else {
        await db.insert(siteSettings).values({ key, value: value as string });
      }
    }
    return c.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Update failed";
    return c.json({ error: message }, 500);
  }
});

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
