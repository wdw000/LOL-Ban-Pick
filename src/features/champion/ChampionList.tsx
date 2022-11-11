import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ChampionItem from "./ChampionItem";
import {
  ChampionInfo,
  selectAllChampionDatas,
  selectSearch,
} from "./championSlice";
import "./ChampionList.css";
import { useEffect, useMemo } from "react";
import {
  addBanPickChampion,
  addBanPickIndex,
  addNullBan,
  addTeamBanPickIndex,
  selectBanPickArray,
  selectBanPickIndex,
  selectRemainingTime,
  setRemainingTime,
  subRemainingTime,
} from "../ban-pick/banPickSlice";

const ChampionList = () => {
  const championsAllData = useAppSelector(selectAllChampionDatas);
  const search = useAppSelector(selectSearch);
  const remainingTime = useAppSelector(selectRemainingTime);
  const banPickArray = useAppSelector(selectBanPickArray);
  const banPickIndex = useAppSelector(selectBanPickIndex);
  const currentBanPick = banPickArray[banPickIndex];
  const dispatch = useAppDispatch();

  let filterData: ChampionInfo[] = [];

  function makeListData() {
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

    return listData;
  }

  const listData = useMemo(makeListData, [championsAllData]);
  filterData = listData.filter((item) => item.name.includes(search));

  useEffect(() => {
    const countDown = setInterval(() => {
      if (remainingTime > 0) {
        dispatch(subRemainingTime());
      } else if (remainingTime === 0) {
        clearInterval(countDown);
        if (banPickArray.length - 1 > banPickIndex) {
          if (currentBanPick.status === "BAN") {
            dispatch(addNullBan(currentBanPick.team));
            dispatch(addTeamBanPickIndex(currentBanPick));
          } else if (currentBanPick.status === "PICK") {
            const random = Math.floor(Math.random() * listData.length);
            dispatch(
              addBanPickChampion({
                ...currentBanPick,
                championIMG: listData[random].id,
                championName: listData[random].name,
              })
            );
            dispatch(addTeamBanPickIndex(currentBanPick));
          }
          dispatch(addBanPickIndex());
          dispatch(setRemainingTime());
        }
      }
    }, 1000);

    return () => {
      clearInterval(countDown);
    };
  }, [
    remainingTime,
    dispatch,
    banPickArray,
    banPickIndex,
    currentBanPick,
    listData,
  ]);

  const list = filterData.map((item) => (
    <ChampionItem data={item} key={item.key} />
  ));

  return (
    <div className="champion-list">
      <ul>{list}</ul>
    </div>
  );
};

export default ChampionList;
