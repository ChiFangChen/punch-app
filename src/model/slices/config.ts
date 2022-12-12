import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import i18n from '@/i18n';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import {
  LANGUAGE,
  RANGE,
  COORDINATE,
  MIN_RANGE,
  DEFAULT_LANGUAGE,
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
} from '@/utils/constants';
import { Language, Config, App, State } from '@/model/types';
import { getDistance } from '@/utils/getDistance';

const initialState: State<Config> = {
  isReady: false,
  data: {
    app: {
      language: DEFAULT_LANGUAGE,
      range: MIN_RANGE,
      latitude: DEFAULT_LATITUDE,
      longitude: DEFAULT_LONGITUDE,
    },
    user: {
      gps: undefined,
      coordinates: undefined,
      distance: undefined,
      inDistance: false,
    },
  },
};

// action constants
const GET_APP_CONFIG = 'GET_APP_CONFIG';
const SAVE_APP_CONFIG = 'SAVE_APP_CONFIG';
const SAVE_LANGUAGE = 'SAVE_LANGUAGE';

// action creators
const getAppConfigAsync = createAsyncThunk<App>(GET_APP_CONFIG, async () => {
  const language = getLocalStorage(LANGUAGE) || DEFAULT_LANGUAGE;
  i18n.changeLanguage(language);
  const range = getLocalStorage(RANGE) || MIN_RANGE;
  const [latitude, longitude] = getLocalStorage(COORDINATE) || [
    DEFAULT_LATITUDE,
    DEFAULT_LONGITUDE,
  ];
  return { language, range, latitude, longitude };
});

const saveAppConfigAsync = createAsyncThunk<App, App>(SAVE_APP_CONFIG, async (config) => {
  setLocalStorage(RANGE, config.range);
  setLocalStorage(COORDINATE, [config.latitude, config.longitude]);
  return config;
});

const saveLanguageAsync = createAsyncThunk<{ language: Language }, Language>(
  SAVE_LANGUAGE,
  async (language) => {
    setLocalStorage(LANGUAGE, language);
    return { language };
  }
);

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { latitude, longitude } = state.data.app;
      let additional = {};

      if (action.payload.coordinates) {
        const distance = getDistance(
          latitude,
          longitude,
          action.payload.coordinates[0],
          action.payload.coordinates[1]
        );
        additional = {
          ...additional,
          distance,
          inDistance: distance <= state.data.app.range,
        };
      }

      return {
        ...state,
        data: {
          ...state.data,
          user: {
            ...state.data.user,
            ...action.payload,
            ...additional,
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
        data: {
          ...state.data,
          app: {
            ...state.data.app,
            ...action.payload,
          },
        },
      }))
      .addCase(saveAppConfigAsync.fulfilled, (state, action) => {
        let additional = {};

        if (state.data.user.coordinates) {
          const distance = getDistance(
            action.payload.latitude,
            action.payload.longitude,
            state.data.user.coordinates[0],
            state.data.user.coordinates[1]
          );
          additional = {
            ...additional,
            distance,
            inDistance: distance <= action.payload.range,
          };
        }

        return {
          ...state,
          data: {
            ...state.data,
            app: {
              ...state.data.app,
              ...action.payload,
            },
            user: {
              ...state.data.user,
              ...additional,
            },
          },
        };
      })
      .addCase(saveLanguageAsync.fulfilled, (state, action) => ({
        ...state,
        data: {
          ...state.data,
          app: {
            ...state.data.app,
            language: action.payload.language,
          },
        },
      }));
  },
});

export const actions = {
  getAppConfigAsync,
  saveAppConfigAsync,
  saveLanguageAsync,
  ...configSlice.actions,
};

// reducer
export default configSlice.reducer;
