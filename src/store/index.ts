import { configureStore, createAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import rootReducers from './reducers';
import { combineReducers } from 'redux';
import { baseCreateApi } from './api/baseCreateApi';

export const resetAll = createAction('RESET_ALL');

const reducers = combineReducers({
  [baseCreateApi.reducerPath]: baseCreateApi.reducer,
  ...rootReducers
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(baseCreateApi.middleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof reducers>;

export type AppDispatch = typeof store.dispatch;

const { dispatch } = store;

const useAppDispatch = () => useDispatch<AppDispatch>();

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store, dispatch, useAppSelector, useAppDispatch };
