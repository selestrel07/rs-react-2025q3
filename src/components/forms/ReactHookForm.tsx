import type { FC, ReactNode } from 'react';
import { Controller, type FieldValues, useForm } from 'react-hook-form';
import Field from '../field/Field.tsx';
import Input from '../input/Input.tsx';
import Radio from '../radio/Radio.tsx';
import Select from '../select/Select.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks.ts';
import { boolean, type InferType, object, ref, string } from 'yup';
import {
  ageSchema,
  emailSchema,
  nameSchema,
  passwordSchema,
  pictureSchema,
} from '../../utils/validation.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { addPerson } from '../../store/peopleSlice.ts';
import { convertToPerson } from '../../utils/formdata-to-person.ts';

const ReactHookForm: FC<{ children: ReactNode; onSubmit: () => void }> = ({
  children,
  onSubmit,
}) => {
  const countries = useAppSelector((state) => state.countries.value);
  const dispatch = useAppDispatch();

  const schema = object({
    name: nameSchema,
    age: ageSchema,
    gender: string().default('male').required(),
    country: string()
      .required()
      .oneOf(countries, 'Choose the country from the provided list'),
    email: emailSchema,
    password: passwordSchema,
    repeat: string()
      .oneOf([ref('password')], 'Passwords are not equal')
      .required(),
    picture: pictureSchema.required(),
    terms: boolean().oneOf([true]).required(),
  });

  type FormValues = InferType<typeof schema>;
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const handleFormSubmit = async (data: FieldValues) => {
    dispatch(addPerson(await convertToPerson(data)));
    onSubmit();
  };
  return (
    <form
      className="w-10/12 self-center flex flex-col gap-2.5"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Field labelText="Name *" htmlFor="name">
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              id="name"
              {...field}
              type="text"
              error={errors.name?.message}
            />
          )}
          name={'name'}
        />
      </Field>
      <Field labelText="Age *" htmlFor="age">
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              id="age"
              {...field}
              type="number"
              error={errors.age?.message}
              alignRight
            />
          )}
          name="age"
        />
      </Field>
      <Field labelText="Email *" htmlFor="email">
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              id="email"
              type="email"
              {...field}
              error={errors.email?.message}
            />
          )}
          name={'email'}
        />
      </Field>
      <Field labelText="Gender *" htmlFor="gender">
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <Radio options={['male', 'female', 'other']} {...field} />
          )}
        />
      </Field>
      <Field labelText="Country *" htmlFor="country">
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Select
              id="country"
              error={errors.country?.message}
              options={countries}
              {...field}
            />
          )}
        />
      </Field>
      <Field labelText="Password *" htmlFor="password">
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              id="password"
              type="password"
              {...field}
              error={errors.password?.message}
            />
          )}
          name={'password'}
        />
      </Field>
      <Field labelText="Repeat password *" htmlFor="password-repeat">
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              id="password-repeat"
              type="password"
              {...field}
              error={errors.repeat?.message}
            />
          )}
          name={'repeat'}
        />
      </Field>
      <Field labelText="Upload your picture *" htmlFor="picture">
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              id="picture"
              type="file"
              name={field.name}
              onChange={(e) => {
                const file = e.target.files?.[0];
                field.onChange(file);
              }}
              onBlur={field.onBlur}
              error={errors.picture?.message}
            />
          )}
          name={'picture'}
        />
      </Field>
      <Field labelText="" htmlFor="terms">
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              id="terms"
              name={field.name}
              defaultChecked={field.value}
              error={errors.terms?.message}
              onChange={(e) => field.onChange(e.target.checked)}
              onBlur={field.onBlur}
              type="checkbox"
            />
          )}
          name={'terms'}
        />
        <p className="absolute text-amber-700 ml-4">
          I accept and agree to the <b>Terms</b> and <b>Conditions</b> *
        </p>
      </Field>
      <div className="flex gap-2.5 self-center">
        <button
          className={`px-2 py-1 border-2 border-solid rounded-2xl 
          ${isDirty && isValid ? 'border-amber-300 bg-amber-200 cursor-pointer hover:scale-105' : 'border-gray-500 bg-gray-200'} transition duration-200 ease-linear`}
          type="submit"
          disabled={!isDirty || !isValid}
        >
          Submit
        </button>
        {children}
      </div>
    </form>
  );
};

export default ReactHookForm;
