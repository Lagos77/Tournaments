import { useState } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import PlayerRow from "./PlayerRow";
import { getGroupAvatar } from "./components/groupAvatar";
import "./GroupCard.css";

export interface GroupPlayer {
  id: number;
  alias: string;
  country: string;
  avatar_url: string | null;
  tiktok: string | null;
  youtube: string | null;
  discord: string | null;
  twitch: string | null;
  is_next: boolean;
  eliminated: boolean;
}

interface GroupCardProps {
  group: number;
  players: GroupPlayer[];
}

function getCardClassName(isNext: boolean, isEliminated: boolean) {
  const classNames = ["group-card"];
  if (isNext) classNames.push("group-card--next");
  if (isEliminated) classNames.push("group-card--eliminated");
  return classNames.join(" ");
}

function EliminatedCross() {
  return (
    <svg
      className="group-eliminated-cross"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

function GroupCard({ group, players }: GroupCardProps) {
  const { t } = useLanguage();
  const [expandedPlayerId, setExpandedPlayerId] = useState<number | null>(null);

  const isNext = players.some((player) => player.is_next);
  const isEliminated =
    players.length > 0 && players.every((player) => player.eliminated);

  const togglePlayer = (playerId: number) => {
    setExpandedPlayerId((current) => (current === playerId ? null : playerId));
  };

  return (
    <div className={getCardClassName(isNext, isEliminated)}>
      <div className="group-card-header">
        <span className="group-avatar-wrapper">
          <img className="group-avatar" src={getGroupAvatar(group)} alt="" />
          {isEliminated && <EliminatedCross />}
        </span>
        <span className="group-card-title">
          {t("schedule.group")} {group}
        </span>
      </div>

      <ul className="group-players">
        {players.map((player) => (
          <PlayerRow
            key={player.id}
            player={player}
            isOpen={expandedPlayerId === player.id}
            onToggle={() => {
              togglePlayer(player.id);
            }}
          />
        ))}
      </ul>
    </div>
  );
}

export default GroupCard;
