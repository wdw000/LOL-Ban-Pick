import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type BanPick = {
  team: "BLUE" | "RED";
  status: "PICK" | "BAN";
};

export interface TeamPick {
  player: string;
  championIMG: string;
}

export interface BanObj {
  id: string;
  championIMG: string;
}

interface InitialState {
  status: "start" | "done";
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
  status: "done",
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
    .fill({ player: "BLUE", championIMG: "" })
    .map((item, idx) => {
      return {
        player: `${item.player} ${idx + 1}`,
        championIMG: item.championIMG,
      };
    }),
  redPick: new Array<TeamPick>(5)
    .fill({ player: "RED", championIMG: "" })
    .map((item, idx) => {
      return {
        player: `${item.player} ${idx + 1}`,
        championIMG: item.championIMG,
      };
    }),
  blueBan: new Array<BanObj>(5)
    .fill({ id: "BLUE", championIMG: "" })
    .map((item, idx) => {
      return {
        id: `${item.id}${idx}`,
        championIMG: item.championIMG,
      };
    }),
  redBan: new Array<BanObj>(5)
    .fill({ id: "RED", championIMG: "" })
    .map((item, idx) => {
      return {
        id: `${item.id}${idx}`,
        championIMG: item.championIMG,
      };
    }),
  bluePickIndex: 0,
  redPickIndex: 0,
  blueBanIndex: 0,
  redBanIndex: 4,
};

export const banPickSlice = createSlice({
  name: "banPick",
  initialState: initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<InitialState["status"]>) => {
      state.status = action.payload;
    },
    subRemainingTime: (state) => {
      state.remainingTime -= 1;
    },
    addBanPickIndex: (state) => {
      state.banPickIndex += 1;
    },
    setRemainingTime: (state) => {
      state.remainingTime = 30;
    },
    addBanPickChampion: (
      state,
      action: PayloadAction<BanPick & { championIMG: string }>
    ) => {
      if (action.payload.team === "BLUE") {
        if (action.payload.status === "BAN") {
          state.blueBan[state.blueBanIndex].championIMG =
            action.payload.championIMG;
        } else if (action.payload.status === "PICK") {
          state.bluePick[state.bluePickIndex].championIMG =
            action.payload.championIMG;
        }
      } else if (action.payload.team === "RED") {
        if (action.payload.status === "BAN") {
          state.redBan[state.redBanIndex].championIMG =
            action.payload.championIMG;
        } else if (action.payload.status === "PICK") {
          state.redPick[state.redPickIndex].championIMG =
            action.payload.championIMG;
        }
      }
    },
    addTeamBanPickIndex: (state, action: PayloadAction<BanPick>) => {
      if (action.payload.team === "BLUE") {
        if (action.payload.status === "BAN") {
          state.blueBanIndex += 1;
        } else if (action.payload.status === "PICK") {
          state.bluePickIndex += 1;
        }
      } else if (action.payload.team === "RED") {
        if (action.payload.status === "BAN") {
          state.redBanIndex -= 1;
        } else if (action.payload.status === "PICK") {
          state.redPickIndex += 1;
        }
      }
    },
    addNullBan: (state, action: PayloadAction<BanPick["team"]>) => {
      if (action.payload === "BLUE") {
        state.blueBan[state.blueBanIndex].championIMG = "";
      } else if (action.payload === "RED") {
        state.redBan[state.redBanIndex].championIMG = "";
      }
    },
    initData: (state) => {
      state.banPickIndex = initialState.banPickIndex;
      state.blueBan = initialState.blueBan;
      state.blueBanIndex = initialState.blueBanIndex;
      state.bluePick = initialState.bluePick;
      state.bluePickIndex = initialState.bluePickIndex;
      state.redBan = initialState.redBan;
      state.redBanIndex = initialState.redBanIndex;
      state.redPick = initialState.redPick;
      state.redPickIndex = initialState.redPickIndex;
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

export function selectCurrentBanORPick(currentBanPick: BanPick) {
  if (currentBanPick.team === "BLUE") {
    if (currentBanPick.status === "BAN") {
      return (state: RootState) =>
        state.banPick.blueBan[state.banPick.blueBanIndex].championIMG;
    } else {
      return (state: RootState) =>
        state.banPick.bluePick[state.banPick.bluePickIndex].championIMG;
    }
  } else {
    if (currentBanPick.status === "BAN") {
      return (state: RootState) =>
        state.banPick.redBan[state.banPick.redBanIndex].championIMG;
    } else {
      return (state: RootState) =>
        state.banPick.redPick[state.banPick.redPickIndex].championIMG;
    }
  }
}

export const selectAllTeamBanPick = (state: RootState) => {
  const result = [
    ...state.banPick.blueBan,
    ...state.banPick.redBan,
    ...state.banPick.bluePick,
    ...state.banPick.redPick,
  ];

  return result;
};

export function selectTeamBanIndex(team: BanPick["team"]) {
  if (team === "BLUE") {
    return (state: RootState) => state.banPick.blueBanIndex;
  } else {
    return (state: RootState) => state.banPick.redBanIndex;
  }
}

export function selectTeamPickIndex(team: BanPick["team"]) {
  if (team === "BLUE") {
    return (state: RootState) => state.banPick.bluePickIndex;
  } else {
    return (state: RootState) => state.banPick.redPickIndex;
  }
}

export const {
  subRemainingTime,
  addBanPickIndex,
  setRemainingTime,
  addBanPickChampion,
  addTeamBanPickIndex,
  addNullBan,
  setStatus,
  initData,
} = banPickSlice.actions;

export default banPickSlice.reducer;
