import { createSlice, createAction } from '@reduxjs/toolkit';
import i18n from '@/i18n';
import toast from 'react-hot-toast';
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
import { getLanguage } from '@/utils/language';
import { getDistance } from '@/utils/distance';

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
const getAppConfig = createAction(GET_APP_CONFIG, () => {
  const language =
    getLocalStorage(LANGUAGE) || ((getLanguage() || '').startsWith('zh') ? 'zh' : 'en');
  i18n.changeLanguage(language);
  const range = getLocalStorage(RANGE) || MIN_RANGE;
  const [latitude, longitude] = getLocalStorage(COORDINATE) || [
    DEFAULT_LATITUDE,
    DEFAULT_LONGITUDE,
  ];
  return { payload: { language, range, latitude, longitude } };
});

const saveAppConfig = createAction(SAVE_APP_CONFIG, (appConfig: App) => {
  setLocalStorage(RANGE, appConfig.range);
  setLocalStorage(COORDINATE, [appConfig.latitude, appConfig.longitude]);

  toast.success(i18n.t('saved'));

  return { payload: appConfig };
});

const saveLanguage = createAction(SAVE_LANGUAGE, (language: Language) => {
  setLocalStorage(LANGUAGE, language);

  toast.success(i18n.t('saved'));

  return { payload: { language } };
});

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
      .addCase(getAppConfig, (state, action) => ({
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
      .addCase(saveAppConfig, (state, action) => {
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
      .addCase(saveLanguage, (state, action) => ({
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
  getAppConfig,
  saveAppConfig,
  saveLanguage,
  ...configSlice.actions,
};

// reducer
export default configSlice.reducer;
