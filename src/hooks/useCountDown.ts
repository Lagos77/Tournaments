import { useEffect, useState } from "react";
import { useStreamState } from "./useStreamState";

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

function getTimeLeft(target: Date | null): TimeLeft | null {
  if (!target) return null;

  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    milliseconds: diff % 1000,
  };
}

export function useCountDown() {
  const { isLive, nextStart } = useStreamState();
  const target = isLive ? null : nextStart;
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [target]);

  return timeLeft;
}
