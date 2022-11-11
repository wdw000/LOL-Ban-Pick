import { TeamPick } from "../banPickSlice";
import "./PickItem.css";

interface PickItemProps {
  data: TeamPick;
}

const PickItem = (props: PickItemProps) => {
  return (
    <li className="pick-item">
      <p className="champion-name">{props.data.championName}</p>
      <p className="player">{props.data.player}</p>
      {props.data.championIMG !== "" && (
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${props.data.championIMG}_0.jpg`}
          alt={props.data.championName}
        />
      )}
    </li>
  );
};

export default PickItem;
