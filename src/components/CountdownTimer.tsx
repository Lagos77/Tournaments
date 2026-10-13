import type { TimeLeft } from "../hooks/useCountDown";
import { useLanguage } from "../i18n/useLanguage";
import "./CountdownTimer.css";

interface CountdownTimerProps {
  timeLeft: TimeLeft | null;
}

const pad = (value: number, length = 2) => String(value).padStart(length, "0");

function CountdownTimer({ timeLeft }: CountdownTimerProps) {
  const { t } = useLanguage();

  if (!timeLeft) {
    return (
      <p className="countdown countdown--closed">{t("countdown.closed")}</p>
    );
  }

  const text = `${pad(timeLeft.days)}d ${pad(timeLeft.hours)}h ${pad(
    timeLeft.minutes
  )}m ${pad(timeLeft.seconds)}s ${pad(timeLeft.milliseconds, 3)}`;

  return (
    <div className="countdown">
      <p className="countdown__label">{t("countdown.closesOn")}</p>
      <p className="countdown__label">{t("countdown.remaining")}</p>
      <p className="countdown__value">
        {Array.from(text).map((char, i) => (
          <span
            key={i}
            className={/\d/.test(char) ? "countdown__digit" : undefined}
          >
            {char}
          </span>
        ))}
      </p>
      <p className="countdown__label">
        {t("countdown.starts")}
        <br />
        {t("countdown.timeAnnounced")}
      </p>
    </div>
  );
}

export default CountdownTimer;
