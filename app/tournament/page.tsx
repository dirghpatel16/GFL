"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ScheduleCards } from "@/components/tournament/ScheduleCards";
import { fetchJSON } from "@/lib/services/http";
import { Captain, Tournament } from "@/lib/types/models";
import { scoringConfig, seasonConfig } from "@/lib/config/season";

interface PublicPayload {
  tournament: Tournament;
  captains: Captain[];
}

export default function TournamentPage() {
  const [data, setData] = useState<PublicPayload | null>(null);

  useEffect(() => {
    fetchJSON<PublicPayload>("/api/public").then(setData).catch(() => null);
  }, []);

  return (
    <div className="py-8 space-y-6">
      <section className="card p-5">
        <h1 className="section-title">GFL Season 2 Tournament</h1>
        <p className="mt-2 text-sm text-white/75">Entry Fee ₹{seasonConfig.entryFee} • Prize Pool ₹{seasonConfig.prizePool} • Timing {seasonConfig.timing}</p>
      </section>

      <section>
        <h2 className="section-title text-neon mb-4">Featured WOW Esports Maps</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="border border-white/10 bg-black/40 overflow-hidden relative group">
            {/* Map 1 Placeholder - User will replace image path */}
            <div className="aspect-video bg-white/5 flex items-center justify-center text-white/20 text-xs relative">
              <img src="/maps/map-15798.jpg" alt="Map 15798" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" onError={(e) => e.currentTarget.style.display = 'none'} />
              <span>Map Photo (15798)</span>
            </div>
            <div className="p-3">
              <p className="text-xs uppercase tracking-widest text-neon">Block 1 & 4</p>
              <h3 className="font-bold text-sm">4v4v4 Rotational Spawns</h3>
              <p className="text-xs text-white/50 mt-1">Code: 15798</p>
            </div>
          </div>
          <div className="border border-white/10 bg-black/40 overflow-hidden relative group">
            {/* Map 2 Placeholder */}
            <div className="aspect-video bg-white/5 flex items-center justify-center text-white/20 text-xs relative">
              <img src="/maps/map-51078.jpg" alt="Map 51078" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" onError={(e) => e.currentTarget.style.display = 'none'} />
              <span>Map Photo (51078)</span>
            </div>
            <div className="p-3">
              <p className="text-xs uppercase tracking-widest text-neon">Block 2 & 5</p>
              <h3 className="font-bold text-sm">4 rounds 4v4v4 bgis</h3>
              <p className="text-xs text-white/50 mt-1">Code: 51078</p>
            </div>
          </div>
          <div className="border border-white/10 bg-black/40 overflow-hidden relative group">
            {/* Map 3 Placeholder */}
            <div className="aspect-video bg-white/5 flex items-center justify-center text-white/20 text-xs relative">
              <img src="/maps/map-49546.jpg" alt="Map 49546" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" onError={(e) => e.currentTarget.style.display = 'none'} />
              <span>Map Photo (49546)</span>
            </div>
            <div className="p-3">
              <p className="text-xs uppercase tracking-widest text-neon">Block 3 & 6</p>
              <h3 className="font-bold text-sm">NEW 4v4v4 ESPORTS 5 ROUNDS</h3>
              <p className="text-xs text-white/50 mt-1">Code: 49546</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="card p-5">
          <h2 className="text-xl font-bold">Match Format & Points</h2>
          <ul className="mt-3 space-y-1 text-sm text-white/80">
            <li>• Season structure: 30 matches across 6 blocks (4/5/6 repeated twice)</li>
            <li>• 1st: {scoringConfig.normalRounds.placement.first} • 2nd: {scoringConfig.normalRounds.placement.second} • 3rd: {scoringConfig.normalRounds.placement.third}</li>
            <li>• Back-to-back chicken dinners: +{scoringConfig.bonuses.backToBackChicken}</li>
            <li>• Three back-to-back chicken dinners: +{scoringConfig.bonuses.threepeatChicken}</li>
          </ul>
          <h3 className="mt-4 font-semibold">Golden Rounds</h3>
          <ul className="mt-2 space-y-1 text-sm text-white/80">
            <li>• Map: {scoringConfig.goldenRounds.map}</li>
            <li>• 1st: {scoringConfig.goldenRounds.placement.first} • 2nd: {scoringConfig.goldenRounds.placement.second} • 3rd: {scoringConfig.goldenRounds.placement.third}</li>
            <li>• Each kill: +{scoringConfig.goldenRounds.killPoint}</li>
            <li>• Nominated players score x{scoringConfig.goldenRounds.nominatedMultiplier}</li>
          </ul>
        </article>

        <article className="card p-5">
          <h2 className="text-xl font-bold">Prize Breakdown</h2>
          <ul className="mt-3 space-y-1 text-sm text-white/80">
            <li>• 1st place: ₹{seasonConfig.prizes.first}</li>
            <li>• 2nd place: ₹{seasonConfig.prizes.second}</li>
            <li>• 3rd place: ₹{seasonConfig.prizes.third}</li>
          </ul>
          <h3 className="mt-4 font-semibold">Teams & Captains</h3>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {data?.captains?.length ? data.captains.map((c) => <div key={c.id} className="rounded border border-white/10 p-2 text-sm">{c.name} ({c.tag})</div>) : <p className="text-sm text-white/70">Captains announced soon.</p>}
          </div>
          <div className="mt-4 flex gap-3">
            <Link href="/standings" className="cta-ghost">Standings</Link>
            <Link href="/auction" className="cta-ghost">Auction</Link>
          </div>
        </article>
      </section>

      <section>
        <h2 className="section-title">30-Match Season Schedule</h2>
        <div className="mt-3"><ScheduleCards /></div>
      </section>
    </div>
  );
}
