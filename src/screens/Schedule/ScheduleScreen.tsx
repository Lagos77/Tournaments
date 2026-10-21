import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useLanguage } from "../../i18n/useLanguage";
import Bracket from "./components/BracketTree";
import GroupDialog from "./components/GroupDialog";

import {
  BRACKET_SIZES,
  toGroups,
  type Group,
  type ScheduledPlayer,
} from "./components/Bracket";
import "./ScheduleScreen.css";

const SCHEDULE_COLUMNS =
  "id, alias, country, avatar_url, tiktok, youtube, discord, twitch, group, is_next, eliminated";

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
        .overrideTypes<ScheduledPlayer[]>();

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

  const closeDialog = () => {
    setSelectedGroup(null);
  };

  const renderContent = () => {
    if (hasError) return <p>{t("schedule.loadError")}</p>;
    if (!players) return <div className="spinner" />;

    const groups = toGroups(players);
    if (!BRACKET_SIZES.includes(groups.length)) {
      return <p>{t("schedule.empty")}</p>;
    }

    return <Bracket groups={groups} onSelect={setSelectedGroup} />;
  };

  return (
    <main className="schedule-screen">
      <h1 className="schedule-title">{t("schedule.title")}</h1>

      {renderContent()}

      <GroupDialog group={selectedGroup} onClose={closeDialog} />
    </main>
  );
}

export default ScheduleScreen;
