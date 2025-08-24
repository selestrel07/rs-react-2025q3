import type { Person } from '../interfaces/person/person.ts';
import { isPerson } from './is-person.ts';
import { fileToBase64 } from './file-to-base64.ts';

export const convertToPerson = async (obj: object): Promise<Person> => {
  const person: Person = {
    name: '',
    age: '',
    country: '',
    picture: '',
    email: '',
    gender: '',
    password: '',
  };

  if ('picture' in obj) {
    try {
      obj.picture = await fileToBase64(obj.picture as File);
    } catch (error) {
      console.error('Failed to convert file:', error);
    }
  }

  if (isPerson(obj)) {
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
