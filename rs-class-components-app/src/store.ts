import { configureStore } from '@reduxjs/toolkit';
import { artistsReducer } from './features/artists/artistSlice.ts';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
