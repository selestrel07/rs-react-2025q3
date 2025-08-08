import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pageCount',
  initialState: {
    value: 1,
  },
  reducers: {
    setPageCount: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const paginationReducer = paginationSlice.reducer;
export const { setPageCount } = paginationSlice.actions;
