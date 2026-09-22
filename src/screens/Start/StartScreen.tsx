import xLogo from "../../assets/Xlogo.png";
import "./StartScreen.css";

function StartScreen() {
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
        <div className="reglas-content">
          <p className="reglas">• Nuevos retos</p>
          <p className="reglas">• Nuevas reglas</p>
          <p className="reglas">• Regla sorpresa</p>
        </div>
        <p className="message">Inscripciones pronto</p>
        <p className="share">Pasa la voz!</p>
        <button className="x-btn">Start</button>
      </div>
    </main>
  );
}

export default StartScreen;
