import { configureStore } from '@reduxjs/toolkit';
import { countryReducer } from './countrySlice.ts';
import { peopleReducer } from './peopleSlice.ts';

export const store = configureStore({
  reducer: {
    countries: countryReducer,
    people: peopleReducer,
  }
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;