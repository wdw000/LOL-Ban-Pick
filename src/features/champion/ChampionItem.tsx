import { ChampionInfo } from "./championSlice";
import "./ChampionItem.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addBanPickChampion,
  selectBanPickArray,
  selectBanPickIndex,
} from "../ban-pick/banPickSlice";

interface ChampionItemProps {
  data: ChampionInfo;
}

const ChampionItem = (props: ChampionItemProps) => {
  const banPickArray = useAppSelector(selectBanPickArray);
  const banPickIndex = useAppSelector(selectBanPickIndex);
  const dispatch = useAppDispatch();
  const currentBanPick = banPickArray[banPickIndex];

  const handleListClick = () => {
    dispatch(
      addBanPickChampion({
        ...currentBanPick,
        championIMG: props.data.id,
        championName: props.data.name,
      })
    );
  };

  return (
    <li className="champion-item" onClick={handleListClick}>
      <img
        src={`http://ddragon.leagueoflegends.com/cdn/${props.data.version}/img/champion/${props.data.image.full}`}
        alt={props.data.id}
      />
      <p>{props.data.name}</p>
    </li>
  );
};

export default ChampionItem;
