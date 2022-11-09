import { TeamPick } from "../banPickSlice";

interface PickItemProps {
  data: TeamPick;
}

const PickItem = (props: PickItemProps) => {
  return (
    <li>
      <p>{props.data.champion}</p>
      <p>{props.data.player}</p>
    </li>
  );
};

export default PickItem;
