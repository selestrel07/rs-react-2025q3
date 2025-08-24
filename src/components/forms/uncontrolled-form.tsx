import type { FC, FormEvent, ReactNode } from 'react';
import Field from '../field/Field.tsx';
import Input from '../input/Input.tsx';
import Radio from '../radio/Radio.tsx';
import Select from '../select/Select.tsx';
import { useAppSelector } from '../../hooks/store-hooks.ts';

const UncontrolledForm: FC<{ children: ReactNode, onSubmit: (e: FormEvent<HTMLFormElement>) => void }> = ({ children, onSubmit }) => {
  const countries = useAppSelector((state) => state.countries.value);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log('data: ', Object.fromEntries(formData));
    onSubmit(e);
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="w-10/12 self-center flex flex-col gap-2.5">
      <Field labelText="Name *" htmlFor="name">
        <Input id="name" name="name" type="text" />
      </Field>
      <Field labelText="Age *" htmlFor="age">
        <Input id="age" name="age" type="number" alignRight={true} />
      </Field>
      <Field labelText="Email *" htmlFor="email">
        <Input id="email" name="email" type="email" />
      </Field>
      <Field labelText="Gender *" htmlFor="gender">
        <Radio options={['male', 'female', 'other']} name="gender" />
      </Field>
      <Field labelText="Country * " htmlFor="country">
        <Select id="country" options={countries} />
      </Field>
      <Field labelText="Password * " htmlFor="password">
        <Input id="password" name="password" type="password" />
      </Field>
      <Field labelText="Repeat password * " htmlFor="password-repeat">
        <Input id="password-repeat" name="repeat-password" type="password" />
      </Field>
      <Field labelText="Upload your picture * " htmlFor="picture">
        <Input id="picture" type="file" name="picture" />
      </Field>
      <Field labelText="" htmlFor="terms-conditions">
        <Input id="terms-conditions" type="checkbox" name="terms-conditions" />
        <p className="text-amber-700">
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
