import type { APIRoute } from 'astro';
import { readDB, writeDB, generateAccessCode, type AccessCode } from '../../../lib/db';

export const prerender = false;

const ADMIN_PASSWORD = 'TEM-admin-2026!';

function checkAdminAuth(request: Request): boolean {
  const authHeader = request.headers.get('X-Admin-Password');
  return authHeader === ADMIN_PASSWORD;
}

// GET: List all codes
export const GET: APIRoute = async ({ request }) => {
  if (!checkAdminAuth(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const db = readDB();
    
    // Return codes with sanitized data (no passwords)
    const codes = db.accessCodes.map(code => ({
      code: code.code,
      email: code.email,
      maxGenerations: code.maxGenerations,
      usedGenerations: code.usedGenerations,
      createdAt: code.createdAt,
      registeredAt: code.registeredAt,
      active: code.active,
      note: code.note,
      isRegistered: !!code.email
    }));

    return new Response(JSON.stringify({ 
      success: true,
      codes 
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Admin codes list error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch codes' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST: Create new code
export const POST: APIRoute = async ({ request }) => {
  if (!checkAdminAuth(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await request.json();
    const { maxGenerations = 10, note = '' } = body as { maxGenerations?: number; note?: string };

    const db = readDB();
    
    // Generate unique code
    let newCode: string;
    do {
      newCode = generateAccessCode();
    } while (db.accessCodes.some(c => c.code === newCode));

    const accessCode: AccessCode = {
      code: newCode,
      email: null,
      password: null,
      maxGenerations: Math.max(1, Math.min(100, maxGenerations)), // Clamp between 1-100
      usedGenerations: 0,
      createdAt: new Date().toISOString().split('T')[0],
      registeredAt: null,
      active: true,
      note: note || undefined
    };

    db.accessCodes.push(accessCode);
    writeDB(db);

    return new Response(JSON.stringify({ 
      success: true,
      code: accessCode 
    }), { 
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Admin create code error:', error);
    return new Response(JSON.stringify({ error: 'Failed to create code' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// DELETE: Deactivate a code
export const DELETE: APIRoute = async ({ request }) => {
  if (!checkAdminAuth(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await request.json();
    const { code } = body as { code: string };

    if (!code) {
      return new Response(JSON.stringify({ error: 'Code is required' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = readDB();
    const accessCode = db.accessCodes.find(c => c.code === code);

    if (!accessCode) {
      return new Response(JSON.stringify({ error: 'Code not found' }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    accessCode.active = false;
    writeDB(db);

    return new Response(JSON.stringify({ 
      success: true,
      message: `Code ${code} has been deactivated` 
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Admin delete code error:', error);
    return new Response(JSON.stringify({ error: 'Failed to deactivate code' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
