import { useAppSelector } from "../../app/hooks";
import ChampionItem from "./ChampionItem";
import { selectAllChampionDatas } from "./championSlice";
import "./ChampionList.css";

const ChampionList = () => {
  const championsAllData = useAppSelector(selectAllChampionDatas);

  const list = championsAllData.map((item) => (
    <ChampionItem data={item} key={item.key} />
  ));

  return (
    <div className="champion-list">
      <ul>{list}</ul>
    </div>
  );
};

export default ChampionList;
