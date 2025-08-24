import type { Person } from '../interfaces/person/person.ts';

export const isPerson = (obj: object, keys: (keyof Person)[]): obj is Person => {
  return obj && typeof obj === 'object' && keys.every((key) => key in obj);
};