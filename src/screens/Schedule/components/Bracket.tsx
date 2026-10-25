import type { GroupPlayer } from "../card/GroupCard";

export interface ScheduledPlayer extends GroupPlayer {
  group: number;
}

export interface Group {
  number: number;
  players: GroupPlayer[];
}

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
