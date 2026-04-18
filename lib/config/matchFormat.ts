export type RoundType = "normal" | "golden";

export interface SeasonMatchDefinition {
  matchNumber: number;
  block: number;
  cycle: 1 | 2;
  roundType: RoundType;
  map: string;
  label: string;
}

const blocks = [4, 5, 6, 4, 5, 6] as const;

// Normal maps for each block (index % 3)
const normalMaps = ["WOW 15798 (3 Rounds)", "WOW 51078 (4 Rounds)", "WOW 49546 (5 Rounds)"];

const defs: SeasonMatchDefinition[] = [];
let cursor = 1;

blocks.forEach((size, blockIndex) => {
  const cycle = blockIndex < 3 ? 1 : 2;
  const normalMap = normalMaps[blockIndex % 3];
  
  for (let i = 1; i <= size; i += 1) {
    const roundType: RoundType = i === size ? "golden" : "normal";
    const map = roundType === "golden" ? "Sanhok (Bootcamp)" : normalMap;
    defs.push({
      matchNumber: cursor,
      block: blockIndex + 1,
      cycle,
      roundType,
      map,
      label: `Block ${blockIndex + 1} • Round ${i}`
    });
    cursor += 1;
  }
});

export const seasonMatchPlan = defs;
