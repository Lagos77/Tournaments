import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCountdown } from "../../hooks/useCountDown";
import xLogo from "../../assets/Xlogo.png";
import ParticipantCounter from "../../components/ParticipantCounter";
import CountdownTimer from "../../components/CountdownTimer";
import "./StartScreen.css";
import "./RulesModal.css";

function StartScreen() {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const timeLeft = useCountdown();

  return (
    <main className="start-screen">
      <div className="video-wrapper">
        <video
          className="bg-video"
          src="/background-video.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="video-overlay" />
      </div>

      <div className="content">
        <img src={xLogo} alt="Mega Man X" className="logo" />
        <p className="subtitle">Torneo de la saga X</p>
        <CountdownTimer timeLeft={timeLeft} />
        <ParticipantCounter />
        <button
          className="x-btn x-btn--secondary"
          onClick={() => {
            dialogRef.current?.showModal();
            dialogRef.current?.scrollTo(0, 0);
          }}
        >
          Reglas
        </button>

        <button
          className="x-btn"
          disabled={!timeLeft}
          onClick={() => navigate("/form")}
        >
          Start
        </button>
      </div>

      <dialog ref={dialogRef} className="rules-modal">
        <h2>Reglas</h2>
        <p>Esta es una competencia por grupos.</p>
        <p>El grupo con el menor tiempo total gana.</p>
        <p>
          El tiempo final es la suma de los tiempos de todos los participantes
          del grupo.
        </p>
        <p className="rules-modal__highlight">
          Una nueva regla se aplica después de la primera eliminación
        </p>

        <h3>Grupos</h3>
        <p>Cada grupo tendrá 4 participantess.</p>
        <p>
          Los participantes del mismo grupo no pueden jugar el mismo juego a la
          vez.
        </p>
        <p>
          Cada uno debe jugar un juego distinto, elegido entre los permitidos,
          en cualquier categoría.
        </p>
        <p>
          Las categorías se rigen por las mismas reglas de Mega Man
          Leaderboards.
        </p>

        <h3>Consolas</h3>
        <p>Está permitido usar:</p>
        <p>Snes9x 1.51 o más, Bizhawk, PCSX, PCSX2, Duckstation.</p>
        <p className="rules-modal__highlight rules-modal__highlight--negative">
          No RetroArch, no VBA & VBA-core para Bizhawk.
        </p>

        <h3>Juegos</h3>
        <p>Juegos permitidos y versiones:</p>
        <p>(X1-X8 JAP), X4 US, Xtreme 1, Xtreme 2.</p>
        <p className="rules-modal__highlight rules-modal__highlight--negative">
          Sin mods ni Legacy Collection.
        </p>

        <button className="x-btn" onClick={() => dialogRef.current?.close()}>
          Cerrar
        </button>
      </dialog>
    </main>
  );
}

export default StartScreen;
