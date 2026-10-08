import { useEffect, useState } from "react";

const REGISTRATION_DEADLINE = new Date("2026-11-04T00:00:00");

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

function getTimeLeft(): TimeLeft | null {
  const diff = REGISTRATION_DEADLINE.getTime() - Date.now();
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
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return timeLeft;
}
