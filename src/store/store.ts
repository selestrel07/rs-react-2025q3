import { configureStore } from '@reduxjs/toolkit';
import yearReducer from './yearSlice.ts';
import sortingReducer from './sortingSlice.ts';
import filterReducer from './filterSlice.ts';
import optionalFieldsReducer from './fieldsSlice.ts';

export const store = configureStore({
  reducer: {
    year: yearReducer,
    sorting: sortingReducer,
    filter: filterReducer,
    optionalFields: optionalFieldsReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
