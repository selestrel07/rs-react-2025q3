import { configureStore } from '@reduxjs/toolkit';
import { artistsReducer } from './features/artists/artistSlice.ts';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
  },
});

export const getArtists = () => store.getState().artists.value;
