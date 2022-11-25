import { useAppSelector } from "../../../app/hooks";
import {
  BanPick,
  selectBanPickArray,
  selectBanPickIndex,
  selectTeamPick,
  selectTeamPickIndex,
} from "../banPickSlice";
import PickItem from "./PickItem";
import "./PickList.css";

interface PickListProps {
  team: BanPick["team"];
}

const PickList = (props: PickListProps) => {
  const teamPick = useAppSelector(selectTeamPick(props.team));
  const teamPickIndex = useAppSelector(selectTeamPickIndex(props.team));
  const banPickArray = useAppSelector(selectBanPickArray);
  const banPickIdx = useAppSelector(selectBanPickIndex);
  const currentBanPick = banPickArray[banPickIdx];

  const item = teamPick.map((item, index) => (
    <PickItem
      team={props.team}
      data={item}
      checked={
        teamPickIndex === index &&
        currentBanPick.team === props.team &&
        currentBanPick.status === "PICK"
      }
      key={item.player}
    />
  ));
  return <ul className="pick-list">{item}</ul>;
};

export default PickList;
