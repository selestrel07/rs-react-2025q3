import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Person } from '../interfaces/person/person.ts';

const PeopleSlice = createSlice({
  name: "people",
  initialState: {
    value: [] as Person[],
  },
  reducers: {
    addPerson: (state, action: PayloadAction<Person>) => {
      state.value = [...state.value, action.payload];
    }
  }
});

export const { addPerson } = PeopleSlice.actions;
export const peopleReducer = PeopleSlice.reducer;