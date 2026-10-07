import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MusicPlayer.css";

const DEFAULT_TRACK = "/start.mp3";
const TRACKS: Partial<Record<string, string>> = {
  "/form": "/data.mp3",
};

function MusicPlayer() {
  const { pathname } = useLocation();
  const src = TRACKS[pathname] ?? DEFAULT_TRACK;

  const audioRef = useRef<HTMLAudioElement>(null);
  const hasInteracted = useRef(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const controller = new AbortController();

    const start = () => {
      audio
        .play()
        .then(() => {
          hasInteracted.current = true;
          controller.abort();
        })
        .catch(() => undefined);
    };

    for (const event of ["click", "touchend", "keydown"]) {
      document.addEventListener(event, start, { signal: controller.signal });
    }

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (hasInteracted.current) {
      audioRef.current?.play().catch(() => undefined);
    }
  }, [src]);

  return (
    <>
      <audio ref={audioRef} src={src} loop muted={isMuted} />

      <button
        className="mute-btn"
        onClick={() => setIsMuted((m) => !m)}
        aria-label={isMuted ? "Activar música" : "Silenciar música"}
      >
        <svg viewBox="0 0 24 24">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          {isMuted ? (
            <>
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </>
          ) : (
            <>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </>
          )}
        </svg>
      </button>
    </>
  );
}

export default MusicPlayer;
