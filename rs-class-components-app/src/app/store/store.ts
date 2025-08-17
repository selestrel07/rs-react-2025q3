import { configureStore } from '@reduxjs/toolkit';
import { artistsReducer } from './artistSlice.ts';
import { themeReducer } from './themeSlice';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    theme: themeReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
