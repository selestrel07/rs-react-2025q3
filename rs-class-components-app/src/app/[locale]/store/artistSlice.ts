import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const artistSlice = createSlice({
  name: 'artists',
  initialState: {
    value: [] as number[],
  },
  reducers: {
    addArtist: (state, action: PayloadAction<number>) => {
      state.value = [...state.value, action.payload];
    },
    removeArtist: (state, action: PayloadAction<number>) => {
      state.value = [
        ...state.value.filter((artist) => artist !== action.payload),
      ];
    },
    removeAllArtists: (state) => {
      state.value = [];
    },
  },
});

export const artistsReducer = artistSlice.reducer;

export const addArtistAction = (payload: number) => {
  return {
    type: 'artists/addArtist',
    payload,
  };
};

export const removeArtistAction = (payload: number) => {
  return {
    type: 'artists/removeArtist',
    payload,
  };
};

export const removeAllArtistsAction = () => {
  return {
    type: 'artists/removeAllArtists',
  };
};
