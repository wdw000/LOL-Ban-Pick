import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type BanPick = {
  team: "BLUE" | "RED";
  status: "PICK" | "BAN";
};

export interface TeamPick {
  player: string;
  champion: string;
}

export interface BanObj {
  id: string;
  championID: string;
}

interface InitialState {
  remainingTime: number;
  banPickIndex: number;
  banPickArray: BanPick[];
  bluePick: TeamPick[];
  redPick: TeamPick[];
  blueBan: BanObj[];
  redBan: BanObj[];
  bluePickIndex: number;
  redPickIndex: number;
  blueBanIndex: number;
  redBanIndex: number;
}

const initialState: InitialState = {
  remainingTime: 30,
  banPickIndex: 0,
  banPickArray: [
    { team: "BLUE", status: "BAN" },
    { team: "RED", status: "BAN" },
    { team: "BLUE", status: "BAN" },
    { team: "RED", status: "BAN" },
    { team: "BLUE", status: "BAN" },
    { team: "RED", status: "BAN" },
    { team: "BLUE", status: "PICK" },
    { team: "RED", status: "PICK" },
    { team: "RED", status: "PICK" },
    { team: "BLUE", status: "PICK" },
    { team: "BLUE", status: "PICK" },
    { team: "RED", status: "PICK" },
    { team: "RED", status: "BAN" },
    { team: "BLUE", status: "BAN" },
    { team: "RED", status: "BAN" },
    { team: "BLUE", status: "BAN" },
    { team: "RED", status: "PICK" },
    { team: "BLUE", status: "PICK" },
    { team: "BLUE", status: "PICK" },
    { team: "RED", status: "PICK" },
  ],
  bluePick: new Array<TeamPick>(5)
    .fill({ player: "BLUE", champion: "" })
    .map((item, idx) => {
      return {
        player: `${item.player} ${idx + 1}`,
        champion: "",
      };
    }),
  redPick: new Array<TeamPick>(5)
    .fill({ player: "RED", champion: "" })
    .map((item, idx) => {
      return {
        player: `${item.player} ${idx + 1}`,
        champion: "",
      };
    }),
  blueBan: new Array<BanObj>(5)
    .fill({ id: "BLUE", championID: "" })
    .map((item, idx) => {
      return {
        id: `${item.id}${idx}`,
        championID: "",
      };
    }),
  redBan: new Array<BanObj>(5)
    .fill({ id: "RED", championID: "" })
    .map((item, idx) => {
      return {
        id: `${item.id}${idx}`,
        championID: "",
      };
    }),
  bluePickIndex: 0,
  redPickIndex: 0,
  blueBanIndex: 0,
  redBanIndex: 0,
};

export const banPickSlice = createSlice({
  name: "banPick",
  initialState: initialState,
  reducers: {
    subRemainingTime: (state) => {
      state.remainingTime -= 1;
    },
    addBanPickIndex: (state) => {
      state.banPickIndex += 1;
    },
    setRemainingTime: (state) => {
      state.remainingTime = 30;
    },
  },
});

export const selectRemainingTime = (state: RootState) =>
  state.banPick.remainingTime;

export const selectBanPickArray = (state: RootState) =>
  state.banPick.banPickArray;

export const selectBanPickIndex = (state: RootState) =>
  state.banPick.banPickIndex;

export const selectBluePick = (state: RootState) => state.banPick.bluePick;

export const selectRedPick = (state: RootState) => state.banPick.redPick;

export function selectTeamPick(team: BanPick["team"] | undefined) {
  const bluePick = (state: RootState) => state.banPick.bluePick;
  const redPick = (state: RootState) => state.banPick.redPick;
  if (team === "BLUE") {
    return bluePick;
  } else {
    return redPick;
  }
}

export function selectTeamBan(team: BanPick["team"] | undefined) {
  const blueBan = (state: RootState) => state.banPick.blueBan;
  const redBan = (state: RootState) => state.banPick.redBan;

  if (team === "BLUE") {
    return blueBan;
  } else {
    return redBan;
  }
}

export const { subRemainingTime, addBanPickIndex, setRemainingTime } =
  banPickSlice.actions;

export default banPickSlice.reducer;
