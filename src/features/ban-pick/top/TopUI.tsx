import { useAppSelector } from "../../../app/hooks";
import {
  selectBanPickArray,
  selectBanPickIndex,
  selectRemainingTime,
} from "../banPickSlice";
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
          <p>{remainingTime}</p>
        </div>
        <p>레드팀</p>
      </div>

      <div className="bottom">
        <div>블루팀 남은 시간</div>
        <div>레드팀 남은 시간</div>
      </div>
    </div>
  );
};

export default Top;
