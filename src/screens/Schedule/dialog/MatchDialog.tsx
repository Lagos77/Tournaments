import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useLanguage } from "../../../i18n/useLanguage";
import defaultAvatar from "../../../assets/default-avatar.jpg";
import type { Group, ScheduledPlayer } from "../components/Bracket";
import MatchTeam from "../components/MatchTeam";
import { formatStart } from "../../../components/formatStart";
import type { Match } from "../../../components/matches";
import "./GroupDialog.css";
import "./MatchDialog.css";

interface MatchPlayerProps {
  player: ScheduledPlayer;
  round: number;
}

function MatchPlayer({ player, round }: MatchPlayerProps) {
  const { t } = useLanguage();
  const game = player.games_played?.at(round - 1);
  const category = player.categories_played?.at(round - 1);

  return (
    <li className="match-dialog__player">
      <img
        className="match-dialog__avatar"
        src={player.avatar_url ?? defaultAvatar}
        alt=""
      />
      <div>
        <span className="match-dialog__alias">{player.alias}</span>
        {game !== undefined && (
          <div className="match-dialog__game">
            <p>
              {t("schedule.played")}: {game}
            </p>
            {category !== undefined && (
              <p>
                {t("schedule.category")}: {category}
              </p>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

interface MatchSideProps {
  number: number | null;
  groups: Group[];
  round: number;
}

function MatchSide({ number, groups, round }: MatchSideProps) {
  const { t } = useLanguage();
  const group = groups.find((candidate) => candidate.number === number);
  const title =
    number === null ? "?" : `${t("schedule.group")} ${String(number)}`;

  return (
    <section>
      <h3 className="match-dialog__group-title">{title}</h3>

      {group === undefined ? (
        <p className="match-dialog__tbd">{t("schedule.tbd")}</p>
      ) : (
        <ul className="match-dialog__players">
          {group.players.map((player) => (
            <MatchPlayer key={player.id} player={player} round={round} />
          ))}
        </ul>
      )}
    </section>
  );
}

interface MatchDialogProps {
  match: Match | null;
  groups: Group[];
  onClose: () => void;
}

function MatchDialog({ match, groups, onClose }: MatchDialogProps) {
  const { t, lang } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [shownMatch, setShownMatch] = useState(match);
  if (match && match !== shownMatch) setShownMatch(match);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!match) {
      dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
  }, [match]);

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="group-dialog"
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      {shownMatch && (
        <div className="group-dialog__body">
          <div className="match-dialog">
            <header className="match-dialog__header">
              <span className="match-list__versus">
                <MatchTeam number={shownMatch.groupA} />
                <span className="match-list__vs">vs</span>
                <MatchTeam number={shownMatch.groupB} />
              </span>
              <time
                className="match-dialog__date"
                dateTime={shownMatch.startsAt ?? undefined}
              >
                {formatStart(shownMatch.startsAt, lang) ?? t("schedule.tbd")}
              </time>
            </header>

            <MatchSide
              number={shownMatch.groupA}
              groups={groups}
              round={shownMatch.round}
            />
            <MatchSide
              number={shownMatch.groupB}
              groups={groups}
              round={shownMatch.round}
            />
          </div>

          <button className="x-btn" onClick={onClose}>
            {t("rules.close")}
          </button>
        </div>
      )}
    </dialog>
  );
}

export default MatchDialog;
