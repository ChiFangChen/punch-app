import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AnyAction, combineReducers } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import actions from './actions';
import store from './store';

export interface State<T> {
  isReady: boolean;
  data: T;
}

export type RootState = ReturnType<typeof store.getState>;

type AppState = ReturnType<typeof combineReducers>;

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

const useAppDispatch = () => useDispatch<TypedDispatch<AppState>>();

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppDispatch, useAppSelector, actions, store };
