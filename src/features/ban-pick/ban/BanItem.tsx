import { BanObj, BanPick } from "../banPickSlice";
import "./BanItem.css";
import close from "../../../img/close_FILL0_wght400_GRAD0_opsz48.svg";

interface BanItemProps {
  data: BanObj;
  checked: boolean;
  team: BanPick["team"];
}

const BanItem = (props: BanItemProps) => {
  return (
    <li className={"ban-item"}>
      <img
        src={
          props.data.championIMG === ""
            ? close
            : `http://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/${props.data.championIMG}.png`
        }
        className={
          (props.checked ? " current" : "") +
          (props.team === "BLUE" ? " blue" : " red")
        }
        alt={props.data.id}
      />
    </li>
  );
};

export default BanItem;
