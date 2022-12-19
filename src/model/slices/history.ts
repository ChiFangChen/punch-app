import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import { HISTORY } from '@/utils/constants';
import { Record, RootState, State } from '@/model/types';
import { getAddress } from '@/apis';

const initialState: State<Record[]> = {
  isReady: false,
  data: [],
};

// action constants
const GET_HISTORY = 'GET_HISTORY';
const APPEND_RECORD = 'APPEND_RECORD';

// action creators
const getHistoryAsync = createAsyncThunk<Record[]>(GET_HISTORY, async () => {
  const history = getLocalStorage(HISTORY) || [];
  return history;
});

const appendHistoryAsync = createAsyncThunk<Record, { action: 'in' | 'out'; timestamp: number }>(
  APPEND_RECORD,
  async (record, { getState }) => {
    const {
      history: { data: history },
      config: {
        data: { user },
      },
    } = getState() as RootState;

    if (!user.coordinates) throw Error("Can't get user's coordinates");

    const addressResult = await getAddress({
      latitude: user.coordinates[0],
      longitude: user.coordinates[1],
    });
    const data = {
      ...record,
      address: addressResult.features[0].place_name,
    };
    setLocalStorage(HISTORY, [data, ...history]);
    return data;
  }
);

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHistoryAsync.fulfilled, (state, action) => ({
        ...state,
        isReady: true,
        data: action.payload,
      }))
      .addCase(appendHistoryAsync.fulfilled, (state, action) => ({
        ...state,
        data: [action.payload, ...state.data],
      }));
  },
});

export const actions = { getHistoryAsync, appendHistoryAsync };

// reducer
export default historySlice.reducer;