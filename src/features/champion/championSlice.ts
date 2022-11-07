import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface InitialState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
  data: ChampionDatas;
}

interface ChampionData {
  [key: string]: ChampionInfo;
}

export interface ChampionInfo {
  blurb: string;
  id: string;
  image: {
    full: string;
    group: string;
    h: number;
    sprite: string;
    w: number;
    x: number;
    y: number;
  };
  info: {
    attack: number;
    defense: number;
    difficulty: number;
    magic: number;
  };
  key: string;
  name: string;
  partype: string;
  stats: {
    armor: number;
    armorperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackrange: number;
    attackspeed: number;
    attackspeedperlevel: number;
    crit: number;
    critperlevel: number;
    hp: number;
    hpperlevel: number;
    hpregen: number;
    hpregenperlevel: number;
    movespeed: number;
    mp: number;
    mpperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
  };
  tags: string[];
  title: string;
  version: string;
}

interface ChampionDatas {
  data: ChampionData | null;
  format: string | null;
  type: string | null;
  version: string | null;
}

const initialState: InitialState = {
  status: "idle",
  data: {
    data: null,
    format: null,
    type: null,
    version: null,
  },
  error: undefined,
};

export const fetchChampionData = createAsyncThunk(
  "champion/fetchChampionData",
  async () => {
    const response = await fetch(
      `http://ddragon.leagueoflegends.com/cdn/12.21.1/data/ko_KR/champion.json?api_key=${process.env.REACT_APP_RIOT_API}`
    );

    return await response.json();
  }
);

export const championSlice = createSlice({
  name: "champion",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchChampionData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchChampionData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchChampionData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export const {} = championSlice.actions;

export const selectAllChampionDatas = (state: RootState) =>
  state.champion.data.data;

export default championSlice.reducer;
