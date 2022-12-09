import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import {
  RANGE,
  COORDINATE,
  MIN_RANGE,
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
} from '@/utils/constants';
import { State } from '@/model';

interface Config {
  range: number;
  latitude: number;
  longitude: number;
}

const initialState: State<Config> = {
  isReady: false,
  data: {
    range: MIN_RANGE,
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE,
  },
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConfigAsync.fulfilled, (state, action) => ({
        ...state,
        isReady: true,
        data: action.payload,
      }))
      .addCase(saveConfigAsync.fulfilled, (state, action) => ({
        ...state,
        data: action.payload,
      }));
  },
});

// action constants
const GET_RANGE = 'GET_RANGE';
const SAVE_RANGE = 'SAVE_RANGE';

// action creators
const getConfigAsync = createAsyncThunk<Config>(GET_RANGE, async () => {
  const range = getLocalStorage(RANGE) || MIN_RANGE;
  const [latitude, longitude] = getLocalStorage(COORDINATE) || [
    DEFAULT_LATITUDE,
    DEFAULT_LONGITUDE,
  ];
  return { range, latitude, longitude };
});

const saveConfigAsync = createAsyncThunk<Config, Config>(SAVE_RANGE, async (config) => {
  setLocalStorage(RANGE, config.range);
  setLocalStorage(COORDINATE, [config.latitude, config.longitude]);
  return config;
});

export const actions = { getConfigAsync, saveConfigAsync };

// reducer
export default configSlice.reducer;
