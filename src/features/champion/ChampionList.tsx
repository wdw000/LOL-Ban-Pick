import { useAppSelector } from "../../app/hooks";
import ChampionItem from "./ChampionItem";
import { ChampionInfo, selectAllChampionDatas } from "./championSlice";
import "./ChampionList.css";

const ChampionList = () => {
  const championsAllData = useAppSelector(selectAllChampionDatas);
  let listData: ChampionInfo[] = [];

  if (championsAllData) {
    for (let key in championsAllData) {
      listData.push(championsAllData[key]);
    }

    listData.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }

      if (a.name > b.name) {
        return 1;
      }

      return 0;
    });
  }

  const list = listData.map((item) => (
    <ChampionItem data={item} key={item.key} />
  ));

  return <ul className="champion-list">{list}</ul>;
};

export default ChampionList;
