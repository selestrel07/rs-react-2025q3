import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ArtistInfo } from '../../types/artist-data.ts';

const artistSlice = createSlice({
  name: 'artists',
  initialState: {
    value: [] as ArtistInfo[],
  },
  reducers: {
    addArtist: (state, action: PayloadAction<ArtistInfo>) => {
      state.value = [...state.value, action.payload];
    },
    removeArtist: (state, action: PayloadAction<ArtistInfo>) => {
      state.value = [
        ...state.value.filter((artist) => artist.id !== action.payload.id),
      ];
    },
  },
});

export const artistsReducer = artistSlice.reducer;

export const addArtistAction = (payload: ArtistInfo) => {
  return {
    type: 'artists/addArtist',
    payload,
  };
};

export const removeArtistAction = (payload: ArtistInfo) => {
  return {
    type: 'artists/removeArtist',
    payload,
  };
};
