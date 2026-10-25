export interface Match {
  id: number;
  groupA: number | null;
  groupB: number | null;
  // ISO 8601 with the Stockholm offset (+01:00 in winter)
  startsAt: string;
}

export const MATCHES: readonly Match[] = [
  { id: 1, groupA: 1, groupB: 2, startsAt: "2026-11-07T18:00:00+01:00" },
  { id: 2, groupA: 3, groupB: 4, startsAt: "2026-11-07T20:00:00+01:00" },
  { id: 3, groupA: null, groupB: null, startsAt: "2026-11-08T18:00:00+01:00" },
];
