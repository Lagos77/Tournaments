import { useLanguage } from "../../../i18n/useLanguage";
import { getGroupAvatar } from "../components/groupAvatar";
import { isEliminated, isNext, type Group } from "../components/Bracket";
import "./GroupList.css";

interface GroupListProps {
  groups: Group[];
  onSelect: (group: Group) => void;
}

function getStatus(group: Group) {
  if (isEliminated(group)) return "eliminated";
  if (isNext(group)) return "next";
  return null;
}

function GroupList({ groups, onSelect }: GroupListProps) {
  const { t } = useLanguage();

  return (
    <section className="group-list">
      <h2 className="group-list__title">{t("schedule.groups")}</h2>

      <ul className="group-list__items">
        {groups.map((group) => {
          const status = getStatus(group);

          return (
            <li key={group.number}>
              <button
                className={`group-list__row${
                  status !== null ? ` group-list__row--${status}` : ""
                }`}
                onClick={() => {
                  onSelect(group);
                }}
              >
                <img
                  className="group-list__avatar"
                  src={getGroupAvatar(group.number)}
                  alt=""
                />
                <span className="group-list__name">
                  {t("schedule.group")} {group.number}
                </span>
                {status !== null && (
                  <span
                    className={`group-list__tag group-list__tag--${status}`}
                  >
                    {status === "eliminated"
                      ? t("schedule.eliminated")
                      : t("schedule.next")}
                  </span>
                )}
                <span className="group-list__arrow" aria-hidden="true">
                  ›
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default GroupList;
