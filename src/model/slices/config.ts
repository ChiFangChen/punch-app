import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import {
  RANGE,
  COORDINATE,
  MIN_RANGE,
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
} from '@/utils/constants';
import { State, actions as wholeActions } from '@/model';
import { getDistance } from '@/utils/getDistance';

interface App {
  range: number;
  latitude: number;
  longitude: number;
}

interface User {
  gps: boolean;
  coordinates?: [number, number];
  distance?: number;
  inDistance: boolean;
}
interface Config {
  app: App;
  user: User;
}

const initialState: State<Config> = {
  isReady: false,
  data: {
    app: {
      range: MIN_RANGE,
      latitude: DEFAULT_LATITUDE,
      longitude: DEFAULT_LONGITUDE,
    },
    user: {
      gps: false,
      coordinates: undefined,
      distance: undefined,
      inDistance: false,
    },
  },
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { latitude, longitude } = state.data.app;
      const distance = getDistance(
        latitude,
        longitude,
        action.payload.coordinates[0],
        action.payload.coordinates[1]
      );
      return {
        ...state,
        data: {
          ...state.data,
          user: {
            ...state.data.user,
            ...action.payload,
            ...(action.payload.coordinates
              ? {
                  distance,
                  inDistance: distance <= state.data.app.range,
                }
              : {}),
          },
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAppConfigAsync.fulfilled, (state, action) => ({
        ...state,
        isReady: true,
        data: { ...state.data, app: action.payload },
      }))
      .addCase(saveAppConfigAsync.fulfilled, (state, action) => {
        const distance = getDistance(
          action.payload.latitude,
          action.payload.longitude,
          state.data.user.coordinates[0],
          state.data.user.coordinates[1]
        );
        return {
          ...state,
          data: {
            ...state.data,
            app: action.payload,
            user: {
              ...state.data.user,
              distance,
              inDistance: distance <= action.payload.range,
            },
          },
        };
      });
  },
});

// action constants
const GET_RANGE = 'GET_RANGE';
const SAVE_RANGE = 'SAVE_RANGE';

// action creators
const getAppConfigAsync = createAsyncThunk<App>(GET_RANGE, async () => {
  const range = getLocalStorage(RANGE) || MIN_RANGE;
  const [latitude, longitude] = getLocalStorage(COORDINATE) || [
    DEFAULT_LATITUDE,
    DEFAULT_LONGITUDE,
  ];
  return { range, latitude, longitude };
});

const saveAppConfigAsync = createAsyncThunk<App, App>(SAVE_RANGE, async (config) => {
  setLocalStorage(RANGE, config.range);
  setLocalStorage(COORDINATE, [config.latitude, config.longitude]);
  return config;
});

export const actions = { getAppConfigAsync, saveAppConfigAsync, ...configSlice.actions };

// reducer
export default configSlice.reducer;
