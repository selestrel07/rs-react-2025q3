import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { YearStatistics } from '../types/statistics.ts';

const fieldsSlice = createSlice({
  name: 'optionalFields',
  initialState: {
    value: [] as (keyof YearStatistics)[],
  },
  reducers: {
    setFields: (state, action: PayloadAction<(keyof YearStatistics)[]>) => {
      state.value = action.payload;
    }
  }
});

export const { setFields } = fieldsSlice.actions;
export default fieldsSlice.reducer;