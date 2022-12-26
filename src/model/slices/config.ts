import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import i18n from '@/i18n';
import toast from 'react-hot-toast';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '@/utils/localStorage';
import {
  LANGUAGE,
  RANGE,
  COORDINATE,
  MIN_RANGE,
  DEFAULT_LANGUAGE,
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  MAX_RANGE,
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
const getAppConfigAsync = createAsyncThunk(GET_APP_CONFIG, async () => {
  const language =
    getLocalStorage(LANGUAGE) || ((getLanguage() || '').startsWith('zh') ? 'zh' : 'en');
  const t = await i18n.changeLanguage(language);

  let range = getLocalStorage(RANGE) || MIN_RANGE;
  if (range > MAX_RANGE || range < MIN_RANGE) {
    toast(
      t('range-error', {
        min: MIN_RANGE,
        max: MAX_RANGE,
        value: range,
      })
    );
    removeLocalStorage(RANGE);
    range = MIN_RANGE;
  }

  const [latitude, longitude] = getLocalStorage(COORDINATE) || [
    DEFAULT_LATITUDE,
    DEFAULT_LONGITUDE,
  ];
  return { language, range, latitude, longitude };
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
    updateUser: (draftState, { payload }) => {
      const {
        data: draftData,
        data: {
          app: draftApp,
          app: { latitude, longitude },
        },
      } = draftState;
      let additional = {};

      if (payload.coordinates) {
        const distance = getDistance(
          latitude,
          longitude,
          payload.coordinates[0],
          payload.coordinates[1]
        );

        additional = {
          distance,
          inDistance: distance <= draftApp.range,
        };
      }

      draftData.user = {
        ...draftData.user,
        ...payload,
        ...additional,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAppConfigAsync.fulfilled, (draftState, { payload }) => {
        draftState.isReady = true;
        const { data: draftData } = draftState;
        draftData.app = {
          ...draftData.app,
          ...payload,
        };
      })
      .addCase(saveAppConfig, (draftState, { payload }) => {
        const {
          data: { app: draftApp, user: draftUser },
        } = draftState;
        let additional = {};

        if (draftUser.coordinates) {
          const distance = getDistance(
            payload.latitude,
            payload.longitude,
            draftUser.coordinates[0],
            draftUser.coordinates[1]
          );
          additional = {
            ...additional,
            distance,
            inDistance: distance <= payload.range,
          };
        }

        draftState.data = {
          app: {
            ...draftApp,
            ...payload,
          },
          user: {
            ...draftUser,
            ...additional,
          },
        };
      })
      .addCase(saveLanguage, ({ data: { app: draftApp } }, { payload }) => {
        draftApp.language = payload.language;
      });
  },
});

export const actions = {
  getAppConfigAsync,
  saveAppConfig,
  saveLanguage,
  ...configSlice.actions,
};

// reducer
export default configSlice.reducer;
