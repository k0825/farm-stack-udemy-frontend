import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer from '../slices/appSlices';

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
