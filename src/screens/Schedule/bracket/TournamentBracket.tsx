import { useLanguage } from "../../../i18n/useLanguage";
import defaultAvatar from "../../../assets/x.png";
import type { BracketNode } from "./bracketData";
import { getGroupAvatar } from "../components/groupAvatar";
import "./TournamentBracket.css";

interface BracketSlotProps {
    group: number | null;
  }
  
  function BracketSlot({ group }: BracketSlotProps) {
    const { t } = useLanguage();
  
    return (
      <div className="bracket-slot">
        <img
          className="bracket-slot__avatar"
          src={group === null ? defaultAvatar : getGroupAvatar(group)}
          alt=""
        />
        <span className="bracket-slot__label">
          {group === null ? "?" : `${t("schedule.group")} ${String(group)}`}
        </span>
      </div>
    );
  }
  
  interface BracketBranchProps {
    node: BracketNode;
  }
  
  function BracketBranch({ node }: BracketBranchProps) {
    return (
      <div className="bracket-node">
        <BracketSlot group={node.group} />
  
        {node.feeders !== undefined && (
          <div className="bracket-feeders">
            <div className="bracket-feeder">
              <BracketBranch node={node.feeders[0]} />
            </div>
            <div className="bracket-feeder">
              <BracketBranch node={node.feeders[1]} />
            </div>
          </div>
        )}
      </div>
    );
  }
  
  interface TournamentBracketProps {
    title: string;
    node: BracketNode;
  }
  
  function TournamentBracket({ title, node }: TournamentBracketProps) {
    return (
      <section className="tournament-bracket">
        <h2 className="tournament-bracket__title">{title}</h2>
  
        <div className="tournament-bracket__scroll">
          <BracketBranch node={node} />
        </div>
      </section>
    );
  }
  
  export default TournamentBracket;
