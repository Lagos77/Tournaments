import { useLanguage } from "../i18n/useLanguage";
import type { Language } from "../i18n/translations";
import defaultAvatar from "../assets/default-avatar.jpg";
import { getGroupAvatar } from "../screens/Schedule/components/groupAvatar";
import { MATCHES } from "./matches";
import "./Matchlist.css";

const LOCALES = { es: "es-419", en: "en-US" } as const;

function formatStart(iso: string, lang: Language) {
  return new Intl.DateTimeFormat(LOCALES[lang], {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function getUpcomingMatches() {
  const now = Date.now();

  return MATCHES.filter((match) => new Date(match.startsAt).getTime() >= now)
    .slice()
    .sort(
      (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
    );
}

function MatchTeam({ number }: { number: number | null }) {
  return (
    <div className="match-list__team">
      <img
        className="match-list__avatar"
        src={number === null ? defaultAvatar : getGroupAvatar(number)}
        alt=""
      />
      <span className="match-list__label">
        {number === null ? "?" : <>G{number}</>}
      </span>
    </div>
  );
}

function MatchList() {
  const { t, lang } = useLanguage();
  const matches = getUpcomingMatches();

  if (matches.length === 0) return null;

  return (
    <section className="match-list">
      <h2 className="match-list__title">{t("schedule.matches")}</h2>

      <ul className="match-list__items">
        {matches.map((match) => (
          <li key={match.id} className="match-list__row">
            <div className="match-list__versus">
              <MatchTeam number={match.groupA} />
              <span className="match-list__vs">vs</span>
              <MatchTeam number={match.groupB} />
            </div>
            <time className="match-list__date" dateTime={match.startsAt}>
              {formatStart(match.startsAt, lang)}
            </time>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MatchList;
