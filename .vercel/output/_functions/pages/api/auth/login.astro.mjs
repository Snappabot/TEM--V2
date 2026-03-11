import { r as readDB, f as findCodeByEmail, h as hashPassword, c as createSession, w as writeDB } from '../../../chunks/db_g4la_CzZ.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return new Response(JSON.stringify({
        error: "Missing required fields: email, password"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const db = readDB();
    const accessCode = findCodeByEmail(db, email);
    if (!accessCode) {
      return new Response(JSON.stringify({
        error: "Invalid email or password"
      }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!accessCode.active) {
      return new Response(JSON.stringify({
        error: "Your account has been deactivated"
      }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const hashedPassword = hashPassword(password);
    if (accessCode.password !== hashedPassword) {
      return new Response(JSON.stringify({
        error: "Invalid email or password"
      }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const session = createSession(db, email.toLowerCase(), accessCode.code);
    writeDB(db);
    return new Response(JSON.stringify({
      success: true,
      token: session.token,
      email: accessCode.email,
      remainingGenerations: accessCode.maxGenerations - accessCode.usedGenerations
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({
      error: "Login failed"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
