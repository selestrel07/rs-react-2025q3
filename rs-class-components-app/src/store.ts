import { configureStore } from '@reduxjs/toolkit';
import { artistsReducer } from './features/artists/artistSlice.ts';
import { artistsApi } from './services/api.service.ts';
import { paginationReducer } from './features/paginaton/paginationSlice.ts';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    pagination: paginationReducer,
    [artistsApi.reducerPath]: artistsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(artistsApi.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
