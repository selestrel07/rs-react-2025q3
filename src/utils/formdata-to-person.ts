import type { Person } from '../interfaces/person/person.ts';
import { isPerson } from './is-person.ts';

export const convertToPerson = (obj: object): Person => {
  const person: Person = {
    name: '',
    age: '',
    country: '',
    picture: '',
    email: '',
    gender: '',
    password: '',
  };

  if (
    isPerson(obj, ['name', 'age', 'country', 'email', 'gender', 'password'])
  ) {
    person.name = obj.name;
    person.age = obj.age;
    person.country = obj.country;
    person.picture = obj.picture;
    person.email = obj.email;
    person.gender = obj.gender;
    person.password = obj.password;
  }

  return person;
};