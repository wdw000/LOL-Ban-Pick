import { ChampionInfo, selectSearch } from "./championSlice";
import "./ChampionItem.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addBanPickChampion,
  selectAllTeamBanPick,
  selectBanPickArray,
  selectBanPickIndex,
} from "../ban-pick/banPickSlice";

interface ChampionItemProps {
  data: ChampionInfo;
}

const ChampionItem = (props: ChampionItemProps) => {
  const banPickArray = useAppSelector(selectBanPickArray);
  const banPickIndex = useAppSelector(selectBanPickIndex);
  const allTeamBanPick = useAppSelector(selectAllTeamBanPick).map(
    (item) => item.championIMG
  );
  const search = useAppSelector(selectSearch);
  const dispatch = useAppDispatch();
  const currentBanPick = banPickArray[banPickIndex];
  const status = useAppSelector((state) => state.banPick.status);

  const handleListClick = () => {
    dispatch(
      addBanPickChampion({
        ...currentBanPick,
        championIMG: props.data.id,
      })
    );
  };

  return (
    <li
      className={
        "champion-item" +
        (props.data.name.includes(search) ? "" : " hidden") +
        (allTeamBanPick.includes(props.data.id) ? " checked" : "")
      }
      onClick={
        allTeamBanPick.includes(props.data.id) || status === "done"
          ? undefined
          : handleListClick
      }
    >
      <img
        src={`http://ddragon.leagueoflegends.com/cdn/${props.data.version}/img/champion/${props.data.image.full}`}
        alt={props.data.id}
      />
      <p>{props.data.name}</p>
    </li>
  );
};

export default ChampionItem;
