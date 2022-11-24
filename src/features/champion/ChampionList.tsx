import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ChampionItem from "./ChampionItem";
import { selectAllChampionDatas } from "./championSlice";
import "./ChampionList.css";
import { useEffect } from "react";
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
  const remainingTime = useAppSelector(selectRemainingTime);
  const banPickArray = useAppSelector(selectBanPickArray);
  const banPickIndex = useAppSelector(selectBanPickIndex);
  const currentBanPick = banPickArray[banPickIndex];
  const dispatch = useAppDispatch();

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
            const random = Math.floor(Math.random() * championsAllData.length);
            dispatch(
              addBanPickChampion({
                ...currentBanPick,
                championIMG: championsAllData[random].id,
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
    championsAllData,
  ]);

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
