import { useNavigate } from "react-router-dom";
import xLogo from "../../assets/Xlogo.png";
import "./StartScreen.css";

function StartScreen() {
  const navigate = useNavigate();

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
        <p className="message">Inscripciones pronto</p>
        <button className="x-btn" onClick={() => {}}>
          Start
        </button>
      </div>
    </main>
  );
}

export default StartScreen;
