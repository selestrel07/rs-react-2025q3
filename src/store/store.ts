import { configureStore } from '@reduxjs/toolkit';
import yearReducer from './yearSlice.ts';
import sortingReducer from './sortingSlice.ts';

export const store = configureStore({
  reducer: {
    year: yearReducer,
    sorting: sortingReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
