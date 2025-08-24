import { configureStore } from '@reduxjs/toolkit';
import { countryReducer } from './countrySlice.ts';

export const store = configureStore({
  reducer: {
    countries: countryReducer
  }
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;