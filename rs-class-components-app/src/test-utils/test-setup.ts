import { afterAll, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { server } from './server.ts';
import { store } from '../store.ts';
import { removeAllArtistsAction } from '../features/artists/artistSlice.ts';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterAll(() => {
  server.close();
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
  store.dispatch(removeAllArtistsAction());
});
