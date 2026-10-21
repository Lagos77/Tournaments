import discordIcon from "../assets/discord.svg";

const DISCORD_INVITE_URL = "https://discord.gg/JT4w6sf8hQ";

function DiscordButton() {
  return (
    <a
      className="x-btn x-btn--discord"
      href={DISCORD_INVITE_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={discordIcon} alt="" className="x-btn__icon" />
      Discord
    </a>
  );
}

export default DiscordButton;
