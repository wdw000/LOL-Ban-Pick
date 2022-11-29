import { useAppSelector } from "../../../app/hooks";
import { BanPick, TeamPick } from "../banPickSlice";
import "./PickItem.css";

interface PickItemProps {
  data: TeamPick;
  team: BanPick["team"];
  checked: boolean;
}

const PickItem = (props: PickItemProps) => {
  const status = useAppSelector((state) => state.banPick.status);

  return (
    <li className={"pick-item"}>
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

      <div
        className={
          "filter" +
          (props.team === "BLUE" ? " blue" : " red") +
          (props.checked && status === "start" ? ` current` : "")
        }
      ></div>
    </li>
  );
};

export default PickItem;
