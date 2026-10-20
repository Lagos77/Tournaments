import { useLanguage } from "../../../i18n/useLanguage";
import { isEliminated, isNext, type Group } from "./Bracket";
import { getGroupAvatar } from "./groupAvatar";
import "./GroupChip.css";

interface GroupChipProps {
  group: Group | null;
  onSelect: (group: Group) => void;
}

function getChipClassName(group: Group) {
  const classNames = ["group-chip"];
  if (isNext(group)) classNames.push("group-chip--next");
  if (isEliminated(group)) classNames.push("group-chip--eliminated");
  return classNames.join(" ");
}

function EliminatedCross() {
  return (
    <svg className="group-chip__cross" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

function GroupChip({ group, onSelect }: GroupChipProps) {
  const { t } = useLanguage();

  // Winner slot that isn't decided yet
  if (!group) {
    return (
      <div className="group-chip group-chip--empty" aria-hidden="true">
        ?
      </div>
    );
  }

  return (
    <button
      type="button"
      className={getChipClassName(group)}
      aria-label={`${t("schedule.group")} ${String(group.number)}`}
      onClick={() => {
        onSelect(group);
      }}
    >
      <img src={getGroupAvatar(group.number)} alt="" />
      {isEliminated(group) && <EliminatedCross />}
      <span className="group-chip__label">G{group.number}</span>
    </button>
  );
}

export default GroupChip;
