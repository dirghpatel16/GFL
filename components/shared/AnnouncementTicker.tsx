"use client";

import { announcements } from "@/lib/data/mock";

export function AnnouncementTicker() {
  return (
    <div className="card mt-6 overflow-hidden py-3">
      <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap px-4 text-sm text-white/90 [@keyframes_marquee]{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}">
        {[...announcements, ...announcements].map((a) => (
          <span key={`${a.id}-${Math.random()}`} className="mr-8">
            🔊 {a.title}: {a.body}
          </span>
        ))}
      </div>
    </div>
  );
}
