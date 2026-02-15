import type { APIRoute } from 'astro';
import { readDB, writeDB, findCodeByEmail, hashPassword, createSession } from '../../../lib/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, password } = body as { email: string; password: string };

    // Validate input
    if (!email || !password) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: email, password' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = readDB();

    // Find the access code by email
    const accessCode = findCodeByEmail(db, email);
    
    if (!accessCode) {
      return new Response(JSON.stringify({ 
        error: 'Invalid email or password' 
      }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!accessCode.active) {
      return new Response(JSON.stringify({ 
        error: 'Your account has been deactivated' 
      }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify password
    const hashedPassword = hashPassword(password);
    if (accessCode.password !== hashedPassword) {
      return new Response(JSON.stringify({ 
        error: 'Invalid email or password' 
      }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create session
    const session = createSession(db, email.toLowerCase(), accessCode.code);

    writeDB(db);

    return new Response(JSON.stringify({ 
      success: true,
      token: session.token,
      email: accessCode.email,
      remainingGenerations: accessCode.maxGenerations - accessCode.usedGenerations
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ 
      error: 'Login failed' 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
