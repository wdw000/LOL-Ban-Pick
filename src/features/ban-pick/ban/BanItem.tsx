import { BanObj, BanPick } from "../banPickSlice";
import "./BanItem.css";
import close from "../../../img/close_FILL0_wght400_GRAD0_opsz48.svg";
import { useAppSelector } from "../../../app/hooks";

interface BanItemProps {
  data: BanObj;
  checked: boolean;
  team: BanPick["team"];
}

const BanItem = (props: BanItemProps) => {
  const status = useAppSelector((state) => state.banPick.status);

  return (
    <li className={"ban-item"}>
      <img
        src={
          props.data.championIMG === ""
            ? close
            : `http://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/${props.data.championIMG}.png`
        }
        alt={props.data.id}
      />
      <div
        className={
          (props.checked && status === "start" ? " current" : "") +
          (props.team === "BLUE" ? " blue" : " red")
        }
      ></div>
    </li>
  );
};

export default BanItem;
