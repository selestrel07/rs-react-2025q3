import type { Person } from '../interfaces/person/person.ts';

export const isPerson = (obj: object): obj is Person => {
  return (
    obj &&
    typeof obj === 'object' &&
    ['name', 'age', 'email', 'password', 'gender', 'country'].every(
      (key) => key in obj
    )
  );
};
