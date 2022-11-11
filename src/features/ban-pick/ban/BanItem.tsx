import { BanObj } from "../banPickSlice";
import "./BanItem.css";
import close from "../../../img/close_FILL0_wght400_GRAD0_opsz48.svg";

interface BanItemProps {
  data: BanObj;
}

const BanItem = (props: BanItemProps) => {
  return (
    <li className="ban-item">
      <img
        src={
          props.data.championIMG === ""
            ? close
            : `http://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/${props.data.championIMG}.png`
        }
        alt={props.data.id}
      />
    </li>
  );
};

export default BanItem;
