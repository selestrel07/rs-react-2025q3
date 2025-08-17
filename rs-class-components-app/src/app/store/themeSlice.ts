import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    value: 'light',
  },
  reducers: {
    setTheme: (state, action): void => {
      state.value = action.payload;
    },
  },
});

export const themeReducer = themeSlice.reducer;

export const { setTheme } = themeSlice.actions;
