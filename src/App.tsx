import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import ChampionList from "./features/champion/ChampionList";
import {
  fetchChampionData,
  selectAllChampionDatas,
} from "./features/champion/championSlice";
import TopUI from "./features/ban-pick/top/TopUI";
import PickList from "./features/ban-pick/pick/PickList";
import "./App.css";
import BanList from "./features/ban-pick/ban/BanList";
import ChampionSearch from "./features/champion/ChampionSearch";
import ChampionBtn from "./features/champion/ChampionBtn";
import {
  addBanPickChampion,
  addBanPickIndex,
  addNullBan,
  addTeamBanPickIndex,
  selectAllTeamBanPick,
  selectBanPickArray,
  selectBanPickIndex,
  selectRemainingTime,
  setRemainingTime,
  subRemainingTime,
} from "./features/ban-pick/banPickSlice";

function App() {
  const dispatch = useAppDispatch();
  const championDatasStatus = useAppSelector((state) => state.champion.status);
  const remainingTime = useAppSelector(selectRemainingTime);
  const banPickArray = useAppSelector(selectBanPickArray);
  const banPickIndex = useAppSelector(selectBanPickIndex);
  const championsAllData = useAppSelector(selectAllChampionDatas);
  const allTeamBanPick = useAppSelector(selectAllTeamBanPick).map(
    (item) => item.championIMG
  );
  const currentBanPick = banPickArray[banPickIndex];
  const randomChampionArray = championsAllData.filter(
    (item) => !allTeamBanPick.includes(item.id)
  );

  useEffect(() => {
    if (championDatasStatus === "idle") {
      dispatch(fetchChampionData());
    }
  }, [championDatasStatus, dispatch]);

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
            const random = Math.floor(
              Math.random() * randomChampionArray.length
            );
            dispatch(
              addBanPickChampion({
                ...currentBanPick,
                championIMG: randomChampionArray[random].id,
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
    randomChampionArray,
  ]);

  return (
    <div className="App">
      <TopUI />
      <div className="main">
        <div className="side">
          <PickList team="BLUE" />
          <BanList team="BLUE" />
        </div>

        <div className="champion">
          <ChampionSearch />
          <ChampionList />
          <ChampionBtn />
        </div>

        <div className="side">
          <PickList team="RED" />
          <BanList team="RED" />
        </div>
      </div>
    </div>
  );
}

export default App;
