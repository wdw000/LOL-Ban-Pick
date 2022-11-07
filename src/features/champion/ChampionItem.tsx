import { ChampionInfo } from "./championSlice";
import "./ChampionItem.css";

interface ChampionItemProps {
  data: ChampionInfo;
}

const ChampionItem = (props: ChampionItemProps) => {
  return (
    <li className="champion-item">
      <img
        src={`http://ddragon.leagueoflegends.com/cdn/${props.data.version}/img/champion/${props.data.image.full}`}
        alt={props.data.id}
      />
      <p>{props.data.name}</p>
    </li>
  );
};

export default ChampionItem;
