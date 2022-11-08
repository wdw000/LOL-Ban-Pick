import { useAppSelector } from "../../../app/hooks";
import {
  selectBanPickArray,
  selectBanPickIndex,
  selectRemainingTime,
} from "../banPickSlice";
import TimerProgressBar from "./TimerProgressBar";
import "./TopUI.css";

const Top = () => {
  const remainingTime = useAppSelector(selectRemainingTime);
  const banPickArray = useAppSelector(selectBanPickArray);
  const banPickIndex = useAppSelector(selectBanPickIndex);

  return (
    <div className="top-ui">
      <div className="top">
        <p>블루팀</p>
        <div>
          <p>
            {banPickArray[banPickIndex].team} TEAM{" "}
            {banPickArray[banPickIndex].status}
          </p>
        </div>
        <p>레드팀</p>
      </div>

      <div className="bottom">
        <TimerProgressBar team="BLUE" />
        <p>{remainingTime}</p>
        <TimerProgressBar team="RED" />
      </div>
    </div>
  );
};

export default Top;
