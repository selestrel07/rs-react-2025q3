import { type FC, type FormEvent, type ReactNode, useState } from 'react';
import Field from '../field/Field.tsx';
import Input from '../input/Input.tsx';
import Radio from '../radio/Radio.tsx';
import Select from '../select/Select.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks.ts';
import {
  validateAge,
  validateCountry,
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordRepeat,
  validatePicture,
  validateTermsAndConditions,
} from '../../utils/validation.ts';
import { isForm } from '../../utils/is-form.ts';
import { convertToPerson } from '../../utils/formdata-to-person.ts';
import { addPerson } from '../../store/peopleSlice.ts';

const emptyErrors = {
  name: '',
  age: '',
  email: '',
  country: '',
  password: '',
  repeat: '',
  picture: '',
  terms: '',
};

const UncontrolledForm: FC<{
  children: ReactNode;
  onSubmit: () => void;
}> = ({ children, onSubmit }) => {
  const countries = useAppSelector((state) => state.countries.value);
  const [errors, setErrors] = useState(emptyErrors);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    if (isForm(data)) {
      const validationErrors = {
        name: await validateName(data.name),
        age: await validateAge(data.age),
        email: await validateEmail(data.email),
        country: await validateCountry(data.country, countries),
        password: await validatePassword(data.password),
        repeat: await validatePasswordRepeat(data.password, data.repeat),
        picture: await validatePicture(data.picture),
        terms: await validateTermsAndConditions(data.terms),
      };
      setErrors(validationErrors);
      if (Object.values(validationErrors).find((value) => value.length > 0) === undefined) {
        dispatch(addPerson(await convertToPerson(data)));
        onSubmit();
      }
    } else {
      console.error('not a form', data);
    }
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-10/12 self-center flex flex-col gap-2.5"
    >
      <Field labelText="Name *" htmlFor="name">
        <Input id="name" name="name" error={errors.name} type="text" />
      </Field>
      <Field labelText="Age *" htmlFor="age">
        <Input
          id="age"
          name="age"
          type="number"
          error={errors.age}
          alignRight={true}
        />
      </Field>
      <Field labelText="Email *" htmlFor="email">
        <Input id="email" name="email" type="text" error={errors.email} />
      </Field>
      <Field labelText="Gender *" htmlFor="gender">
        <Radio options={['male', 'female', 'other']} name="gender" />
      </Field>
      <Field labelText="Country * " htmlFor="country">
        <Select id="country" options={countries} error={errors.country} />
      </Field>
      <Field labelText="Password * " htmlFor="password">
        <Input
          id="password"
          name="password"
          type="password"
          error={errors.password}
        />
      </Field>
      <Field labelText="Repeat password * " htmlFor="password-repeat">
        <Input
          id="password-repeat"
          name="repeat"
          type="password"
          error={errors.repeat}
        />
      </Field>
      <Field labelText="Upload your picture * " htmlFor="picture">
        <Input id="picture" type="file" name="picture" error={errors.picture} />
      </Field>
      <Field labelText="" htmlFor="terms">
        <Input id="terms" type="checkbox" name="terms" error={errors.terms} />
        <p className="absolute text-amber-700 ml-4">
          I accept and agree to the{' '}
          <b className="cursor-pointer hover:underline">Terms</b> and{' '}
          <b className="cursor-pointer hover:underline">Conditions</b> *
        </p>
      </Field>
      <div className="flex gap-2.5 self-center">
        <button
          className="px-2 py-1 border-2 border-solid border-amber-300 bg-amber-200
           rounded-2xl cursor-pointer hover:scale-105 transition duration-200 ease-linear"
          type="submit"
        >
          Submit
        </button>
        {children}
      </div>
    </form>
  );
};

export default UncontrolledForm;
