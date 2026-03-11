import { r as readDB, b as findSessionByToken, f as findCodeByEmail } from '../../../chunks/db_g4la_CzZ.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const GET = async ({ request }) => {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({
        error: "No authorization token provided"
      }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const token = authHeader.substring(7);
    const db = readDB();
    const session = findSessionByToken(db, token);
    if (!session) {
      return new Response(JSON.stringify({
        error: "Invalid or expired session"
      }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const accessCode = findCodeByEmail(db, session.email);
    if (!accessCode) {
      return new Response(JSON.stringify({
        error: "User not found"
      }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!accessCode.active) {
      return new Response(JSON.stringify({
        error: "Account deactivated"
      }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({
      success: true,
      email: session.email,
      remainingGenerations: accessCode.maxGenerations - accessCode.usedGenerations,
      maxGenerations: accessCode.maxGenerations,
      usedGenerations: accessCode.usedGenerations
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Session check error:", error);
    return new Response(JSON.stringify({
      error: "Session check failed"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
