import GroupChip from "./GroupChip";
import { buildTree, getWinner, type BracketNode, type Group } from "./Bracket";
import "./BracketTree.css";

interface BracketTreeProps {
  node: BracketNode;
  onSelect: (group: Group) => void;
}

function BracketTree({ node, onSelect }: BracketTreeProps) {
  if (node.kind === "group") {
    return <GroupChip group={node.group} onSelect={onSelect} />;
  }

  return (
    <div className="bracket-node">
      <div className="bracket-feeders">
        <div className="bracket-child">
          <BracketTree node={node.first} onSelect={onSelect} />
        </div>
        <div className="bracket-child">
          <BracketTree node={node.second} onSelect={onSelect} />
        </div>
      </div>

      {/* Winner slot: shows "?" until the match is decided */}
      <div className="bracket-out">
        <GroupChip group={getWinner(node)} onSelect={onSelect} />
      </div>
    </div>
  );
}

interface BracketProps {
  groups: Group[];
  onSelect: (group: Group) => void;
}

function Bracket({ groups, onSelect }: BracketProps) {
  const half = groups.length / 2;
  const leftGroups = groups.slice(0, half);
  const rightGroups = groups.slice(half);
  const isSingleMatch = groups.length === 2;

  return (
    <div className={`bracket bracket--${String(groups.length)}`}>
      <div className="bracket-side">
        <BracketTree node={buildTree(leftGroups)} onSelect={onSelect} />
      </div>

      <div className="bracket-final">
        {isSingleMatch && <span className="bracket-final__vs">vs</span>}
      </div>

      <div className="bracket-side bracket-side--right">
        <BracketTree node={buildTree(rightGroups)} onSelect={onSelect} />
      </div>
    </div>
  );
}

export default Bracket;
