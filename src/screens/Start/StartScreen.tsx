import { useNavigate } from "react-router-dom";
import { useCountDown } from "../../hooks/useCountDown";
import xLogo from "../../assets/Xlogo.png";
import discordIcon from "../../assets/discord.svg";
import CountdownTimer from "../../components/CountdownTimer";
import RulesModal from "./modal/RulesModal";
import { useParticipantCount } from "../../hooks/useParticipantCount";
import "./StartScreen.css";

const DISCORD_INVITE_URL = "https://discord.gg/YOUR_INVITE";

function StartScreen() {
  const navigate = useNavigate();
  const timeLeft = useCountDown();
  const total = useParticipantCount();

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
        <p className="credits">
          Torneo realizado por Dark Lion de copas & Viva la cat
        </p>
        <CountdownTimer timeLeft={timeLeft} />

        <div className="participants-box">
          <span>Participantes inscritos</span>
          <strong className="participants-total">{total ?? "–"}</strong>
        </div>

        {/* <button
  className="x-btn x-btn--participants"
  onClick={() => {
    void navigate("/participants");
  }}
>
  Lista de participantes
</button> */}

        <RulesModal />

        <a
          className="x-btn x-btn--discord"
          href={DISCORD_INVITE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={discordIcon} alt="" className="x-btn__icon" />
          Discord
        </a>

        <button
          className="x-btn"
          disabled={!timeLeft}
          onClick={() => {
            void navigate("/form");
          }}
        >
          Start
        </button>
      </div>
    </main>
  );
}

export default StartScreen;
