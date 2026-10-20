import type { GroupPlayer } from "../GroupCard";

export interface ScheduledPlayer extends GroupPlayer {
  group: number;
}

export interface Group {
  number: number;
  players: GroupPlayer[];
}

export type BracketNode =
  | { kind: "group"; group: Group }
  | { kind: "match"; first: BracketNode; second: BracketNode };

// Each round halves the groups, so only powers of two make a clean bracket.
export const BRACKET_SIZES: readonly number[] = [2, 4, 8];

export function isEliminated(group: Group) {
  return (
    group.players.length > 0 &&
    group.players.every((player) => player.eliminated)
  );
}

export function isNext(group: Group) {
  return group.players.some((player) => player.is_next);
}

export function toGroups(players: ScheduledPlayer[]): Group[] {
  const membersByGroup = new Map<number, GroupPlayer[]>();

  for (const player of players) {
    const members = membersByGroup.get(player.group) ?? [];
    members.push(player);
    membersByGroup.set(player.group, members);
  }

  return Array.from(membersByGroup, ([number, members]) => ({
    number,
    players: members,
  }));
}

// Pairs neighbours: [G1, G2, G3, G4] -> match(match(G1, G2), match(G3, G4)).
// The number of groups has to be a power of two.
export function buildTree(groups: Group[]): BracketNode {
  if (groups.length === 1) return { kind: "group", group: groups[0] };

  const half = groups.length / 2;
  return {
    kind: "match",
    first: buildTree(groups.slice(0, half)),
    second: buildTree(groups.slice(half)),
  };
}

// A match is decided once exactly one of the two groups is eliminated.
function getMatchWinner(first: Group, second: Group): Group | null {
  const isFirstOut = isEliminated(first);
  const isSecondOut = isEliminated(second);

  if (isFirstOut === isSecondOut) return null;
  return isFirstOut ? second : first;
}

export function getWinner(node: BracketNode): Group | null {
  if (node.kind === "group") return node.group;

  const first = getWinner(node.first);
  const second = getWinner(node.second);
  if (!first || !second) return null;

  return getMatchWinner(first, second);
}
