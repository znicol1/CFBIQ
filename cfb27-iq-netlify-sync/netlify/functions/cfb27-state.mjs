import { getStore } from "@netlify/blobs";

const STORE_NAME = "cfb27-iq-state";
const STATE_KEY = "primary";

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function syncCodeFromRequest(request) {
  return request.headers.get("x-cfb27-sync-code") || "";
}

function requireSyncCode(request) {
  const expected = process.env.CFB27_SYNC_CODE;
  if (!expected) {
    return { ok: false, response: jsonResponse({ error: "Missing CFB27_SYNC_CODE on Netlify." }, 500) };
  }
  if (syncCodeFromRequest(request) !== expected) {
    return { ok: false, response: jsonResponse({ error: "Invalid sync code." }, 401) };
  }
  return { ok: true };
}

export default async function handler(request) {
  const auth = requireSyncCode(request);
  if (!auth.ok) return auth.response;

  const store = getStore(STORE_NAME);

  if (request.method === "GET") {
    const record = await store.get(STATE_KEY, { type: "json" });
    return jsonResponse(record || { state: null, updatedAt: null });
  }

  if (request.method === "PUT") {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object" || !body.state) {
      return jsonResponse({ error: "Expected JSON body with a state object." }, 400);
    }
    const record = {
      state: body.state,
      updatedAt: new Date().toISOString(),
    };
    await store.setJSON(STATE_KEY, record);
    return jsonResponse({ ok: true, updatedAt: record.updatedAt });
  }

  return jsonResponse({ error: "Method not allowed." }, 405);
}

export const config = {
  path: "/api/cfb27-state",
};

