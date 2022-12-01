import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addBanPickIndex,
  addTeamBanPickIndex,
  initData,
  selectBanPickArray,
  selectBanPickIndex,
  selectCurrentBanORPick,
  setRemainingTime,
  setStatus,
} from "../ban-pick/banPickSlice";
import "./ChampionBtn.css";

const ChampionBtn = () => {
  const dispatch = useAppDispatch();
  const banPickArray = useAppSelector(selectBanPickArray);
  const banPickIndex = useAppSelector(selectBanPickIndex);
  const currentBanPick = banPickArray[banPickIndex];
  const currentBanORPick = useAppSelector(
    selectCurrentBanORPick(currentBanPick)
  );
  const status = useAppSelector((state) => state.banPick.status);

  const handleBtn = () => {
    if (status === "start") {
      if (banPickArray.length - 1 > banPickIndex) {
        if (currentBanORPick !== "") {
          dispatch(addTeamBanPickIndex(currentBanPick));
          dispatch(addBanPickIndex());
          dispatch(setRemainingTime());
        }
      } else {
        dispatch(setStatus("done"));
        dispatch(setRemainingTime());
      }
    } else if (status === "done") {
      dispatch(initData());
      dispatch(setStatus("start"));
    }
  };

  return (
    <button className="champion-btn" onClick={handleBtn}>
      {status === "done" ? "시작하기" : "챔피언 선택"}
    </button>
  );
};

export default ChampionBtn;
