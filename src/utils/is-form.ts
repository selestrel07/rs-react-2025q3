import type { Form } from '../interfaces/form/form.ts';

export const isForm = (obj: object): obj is Form => {
  return (
    obj &&
    typeof obj === 'object' &&
    ['name', 'age', 'email', 'password', 'gender', 'country', 'repeat', 'picture'].every(
      (key) => key in obj
    )
  );
};