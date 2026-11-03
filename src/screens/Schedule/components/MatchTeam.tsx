import defaultAvatar from "../../../assets/default-avatar.jpg";
import { getGroupAvatar } from "../components/groupAvatar";

interface MatchTeamProps {
  number: number | null;
}

function MatchTeam({ number }: MatchTeamProps) {
  return (
    <span className="match-list__team">
      <img
        className="match-list__avatar"
        src={number === null ? defaultAvatar : getGroupAvatar(number)}
        alt=""
      />
      <span className="match-list__label">
        {number === null ? "?" : <>G{number}</>}
      </span>
    </span>
  );
}

export default MatchTeam;
