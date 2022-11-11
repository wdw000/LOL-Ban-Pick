import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addBanPickIndex,
  addTeamBanPickIndex,
  selectBanPickArray,
  selectBanPickIndex,
  setRemainingTime,
} from "../ban-pick/banPickSlice";

const ChampionBtn = () => {
  const dispatch = useAppDispatch();
  const banPickArray = useAppSelector(selectBanPickArray);
  const banPickIndex = useAppSelector(selectBanPickIndex);
  const currentBanPick = banPickArray[banPickIndex];

  const handleBtn = () => {
    if (banPickArray.length - 1 > banPickIndex) {
      dispatch(addTeamBanPickIndex(currentBanPick));
      dispatch(addBanPickIndex());
      dispatch(setRemainingTime());
    } else {
      console.log("done");
    }
  };

  return <button onClick={handleBtn}>챔피언 선택</button>;
};

export default ChampionBtn;
