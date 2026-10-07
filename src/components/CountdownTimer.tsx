import type { TimeLeft } from "../hooks/useCountDown";
import "./CountdownTimer.css";

interface CountdownTimerProps {
  timeLeft: TimeLeft | null;
}

function CountdownTimer({ timeLeft }: CountdownTimerProps) {
  if (!timeLeft) {
    return <p className="countdown countdown--closed">Inscripciones cerradas</p>;
  }

  return (
    <div className="countdown">
      <p className="countdown__label">Las inscripciones cierran en:</p>
      <p className="countdown__value">
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
        {timeLeft.seconds}s
      </p>
    </div>
  );
}

export default CountdownTimer;