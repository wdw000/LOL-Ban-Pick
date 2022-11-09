import { useAppSelector } from "../../../app/hooks";
import { BanPick, selectTeamPick } from "../banPickSlice";
import PickItem from "./PickItem";
import "./PickList.css";

interface PickListProps {
  team: BanPick["team"];
}

const PickList = (props: PickListProps) => {
  let teamPick = useAppSelector(selectTeamPick(props.team));

  const item = teamPick.map((item) => (
    <PickItem data={item} key={item.player} />
  ));
  return <ul className="pick-list">{item}</ul>;
};

export default PickList;
