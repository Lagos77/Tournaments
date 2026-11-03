import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useLanguage } from "../../../i18n/useLanguage";
import GroupList from "../list/GroupList";
import GroupDialog from "../dialog/GroupDialog";
import MatchList from "../list/MatchList";
import LinkButton from "../../../buttons/LinkButton";
import youtubeIcon from "../../../assets/youtube.svg";
import tiktokIcon from "../../../assets/tiktok.svg";
import background from "../../../assets/schedule.png";
import MatchDialog from "../dialog/MatchDialog";
import type { Match } from "../../../components/matches";
import {
  toGroups,
  type Group,
  type ScheduledPlayer,
} from "../components/Bracket";
import "./ScheduleScreen.css";

const SCHEDULE_COLUMNS =
  "id, alias, country, avatar_url, tiktok, youtube, discord, twitch, group, is_next, eliminated, games_played, categories_played";

const IS_YOUTUBE_LIVE = false;
const IS_TIKTOK_LIVE = true;

function useScheduledPlayers() {
  const [players, setPlayers] = useState<ScheduledPlayer[] | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("x_torneo")
        .select(SCHEDULE_COLUMNS)
        .not("group", "is", null)
        .order("group")
        .order("id")
        .overrideTypes<ScheduledPlayer[], { merge: false }>();

      if (error) {
        setHasError(true);
        return;
      }
      setPlayers(data);
    }

    void load();
  }, []);

  return { players, hasError };
}

function ScheduleScreen() {
  const { t } = useLanguage();
  const { players, hasError } = useScheduledPlayers();
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const groups = players ? toGroups(players) : [];

  const closeDialog = () => {
    setSelectedGroup(null);
  };

  const renderContent = () => {
    if (hasError) return <p>{t("schedule.loadError")}</p>;
    if (!players) return <div className="spinner" />;
    if (groups.length === 0) return <p>{t("schedule.empty")}</p>;

    return <GroupList groups={groups} onSelect={setSelectedGroup} />;
  };

  return (
    <main className="schedule-screen">
      <div
        className="schedule-screen__bg"
        style={{ backgroundImage: `url(${background})` }}
      />
      <h1 className="schedule-title">{t("schedule.title")}</h1>

      <nav className="stream-links">
        <div className="stream-link">
          <LinkButton
            variant="youtube"
            icon={youtubeIcon}
            href="https://www.youtube.com/@your-channel"
            disabled={!IS_YOUTUBE_LIVE}
          >
            YouTube
          </LinkButton>
          {IS_YOUTUBE_LIVE && (
            <span className="stream-link__live">{t("schedule.live")}</span>
          )}
        </div>

        <div className="stream-link">
          <LinkButton
            variant="tiktok"
            icon={tiktokIcon}
            href="https://www.tiktok.com/@your-channel"
            disabled={!IS_TIKTOK_LIVE}
          >
            TikTok
          </LinkButton>
          {IS_TIKTOK_LIVE && (
            <span className="stream-link__live">{t("schedule.live")}</span>
          )}
        </div>
      </nav>

      {renderContent()}

      <MatchList onSelect={setSelectedMatch} />

      <GroupDialog group={selectedGroup} onClose={closeDialog} />
      <MatchDialog
        match={selectedMatch}
        groups={groups}
        onClose={() => {
          setSelectedMatch(null);
        }}
      />
    </main>
  );
}

export default ScheduleScreen;
