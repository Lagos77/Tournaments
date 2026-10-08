import type { TimeLeft } from "../hooks/useCountDown";
import "./CountdownTimer.css";

interface CountdownTimerProps {
  timeLeft: TimeLeft | null;
}

function CountdownTimer({ timeLeft }: CountdownTimerProps) {
  const pad = (value: number, length = 2) =>
    String(value).padStart(length, "0");
  const text = `${pad(timeLeft.days)}d ${pad(timeLeft.hours)}h ${pad(
    timeLeft.minutes
  )}m ${pad(timeLeft.seconds)}s ${pad(timeLeft.milliseconds, 3)}`;
  if (!timeLeft) {
    return (
      <p className="countdown countdown--closed">Inscripciones cerradas</p>
    );
  }

  return (
    <div className="countdown">
      <p className="countdown__label">Inscripciones cierran 4 de noviembre.</p>
      <p className="countdown__label">Tiempo restante:</p>
      <p className="countdown__value">
        {[...text].map((char, i) => (
          <span
            key={i}
            className={/\d/.test(char) ? "countdown__digit" : undefined}
          >
            {char}
          </span>
        ))}
      </p>
      <p className="countdown__label">
        El torneo comienza el 7 de noviembre.
        <br />
        La hora exacta se anunciará más adelante.
      </p>
    </div>
  );
}

export default CountdownTimer;
