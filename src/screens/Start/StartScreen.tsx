import { useNavigate } from "react-router-dom";
import { useCountDown } from "../../hooks/useCountDown";
import xLogo from "../../assets/Xlogo.png";
import discordIcon from "../../assets/discord.svg";
import CountdownTimer from "../../components/CountdownTimer";
import RulesModal from "./modal/RulesModal";
import { useLanguage } from "../../i18n/useLanguage";
import "./StartScreen.css";

const DISCORD_INVITE_URL = "https://discord.gg/JT4w6sf8hQ";

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

        <button
          className="x-btn x-btn--participants"
          onClick={() => {
            void navigate("/participants");
          }}
        >
          {t("start.participants")}
        </button>

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
          {t("start.start")}
        </button>
      </div>
    </main>
  );
}

export default StartScreen;
