import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DB_PATH = path.join(process.cwd(), 'src/data/visualizer-db.json');

export interface AccessCode {
  code: string;
  email: string | null;
  password: string | null;
  maxGenerations: number;
  usedGenerations: number;
  createdAt: string;
  registeredAt: string | null;
  active: boolean;
  note?: string;
}

export interface Session {
  token: string;
  email: string;
  code: string;
  createdAt: string;
  expiresAt: string;
}

export interface GenerationLogEntry {
  email: string;
  timestamp: string;
  prompt: string;
  ip: string;
}

export interface Database {
  accessCodes: AccessCode[];
  sessions: Session[];
  generationLog: GenerationLogEntry[];
}

export function readDB(): Database {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Return default structure if file doesn't exist
    return {
      accessCodes: [],
      sessions: [],
      generationLog: []
    };
  }
}

export function writeDB(db: Database): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + 'tem-salt').digest('hex');
}

export function generateSessionToken(): string {
  return crypto.randomUUID();
}

export function generateAccessCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const part1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const part2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `TEM-${part1}-${part2}`;
}

export function findCodeByCode(db: Database, code: string): AccessCode | undefined {
  return db.accessCodes.find(c => c.code === code);
}

export function findCodeByEmail(db: Database, email: string): AccessCode | undefined {
  return db.accessCodes.find(c => c.email?.toLowerCase() === email.toLowerCase());
}

export function findSessionByToken(db: Database, token: string): Session | undefined {
  const session = db.sessions.find(s => s.token === token);
  if (session && new Date(session.expiresAt) > new Date()) {
    return session;
  }
  return undefined;
}

export function createSession(db: Database, email: string, code: string): Session {
  const session: Session = {
    token: generateSessionToken(),
    email,
    code,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
  };
  db.sessions.push(session);
  return session;
}

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, number[]>();

export function checkRateLimit(email: string, maxRequests: number = 3, windowMs: number = 60000): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(email) || [];
  
  // Remove timestamps outside the window
  const validTimestamps = timestamps.filter(t => now - t < windowMs);
  
  if (validTimestamps.length >= maxRequests) {
    return false; // Rate limited
  }
  
  validTimestamps.push(now);
  rateLimitMap.set(email, validTimestamps);
  return true; // Allowed
}
