-- Migration: add 'bidding' to auction_state enum + bid columns on auction_sessions

-- 1) Extend the auction_state enum with 'bidding'
alter type auction_state add value if not exists 'bidding' after 'player_reveal';

-- 2) Add bid-tracking columns to auction_sessions (idempotent)
alter table public.auction_sessions
  add column if not exists current_bid_amount   int     not null default 1,
  add column if not exists current_bid_captain_id text  references public.captains(id),
  add column if not exists strike_count          int     not null default 0,
  add column if not exists bid_deadline          timestamptz;
