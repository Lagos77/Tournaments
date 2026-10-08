import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import defaultAvatar from "../../assets/default-avatar.jpg";
import "./ParticipantsScreen.css";

interface Participant {
  id: number;
  alias: string;
  country: string;
  avatar_url: string | null;
  tiktok: string | null;
  youtube: string | null;
  discord: string | null;
  twitch: string | null;
}

const SOCIALS = [
  { key: "tiktok", label: "TikTok" },
  { key: "youtube", label: "YouTube" },
  { key: "discord", label: "Discord" },
  { key: "twitch", label: "Twitch" },
] as const;

function ParticipantsScreen() {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState<Participant[] | null>(null);
  const [hasError, setHasError] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("x_torneo")
        .select(
          "id, alias, country, avatar_url, tiktok, youtube, discord, twitch"
        )
        .order("id")
        .overrideTypes<Participant[]>();

      if (error) {
        setHasError(true);
        return;
      }
      setParticipants(data);
    }

    void load();
  }, []);

  const toggle = (id: number) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <main className="participants-screen">
      <header className="participants-screen__header">
        <h1 className="participants-screen__title">Participantes</h1>
        {participants && (
          <p className="participants-screen__count">{participants.length}</p>
        )}
      </header>

      {hasError && <p>No se pudo cargar la lista.</p>}
      {!hasError && !participants && <div className="spinner" />}
      {participants?.length === 0 && <p>Aún no hay inscritos.</p>}

      {participants && participants.length > 0 && (
        <ul className="participants-list">
          {participants.map((p) => {
            const isOpen = expandedId === p.id;
            const socials = SOCIALS.filter(({ key }) => p[key]);

            return (
              <li
                key={p.id}
                className={`participant-card${
                  isOpen ? " participant-card--open" : ""
                }`}
              >
                <div className="participant-card__header">
                  <img
                    className="participant-card__avatar"
                    src={p.avatar_url ?? defaultAvatar}
                    alt=""
                  />

                  <span className="participant-card__name">{p.alias}</span>

                  <button
                    className="participant-card__toggle"
                    onClick={() => {
                      toggle(p.id);
                    }}
                    aria-expanded={isOpen}
                    aria-label={
                      isOpen ? "Ocultar redes sociales" : "Ver redes sociales"
                    }
                  >
                    <svg viewBox="0 0 24 24">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </div>

                <div className="participant-card__details">
                  <div className="participant-card__details-inner">
                    <ul className="participant-card__socials">
                      <li>
                        <span className="participant-card__social-label">
                          País
                        </span>
                        <span>{p.country}</span>
                      </li>
                      {socials.map(({ key, label }) => (
                        <li key={key}>
                          <span className="participant-card__social-label">
                            {label}
                          </span>
                          <span>{p[key]}</span>
                        </li>
                      ))}
                      {socials.length === 0 && (
                        <li className="participant-card__empty">
                          Sin redes sociales
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <button
        className="x-btn"
        onClick={() => {
          void navigate("/");
        }}
      >
        Volver
      </button>
    </main>
  );
}

export default ParticipantsScreen;
