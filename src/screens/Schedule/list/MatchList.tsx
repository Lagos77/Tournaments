import { useLanguage } from "../../../i18n/useLanguage";
import MatchTeam from "../components/MatchTeam";
import { formatStart } from "../../../components/formatStart";
import { MATCHES, type Match } from "../../../components/matches";
import "./MatchList.css";

const NEWEST_FIRST = [...MATCHES].sort((a, b) => b.id - a.id);

interface MatchRowProps {
  match: Match;
  onSelect: (match: Match) => void;
}

function MatchRow({ match, onSelect }: MatchRowProps) {
  const { lang } = useLanguage();

  return (
    <button
      className="match-list__row"
      onClick={() => {
        onSelect(match);
      }}
    >
      <span className="match-list__versus">
        <MatchTeam number={match.groupA} />
        <span className="match-list__vs">vs</span>
        <MatchTeam number={match.groupB} />
      </span>
      <time className="match-list__date" dateTime={match.startsAt}>
        {formatStart(match.startsAt, lang)}
      </time>
    </button>
  );
}

interface MatchListProps {
  onSelect: (match: Match) => void;
}

function MatchList({ onSelect }: MatchListProps) {
  const { t } = useLanguage();

  if (NEWEST_FIRST.length === 0) return null;

  return (
    <section className="match-list">
      <h2 className="match-list__title">{t("schedule.matches")}</h2>

      <ul className="match-list__items">
        {NEWEST_FIRST.map((match) => (
          <li key={match.id}>
            <MatchRow match={match} onSelect={onSelect} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MatchList;
