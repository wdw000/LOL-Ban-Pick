import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface InitialState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
  data: ChampionInfo[];
  search: string;
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
  show: boolean;
  checked: boolean;
}

interface ChampionDatas {
  data: ChampionData | null;
  format: string | null;
  type: string | null;
  version: string | null;
}

const initialState: InitialState = {
  status: "idle",
  data: [],
  error: undefined,
  search: "",
};

export const fetchChampionData = createAsyncThunk(
  "champion/fetchChampionData",
  async () => {
    const response = await fetch(
      `http://ddragon.leagueoflegends.com/cdn/12.21.1/data/ko_KR/champion.json`
    );

    return await response.json();
  }
);

export const championSlice = createSlice({
  name: "champion",
  initialState: initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<InitialState["search"]>) => {
      state.search = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchChampionData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        fetchChampionData.fulfilled,
        (state, action: PayloadAction<ChampionDatas>) => {
          const championData = action.payload.data;
          const championArray: ChampionInfo[] = [];

          for (const key in championData) {
            const data: ChampionInfo = {
              ...championData[key],
              show: true,
              checked: false,
            };

            championArray.push(data);
          }

          championArray.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            } else if (a.name > b.name) {
              return 1;
            } else {
              return 0;
            }
          });

          state.status = "succeeded";
          state.data = championArray;
        }
      )
      .addCase(fetchChampionData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSearch } = championSlice.actions;

export const selectAllChampionDatas = (state: RootState) => state.champion.data;

export const selectSearch = (state: RootState) => state.champion.search;

export default championSlice.reducer;
