import { useEffect, useState } from "react";

const STREAM_DURATION_MS = 3 * 60 * 60 * 1000;

// Add every start time here, in order.
const STREAM_STARTS: readonly Date[] = [
  new Date("2026-11-21T21:00:00-05:00"),
  new Date("2026-11-22T10:00:00-05:00"),
  new Date("2026-11-28T21:00:00-05:00"),
];

interface StreamState {
  isLive: boolean;
  nextStart: Date | null;
}

function getStreamState(now: number): StreamState {
  const isLive = STREAM_STARTS.some((start) => {
    const startMs = start.getTime();
    return now >= startMs && now < startMs + STREAM_DURATION_MS;
  });
  const nextStart =
    STREAM_STARTS.find((start) => start.getTime() > now) ?? null;

  return { isLive, nextStart };
}

export function useStreamState() {
  const [state, setState] = useState(() => getStreamState(Date.now()));

  useEffect(() => {
    const id = setInterval(() => {
      const next = getStreamState(Date.now());
      setState((prev) =>
        prev.isLive === next.isLive && prev.nextStart === next.nextStart
          ? prev
          : next
      );
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return state;
}
