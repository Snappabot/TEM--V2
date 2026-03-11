import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DB_PATH = path.join(process.cwd(), "src/data/visualizer-db.json");
function readDB() {
  try {
    const data = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return {
      accessCodes: [],
      sessions: [],
      generationLog: []
    };
  }
}
function writeDB(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}
function hashPassword(password) {
  return crypto.createHash("sha256").update(password + "tem-salt").digest("hex");
}
function generateSessionToken() {
  return crypto.randomUUID();
}
function generateAccessCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const part1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  const part2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `TEM-${part1}-${part2}`;
}
function findCodeByCode(db, code) {
  return db.accessCodes.find((c) => c.code === code);
}
function findCodeByEmail(db, email) {
  return db.accessCodes.find((c) => c.email?.toLowerCase() === email.toLowerCase());
}
function findSessionByToken(db, token) {
  const session = db.sessions.find((s) => s.token === token);
  if (session && new Date(session.expiresAt) > /* @__PURE__ */ new Date()) {
    return session;
  }
  return void 0;
}
function createSession(db, email, code) {
  const session = {
    token: generateSessionToken(),
    email,
    code,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3).toISOString()
    // 30 days
  };
  db.sessions.push(session);
  return session;
}
const rateLimitMap = /* @__PURE__ */ new Map();
function checkRateLimit(email, maxRequests = 3, windowMs = 6e4) {
  const now = Date.now();
  const timestamps = rateLimitMap.get(email) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);
  if (validTimestamps.length >= maxRequests) {
    return false;
  }
  validTimestamps.push(now);
  rateLimitMap.set(email, validTimestamps);
  return true;
}

export { findCodeByCode as a, findSessionByToken as b, createSession as c, checkRateLimit as d, findCodeByEmail as f, generateAccessCode as g, hashPassword as h, readDB as r, writeDB as w };
