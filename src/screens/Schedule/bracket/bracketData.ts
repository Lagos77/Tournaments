export type SlotStatus = "next" | "eliminated";

export interface BracketNode {
  group: number | null;
  status?: SlotStatus;
  feeders?: [BracketNode, BracketNode];
}

const team = (group: number | null, status?: SlotStatus): BracketNode => ({
  group,
  status,
});

const match = (
  group: number | null,
  first: BracketNode,
  second: BracketNode
): BracketNode => ({ group, feeders: [first, second] });

export const BRACKET: BracketNode = match(
  null,
  match(null, match(null, team(1), team(2)), match(null, team(3), team(4))),
  match(null, match(null, team(5), team(6)), match(null, team(7), team(8)))
);

export const LOSERS_BRACKET: BracketNode = match(
  null,
  match(null, team(null), team(null)),
  match(null, team(null), team(null))
);
