import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const yearSlice = createSlice({
  name: 'year',
  initialState: {
    value: 0
  },
  reducers: {
    setYear: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    }
  }
});

export const {setYear} = yearSlice.actions;
export default yearSlice.reducer;