import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SortingState } from '../types/sorting.ts';

const sortingSlice = createSlice({
  name: 'sorting',
  initialState: {
    value: {
      field: 'country',
      order: 'ASC',
    } as SortingState,
  },
  reducers: {
    setSorting: (state, action: PayloadAction<SortingState>) => {
      state.value = action.payload;
    },
  },
});

export const { setSorting } = sortingSlice.actions;
export default sortingSlice.reducer;
