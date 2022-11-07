import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import banPickSlice from "../features/ban-pick/banPickSlice";
import championSlice from "../features/champion/championSlice";

export const store = configureStore({
  reducer: {
    champion: championSlice,
    banPick: banPickSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
