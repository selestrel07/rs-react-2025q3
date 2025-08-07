import { configureStore } from '@reduxjs/toolkit';
import { artistsReducer } from './features/artists/artistSlice.ts';
import { artistsApi } from './services/api.service.ts';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    [artistsApi.reducerPath]: artistsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(artistsApi.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
