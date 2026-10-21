import { useNavigate } from "react-router-dom";
import { useCountDown } from "../../hooks/useCountDown";
import DiscordButton from "../../components/DiscordButton";
import xLogo from "../../assets/Xlogo.png";
import CountdownTimer from "../../components/CountdownTimer";
import RulesModal from "./modal/RulesModal";
import { useLanguage } from "../../i18n/useLanguage";
import "./StartScreen.css";

function StartScreen() {
  const navigate = useNavigate();
  const timeLeft = useCountDown();
  const { t } = useLanguage();

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
        <p className="subtitle">{t("start.subtitle")}</p>
        <p className="credits">{t("start.credits")}</p>
        <CountdownTimer timeLeft={timeLeft} />

        {/* <button
  className="glow-button"
  onClick={() => {
    void navigate("/schedule");
  }}
>
  Eliminatorias
</button> */}

        <button
          className="x-btn x-btn--participants"
          onClick={() => {
            void navigate("/participants");
          }}
        >
          {t("start.participants")}
        </button>

        <RulesModal />

        <DiscordButton />

        <button
          className="x-btn"
          disabled={!timeLeft}
          onClick={() => {
            void navigate("/form");
          }}
        >
          {t("start.start")}
        </button>
      </div>
    </main>
  );
}

export default StartScreen;
