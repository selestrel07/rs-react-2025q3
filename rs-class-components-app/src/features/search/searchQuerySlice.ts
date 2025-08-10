import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getSearchString } from '../../services/local-storage.service.ts';

const searchQuerySlice = createSlice({
  name: 'searchQuery',
  initialState: {
    query: (getSearchString() as string) ?? '',
  },
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const searchQueryReducer = searchQuerySlice.reducer;
export const { setSearchQuery } = searchQuerySlice.actions;
