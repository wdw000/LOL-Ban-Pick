import { useAppSelector } from "../../../app/hooks";
import { BanPick, selectTeamBan } from "../banPickSlice";
import BanItem from "./BanItem";
import "./BanList.css";

interface BanListProps {
  team: BanPick["team"];
}

const BanList = (props: BanListProps) => {
  const teamBan = useAppSelector(selectTeamBan(props.team));
  const item = teamBan.map((item) => <BanItem data={item} key={item.id} />);

  return <ul className="ban-list">{item}</ul>;
};

export default BanList;
