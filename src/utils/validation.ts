import { mixed, number, string, ValidationError } from 'yup';

export const nameSchema = string()
  .required('Name is required')
  .min(2, 'Name length should be greater than 1')
  .test({
    name: 'is-correct-name',
    skipAbsent: true,
    test(value, ctx) {
      if (value !== value.trim()) {
        return ctx.createError({
          message: 'Name should not contain spaces at the start and at the end',
        });
      }
      if (!value.startsWith(value.charAt(0).toUpperCase())) {
        return ctx.createError({
          message: 'Name should contain uppercase letter at the start',
        });
      }
      if (!value.match(/^[a-zA-Z-\s]+$/i)) {
        return ctx.createError({
          message: 'Name should contain only letters, spaces and hyphens',
        });
      }
      if (value.match(/^-[a-zA-Z-\s]+$/i) || value.match(/^[a-zA-Z-\s]+-$/i)) {
        return ctx.createError({
          message:
            'Name should not contain hyphens at the start and at the end',
        });
      }
      return true;
    },
  });

export const ageSchema = number()
  .transform((value, originalValue) =>
    String(originalValue).trim() === '' ? null : value
  )
  .nullable()
  .required('Age is required')
  .min(0, 'Age cannot be negative')
  .max(120, "You are not a vampire, aren't you?");

export const emailSchema = string()
  .required('Email is required')
  .email('Not a valid email address');

export const passwordSchema = string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .test({
    name: 'is-valid-password',
    skipAbsent: true,
    test(value, ctx) {
      if (!value.match(/^.*[A-Z].*$/)) {
        return ctx.createError({
          message: 'Password should contain uppercase letters',
        });
      }
      if (!value.match(/^.*[a-z].*$/)) {
        return ctx.createError({
          message: 'Password should contain lowercase letters',
        });
      }
      if (!value.match(/^.*[0-9].*$/)) {
        return ctx.createError({
          message: 'Password should contain numbers',
        });
      }
      if (!value.match(/^.*[$_\-+*~@\s!#%^&].*$/)) {
        return ctx.createError({
          message: 'Password should special characters',
        });
      }
      return true;
    },
  });

const FILE_SIZE = 1024 * 1024 * 3;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

export const pictureSchema = mixed<File>()
  .test('fileName', 'Picture is required', (file) => {
    return file && file instanceof File ? file.name.length > 0 : false;
  })
  .test('fileSize', 'File too large', (file) => {
    return file ? file.size < FILE_SIZE : false;
  })
  .test('fileFormat', 'Unsupported file format', (file) => {
    return file ? SUPPORTED_FORMATS.includes(file.type) : false;
  });

export const termsAndConditionsSchema = string()
  .required('You should accept terms and conditions')
  .oneOf(['on'],'You should accept terms and conditions');

export const validateName = async (name: string) => {
  const error = await nameSchema
    .validate(name)
    .catch((err: ValidationError) => err.message);
  return error === name ? '' : error;
};

export const validateAge = async (age: string) => {
  const error = await ageSchema
    .validate(age)
    .catch((err: ValidationError) => err.message);
  return error == age ? '' : error.toString();
};

export const validateEmail = async (email: string) => {
  const error = await emailSchema
    .validate(email)
    .catch((err: ValidationError) => err.message);
  return error == email ? '' : error;
};

export const validateCountry = async (country: string, countries: string[]) => {
  const error = await string()
    .oneOf(countries, 'Choose the country from the provided list')
    .validate(country)
    .catch((err: ValidationError) => err.message);
  return !error || error === country ? '' : error;
};

export const validatePassword = async (password: string) => {
  const error = await passwordSchema
    .validate(password)
    .catch((err: ValidationError) => err.message);
  return error == password ? '' : error;
};

export const validatePasswordRepeat = async (
  password: string,
  passwordRepeat: string
) => {
  const error = await string()
    .oneOf([password], 'Passwords are not equal')
    .validate(passwordRepeat)
    .catch((err: ValidationError) => err.message);
  return !error || error == passwordRepeat ? '' : error;
};

export const validatePicture = async (picture: File) => {
  const error = await pictureSchema
    .validate(picture)
    .catch((err: ValidationError) => err.message);
  return !error || error instanceof File ? '' : error;
};

export const validateTermsAndConditions = async (terms: string) => {
  const error = await termsAndConditionsSchema.validate(terms).catch((err: ValidationError) => err.message);
  return error === terms ? '' : error;
}