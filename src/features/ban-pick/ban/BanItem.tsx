import { BanObj } from "../banPickSlice";
import "./BanItem.css";

interface BanItemProps {
  data: BanObj;
}

const BanItem = (props: BanItemProps) => {
  return <li className="ban-item"></li>;
};

export default BanItem;
