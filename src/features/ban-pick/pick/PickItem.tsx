import { BanPick, TeamPick } from "../banPickSlice";
import "./PickItem.css";

interface PickItemProps {
  data: TeamPick;
  team: BanPick["team"];
  checked: boolean;
}

const PickItem = (props: PickItemProps) => {
  return (
    <li
      className={"pick-item" + (props.checked ? ` current ${props.team}` : "")}
    >
      <p
        className={
          props.team === "BLUE" ? "champion-name" : "champion-name red"
        }
      >
        {props.data.championIMG}
      </p>
      <p className={props.team === "BLUE" ? "player" : "player red"}>
        {props.data.player}
      </p>
      {props.data.championIMG !== "" && (
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${props.data.championIMG}_0.jpg`}
          alt={props.data.championIMG}
          className={props.team === "BLUE" ? "blue" : ""}
        />
      )}

      <div className={props.team === "BLUE" ? "filter blue" : "filter"}></div>
    </li>
  );
};

export default PickItem;
