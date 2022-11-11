import { useAppSelector } from "../../../app/hooks";
import {
  BanPick,
  selectBanPickArray,
  selectBanPickIndex,
  selectRemainingTime,
} from "../banPickSlice";
import "./TimerProgressBar.css";

interface TimerProgressBarProps {
  team: BanPick["team"];
}

const TimerProgressBar = (props: TimerProgressBarProps) => {
  const banPickArray = useAppSelector(selectBanPickArray);
  const banPickIndex = useAppSelector(selectBanPickIndex);
  const remainingTime = useAppSelector(selectRemainingTime);

  const currentBanPick = banPickArray[banPickIndex];
  const currentProgressBarWidth = (remainingTime / 30) * 100;

  const isOnStyle =
    currentBanPick.team === props.team
      ? {
          width: `${currentProgressBarWidth}%`,
        }
      : {};

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
