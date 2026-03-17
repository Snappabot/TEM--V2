-- Campaign Tracking Table for Troweled Earth Melbourne
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/djtxbohjjpkhzhwlnrtu/sql/new

CREATE TABLE IF NOT EXISTS campaigns (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name         text NOT NULL,
  channel      text NOT NULL CHECK (channel IN ('Google Ads', 'Meta Ads', 'Organic', 'Email', 'Referral', 'Direct', 'Other')),
  status       text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'draft')),
  budget       numeric(10, 2),
  spend        numeric(10, 2) DEFAULT 0,
  start_date   date,
  end_date     date,
  -- UTM fields
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  utm_content  text,
  utm_term     text,
  -- Results (manually updated or imported)
  impressions  integer DEFAULT 0,
  clicks       integer DEFAULT 0,
  leads        integer DEFAULT 0,
  conversions  integer DEFAULT 0,
  -- Meta
  notes        text,
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_campaigns_updated_at ON campaigns;
CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS campaigns_channel_idx ON campaigns (channel);
CREATE INDEX IF NOT EXISTS campaigns_status_idx ON campaigns (status);
CREATE INDEX IF NOT EXISTS campaigns_created_at_idx ON campaigns (created_at DESC);

-- Note: No RLS needed — this table is accessed only via server-side admin API
-- The API endpoint is protected by the TEM admin password.
