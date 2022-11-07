import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type BanPick = {
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
  reducers: {},
});

export const selectRemainingTime = (state: RootState) =>
  state.banPick.remainingTime;

export const selectBanPickArray = (state: RootState) =>
  state.banPick.banPickArray;

export const selectBanPickIndex = (state: RootState) =>
  state.banPick.banPickIndex;

export default banPickSlice.reducer;
