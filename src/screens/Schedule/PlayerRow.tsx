import { useLanguage } from "../../i18n/useLanguage";
import defaultAvatar from "../../assets/default-avatar.jpg";
import type { GroupPlayer } from "./GroupCard";

const SOCIALS = [
  { key: "tiktok", label: "TikTok" },
  { key: "youtube", label: "YouTube" },
  { key: "discord", label: "Discord" },
  { key: "twitch", label: "Twitch" },
] as const;

interface PlayerRowProps {
  player: GroupPlayer;
  isOpen: boolean;
  onToggle: () => void;
}

function PlayerRow({ player, isOpen, onToggle }: PlayerRowProps) {
  const { t } = useLanguage();
  const socials = SOCIALS.filter(({ key }) => player[key]);

  return (
    <li className={`group-player${isOpen ? " group-player--open" : ""}`}>
      <div className="group-player__header">
        <img
          className="group-player__avatar"
          src={player.avatar_url ?? defaultAvatar}
          alt=""
        />

        <span className="group-player__name">{player.alias}</span>

        <button
          className="group-player__toggle"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-label={
            isOpen
              ? t("participants.hideSocials")
              : t("participants.showSocials")
          }
        >
          <svg viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      <div className="group-player__details">
        <div className="group-player__details-inner">
          <ul className="group-player__socials">
            <li>
              <span className="group-player__social-label">
                {t("form.country")}
              </span>
              <span>{player.country}</span>
            </li>
            {socials.map(({ key, label }) => (
              <li key={key}>
                <span className="group-player__social-label">{label}</span>
                <span>{player[key]}</span>
              </li>
            ))}
            {socials.length === 0 && (
              <li className="group-player__empty">
                {t("participants.noSocials")}
              </li>
            )}
          </ul>
        </div>
      </div>
    </li>
  );
}

export default PlayerRow;
