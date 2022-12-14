import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSearch, setSearch } from "./championSlice";
import "./ChampionSearch.css";

const ChampionSearch = () => {
  const search = useAppSelector(selectSearch);
  const dispatch = useAppDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };
  return (
    <input
      className="champion-search"
      type="text"
      value={search}
      onChange={handleSearch}
      placeholder="챔피언 검색"
    />
  );
};

export default ChampionSearch;
