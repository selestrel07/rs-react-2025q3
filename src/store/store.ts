import { configureStore } from '@reduxjs/toolkit';
import { yearSlice } from './yearSlice.ts';

export const store = configureStore({
  reducer: {
    year: yearSlice.reducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
