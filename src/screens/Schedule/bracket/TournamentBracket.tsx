import { useLanguage } from "../../../i18n/useLanguage";
import defaultAvatar from "../../../assets/x.png";
import type { BracketNode, SlotStatus } from "./bracketData";
import { getGroupAvatar } from "../components/groupAvatar";
import "./TournamentBracket.css";

interface BracketSlotProps {
  group: number | null;
  status?: SlotStatus;
  onSelect: (group: number) => void;
}

function BracketSlot({ group, status, onSelect }: BracketSlotProps) {
  const { t } = useLanguage();

  const className = `bracket-slot${status ? ` bracket-slot--${status}` : ""}`;

  const content = (
    <>
      <span className="bracket-slot__avatar-wrap">
        <img
          className="bracket-slot__avatar"
          src={group === null ? defaultAvatar : getGroupAvatar(group)}
          alt=""
        />
      </span>
      <span className="bracket-slot__label">
        {group === null ? "?" : `${t("schedule.group")} ${String(group)}`}
      </span>
    </>
  );

  if (group === null) {
    return <div className={className}>{content}</div>;
  }

  return (
    <button
      type="button"
      className={`${className} bracket-slot--clickable`}
      onClick={() => {
        onSelect(group);
      }}
    >
      {content}
    </button>
  );
}

interface BracketBranchProps {
  node: BracketNode;
  onSelectGroup: (group: number) => void;
}

function BracketBranch({ node, onSelectGroup }: BracketBranchProps) {
  return (
    <div className="bracket-node">
      <BracketSlot
        group={node.group}
        status={node.status}
        onSelect={onSelectGroup}
      />

      {node.feeders !== undefined && (
        <div className="bracket-feeders">
          <div className="bracket-feeder">
            <BracketBranch
              node={node.feeders[0]}
              onSelectGroup={onSelectGroup}
            />
          </div>
          <div className="bracket-feeder">
            <BracketBranch
              node={node.feeders[1]}
              onSelectGroup={onSelectGroup}
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface TournamentBracketProps {
  title: string;
  node: BracketNode;
  onSelectGroup: (group: number) => void;
}

function TournamentBracket({
  title,
  node,
  onSelectGroup,
}: TournamentBracketProps) {
  return (
    <section className="tournament-bracket">
      <h2 className="tournament-bracket__title">{title}</h2>

      <div className="tournament-bracket__scroll">
        <BracketBranch node={node} onSelectGroup={onSelectGroup} />
      </div>
    </section>
  );
}

export default TournamentBracket;
