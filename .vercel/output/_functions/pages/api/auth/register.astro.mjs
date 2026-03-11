import { r as readDB, a as findCodeByCode, f as findCodeByEmail, h as hashPassword, c as createSession, w as writeDB } from '../../../chunks/db_g4la_CzZ.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { code, email, password } = body;
    if (!code || !email || !password) {
      return new Response(JSON.stringify({
        error: "Missing required fields: code, email, password"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({
        error: "Invalid email format"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (password.length < 6) {
      return new Response(JSON.stringify({
        error: "Password must be at least 6 characters"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const db = readDB();
    const accessCode = findCodeByCode(db, code.toUpperCase());
    if (!accessCode) {
      return new Response(JSON.stringify({
        error: "Invalid access code"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!accessCode.active) {
      return new Response(JSON.stringify({
        error: "This access code has been deactivated"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (accessCode.email) {
      return new Response(JSON.stringify({
        error: "This access code has already been registered"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const existingEmail = findCodeByEmail(db, email);
    if (existingEmail) {
      return new Response(JSON.stringify({
        error: "This email is already registered"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    accessCode.email = email.toLowerCase();
    accessCode.password = hashPassword(password);
    accessCode.registeredAt = (/* @__PURE__ */ new Date()).toISOString();
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
    console.error("Registration error:", error);
    return new Response(JSON.stringify({
      error: "Registration failed"
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
