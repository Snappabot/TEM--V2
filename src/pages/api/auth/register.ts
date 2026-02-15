import type { APIRoute } from 'astro';
import { readDB, writeDB, findCodeByCode, findCodeByEmail, hashPassword, createSession } from '../../../lib/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { code, email, password } = body as { code: string; email: string; password: string };

    // Validate input
    if (!code || !email || !password) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: code, email, password' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ 
        error: 'Invalid email format' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate password length
    if (password.length < 6) {
      return new Response(JSON.stringify({ 
        error: 'Password must be at least 6 characters' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = readDB();

    // Find the access code
    const accessCode = findCodeByCode(db, code.toUpperCase());
    
    if (!accessCode) {
      return new Response(JSON.stringify({ 
        error: 'Invalid access code' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!accessCode.active) {
      return new Response(JSON.stringify({ 
        error: 'This access code has been deactivated' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (accessCode.email) {
      return new Response(JSON.stringify({ 
        error: 'This access code has already been registered' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if email is already registered with another code
    const existingEmail = findCodeByEmail(db, email);
    if (existingEmail) {
      return new Response(JSON.stringify({ 
        error: 'This email is already registered' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Register the code
    accessCode.email = email.toLowerCase();
    accessCode.password = hashPassword(password);
    accessCode.registeredAt = new Date().toISOString();

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
    console.error('Registration error:', error);
    return new Response(JSON.stringify({ 
      error: 'Registration failed' 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
