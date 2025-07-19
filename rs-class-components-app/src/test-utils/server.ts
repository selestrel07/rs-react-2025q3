import { setupServer } from 'msw/node';
import { handlers } from './api-handlers.ts';

export const server = setupServer(...handlers);
