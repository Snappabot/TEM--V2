import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const prerender = false;

const ADMIN_PASSWORD = 'TEM-admin-2026!';

function checkAuth(request: Request): boolean {
  return request.headers.get('X-Admin-Password') === ADMIN_PASSWORD;
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// GET: List all campaigns
export const GET: APIRoute = async ({ request }) => {
  if (!checkAuth(request)) return json({ error: 'Unauthorized' }, 401);

  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return json({ error: error.message }, 500);
  return json({ success: true, campaigns: data });
};

// POST: Create campaign
export const POST: APIRoute = async ({ request }) => {
  if (!checkAuth(request)) return json({ error: 'Unauthorized' }, 401);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const {
    name, channel, status = 'active', budget, spend = 0,
    start_date, end_date,
    utm_source, utm_medium, utm_campaign, utm_content, utm_term,
    impressions = 0, clicks = 0, leads = 0, conversions = 0,
    notes,
  } = body as Record<string, unknown>;

  if (!name || !channel) return json({ error: 'name and channel are required' }, 400);

  const { data, error } = await supabase
    .from('campaigns')
    .insert([{
      name, channel, status, budget, spend,
      start_date, end_date,
      utm_source, utm_medium, utm_campaign, utm_content, utm_term,
      impressions, clicks, leads, conversions, notes,
    }])
    .select()
    .single();

  if (error) return json({ error: error.message }, 500);
  return json({ success: true, campaign: data }, 201);
};

// PUT: Update campaign
export const PUT: APIRoute = async ({ request }) => {
  if (!checkAuth(request)) return json({ error: 'Unauthorized' }, 401);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const { id, ...updates } = body as Record<string, unknown>;
  if (!id) return json({ error: 'id is required' }, 400);

  // Remove non-updatable fields
  delete updates.created_at;
  delete updates.updated_at;

  const { data, error } = await supabase
    .from('campaigns')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return json({ error: error.message }, 500);
  return json({ success: true, campaign: data });
};

// DELETE: Remove campaign
export const DELETE: APIRoute = async ({ request }) => {
  if (!checkAuth(request)) return json({ error: 'Unauthorized' }, 401);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const { id } = body as { id?: string };
  if (!id) return json({ error: 'id is required' }, 400);

  const { error } = await supabase.from('campaigns').delete().eq('id', id);
  if (error) return json({ error: error.message }, 500);
  return json({ success: true });
};
