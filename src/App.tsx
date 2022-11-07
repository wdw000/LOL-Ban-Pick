import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import ChampionList from "./features/champion/ChampionList";
import { fetchChampionData } from "./features/champion/championSlice";
import TopUI from "./features/ban-pick/top/TopUI";

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
      <ChampionList />
    </div>
  );
}

export default App;
