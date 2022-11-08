import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type BanPick = {
  team: "BLUE" | "RED";
  status: "PICK" | "BAN";
};

interface InitialState {
  remainingTime: number;
  banPickIndex: number;
  banPickArray: BanPick[];
}

const initialState: InitialState = {
  remainingTime: 30,
  banPickIndex: 0,
  banPickArray: [
    { team: "BLUE", status: "BAN" },
    { team: "RED", status: "BAN" },
  ],
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

export const { subRemainingTime, addBanPickIndex, setRemainingTime } =
  banPickSlice.actions;

export default banPickSlice.reducer;
