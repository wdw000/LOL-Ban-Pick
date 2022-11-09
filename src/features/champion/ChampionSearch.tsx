import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSearch, setSearch } from "./championSlice";

const ChampionSearch = () => {
  const search = useAppSelector(selectSearch);
  const dispatch = useAppDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };
  return <input type="text" value={search} onChange={handleSearch} />;
};

export default ChampionSearch;
