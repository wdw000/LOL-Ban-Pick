import { useAppSelector } from "../../../app/hooks";
import {
  BanPick,
  selectBanPickArray,
  selectBanPickIndex,
  selectTeamBan,
  selectTeamBanIndex,
} from "../banPickSlice";
import BanItem from "./BanItem";
import "./BanList.css";

interface BanListProps {
  team: BanPick["team"];
}

const BanList = (props: BanListProps) => {
  const teamBan = useAppSelector(selectTeamBan(props.team));
  const teamBanIndex = useAppSelector(selectTeamBanIndex(props.team));
  const banPickArray = useAppSelector(selectBanPickArray);
  const banPickIdx = useAppSelector(selectBanPickIndex);
  const currentBanPick = banPickArray[banPickIdx];

  const item = teamBan.map((item, index) => (
    <BanItem
      data={item}
      checked={
        index === teamBanIndex &&
        currentBanPick.team === props.team &&
        currentBanPick.status === "BAN"
      }
      team={props.team}
      key={item.id}
    />
  ));

  return <ul className="ban-list">{item}</ul>;
};

export default BanList;
