import { NextRequest, NextResponse } from "next/server";
import { auctionAction, getAuctionState } from "@/lib/server/state";
import { asNonEmptyString, badRequest, parseJSON, requireAdmin } from "@/lib/server/auth";

const allowedActions = new Set(["start_reveal", "open_selection", "pick", "next", "reset"] as const);

type AuctionAction = "start_reveal" | "open_selection" | "pick" | "next" | "reset";

export async function GET() {
  return NextResponse.json(getAuctionState());
}

export async function POST(req: NextRequest) {
  const blocked = requireAdmin(req);
  if (blocked) return blocked;

  const body = await parseJSON(req);
  if (!body) return badRequest("Invalid JSON body");

  const action = asNonEmptyString(body.action) as AuctionAction | null;
  const captainId = asNonEmptyString(body.captainId) ?? undefined;

  if (!action || !allowedActions.has(action)) {
    return badRequest("Invalid auction action");
  }

  const next = auctionAction(action, captainId);
  return NextResponse.json(next);
}
