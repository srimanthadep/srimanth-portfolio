import "dotenv/config";
import admin from "firebase-admin";

const serviceAccountB64 = process.env.FIREBASE_SERVICE_ACCOUNT_B64;

if (!serviceAccountB64) {
  console.error("Missing FIREBASE_SERVICE_ACCOUNT_B64 environment variable!");
}

if (serviceAccountB64 && !admin.apps.length) {
  try {
    const saText = Buffer.from(serviceAccountB64, 'base64').toString('utf8');
    const sa = JSON.parse(saText);
    
    // Ensure we have real newlines in the private key
    if (sa.private_key && typeof sa.private_key === 'string') {
      sa.private_key = sa.private_key.replace(/\\n/g, '\n');
    }

    admin.initializeApp({
      credential: admin.credential.cert(sa),
    });
    console.log("Firebase Admin initialized successfully.");
  } catch (error: any) {
    console.error("Failed to initialize Firebase Admin:", error.message);
  }
}

export const db = admin.firestore();
export const auth = admin.auth();
