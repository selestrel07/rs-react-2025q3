import { configureStore } from '@reduxjs/toolkit';
import yearReducer from './yearSlice.ts';
import sortingReducer from './sortingSlice.ts';
import filterReducer from './filterSlice.ts';

export const store = configureStore({
  reducer: {
    year: yearReducer,
    sorting: sortingReducer,
    filter: filterReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
