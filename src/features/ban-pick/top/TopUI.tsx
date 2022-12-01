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
        <div className="blue team">
          <p>BLUE</p>
        </div>
        <div className="ban-pick-status">
          <div>
            {banPickArray[banPickIndex].team}{" "}
            {banPickArray[banPickIndex].status}
            <br />
            <span>{remainingTime}</span>
          </div>
        </div>
        <div className="red team">
          <p>RED</p>
        </div>
      </div>

      <div className="bottom">
        <TimerProgressBar team="BLUE" />
        <TimerProgressBar team="RED" />
      </div>
    </div>
  );
};

export default Top;
