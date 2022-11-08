import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  addBanPickIndex,
  BanPick,
  selectBanPickArray,
  selectBanPickIndex,
  selectRemainingTime,
  setRemainingTime,
  subRemainingTime,
} from "../banPickSlice";
import "./TimerProgressBar.css";

interface TimerProgressBarProps {
  team: BanPick["team"];
}

const TimerProgressBar = (props: TimerProgressBarProps) => {
  const banPickArray = useAppSelector(selectBanPickArray);
  const banPickIndex = useAppSelector(selectBanPickIndex);
  const remainingTime = useAppSelector(selectRemainingTime);
  const dispatch = useAppDispatch();

  const currentBanPick = banPickArray[banPickIndex];
  const currentProgressBarWidth = (remainingTime / 30) * 100;

  const isOnStyle =
    currentBanPick.team === props.team
      ? {
          width: `${currentProgressBarWidth}%`,
        }
      : {};

  useEffect(() => {
    const countDown = setInterval(() => {
      if (remainingTime > 0) {
        dispatch(subRemainingTime());
      } else if (remainingTime === 0) {
        clearInterval(countDown);
        if (banPickArray.length - 1 > banPickIndex) {
          dispatch(addBanPickIndex());
          dispatch(setRemainingTime());
        }
      }
    }, 1000);

    return () => {
      clearInterval(countDown);
    };
  }, [remainingTime, dispatch, banPickArray, banPickIndex]);

  return (
    <div className="timer-progress-bar">
      <div
        style={isOnStyle}
        className={props.team === "BLUE" ? `blue-side` : `red-side`}
      ></div>
    </div>
  );
};

export default TimerProgressBar;
