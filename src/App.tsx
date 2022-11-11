import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import ChampionList from "./features/champion/ChampionList";
import { fetchChampionData } from "./features/champion/championSlice";
import TopUI from "./features/ban-pick/top/TopUI";
import PickList from "./features/ban-pick/pick/PickList";
import "./App.css";
import BanList from "./features/ban-pick/ban/BanList";
import ChampionSearch from "./features/champion/ChampionSearch";
import ChampionBtn from "./features/champion/ChampionBtn";

function App() {
  const dispatch = useAppDispatch();
  const championDatasStatus = useAppSelector((state) => state.champion.status);

  useEffect(() => {
    if (championDatasStatus === "idle") {
      dispatch(fetchChampionData());
    }
  }, [championDatasStatus, dispatch]);

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
