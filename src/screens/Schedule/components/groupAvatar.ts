import defaultAvatar from "../../../assets/default-avatar.jpg";
import g1 from "../../../assets/g1.jpg";
import g2 from "../../../assets/g2.jpg";
import g3 from "../../../assets/g3.jpg";
import g4 from "../../../assets/g4.jpg";
import g5 from "../../../assets/g5.png";
import g6 from "../../../assets/g6.png";
import g7 from "../../../assets/g7.png";
import g8 from "../../../assets/g8.jpg";

const GROUP_AVATARS: Partial<Record<number, string>> = {
  1: g1,
  2: g2,
  3: g3,
  4: g4,
  5: g5,
  6: g6,
  7: g7,
  8: g8,
};

export function getGroupAvatar(groupNumber: number) {
  return GROUP_AVATARS[groupNumber] ?? defaultAvatar;
}
