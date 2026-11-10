export interface Match {
  id: number;
  round: number;
  groupA: number | null;
  groupB: number | null;
  // ISO 8601 with the Stockholm offset (+01:00 in winter)
  startsAt: string | null;
}

export const MATCHES: readonly Match[] = [
  {
    id: 2,
    round: 1,
    groupA: 7,
    groupB: 8,
    startsAt: "2026-11-08T12:30:00-05:00",
  },
  {
    id: 1,
    round: 1,
    groupA: 1,
    groupB: 5,
    startsAt: "2026-11-08T10:00:00-05:00",
  },
  {
    id: 4,
    round: 1,
    groupA: 2,
    groupB: 4,
    startsAt: "2026-11-15T09:00:00-05:00",

  },
  {
    id: 3,
    round: 1,
    groupA: 3,
    groupB: 6,
    startsAt: "2026-11-15T12:00:00-05:00",
  },
];

{
  /*
  {
    id: 1,
    round: 1,
    groupA: 1,
    groupB: 2,
    startsAt: "2026-11-07T18:00:00+01:00",
  },
  {
    id: 2,
    round: 1,
    groupA: 3,
    groupB: 4,
    startsAt: "2026-11-07T20:00:00+01:00",
  },
          */
}
