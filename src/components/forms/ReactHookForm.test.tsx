import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store.ts';
import ReactHookForm from './ReactHookForm';
import { userEvent } from '@testing-library/user-event';

const mockSubmit = jest.fn();
const originalError = console.error;
beforeEach(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('A component is changing an uncontrolled input')
    ) {
      return;
    }
    originalError(...args);
  };
});

test('Should render all fields', () => {
  render(
    <Provider store={store}>
      <ReactHookForm onSubmit={mockSubmit}>Uncontrolled Form</ReactHookForm>
    </Provider>
  );

  expect(screen.getByText('Name *')).toBeInTheDocument();
  expect(screen.getByText('Age *')).toBeInTheDocument();
  expect(screen.getByText('Gender *')).toBeInTheDocument();
  expect(screen.getByText('Email *')).toBeInTheDocument();
  expect(screen.getByText('Country *')).toBeInTheDocument();
  expect(screen.getByText('Password *')).toBeInTheDocument();
  expect(screen.getByText('Repeat password *')).toBeInTheDocument();
  expect(screen.getByText('Upload your picture *')).toBeInTheDocument();
  expect(screen.getByText(/^I accept and agree to the/)).toBeInTheDocument();
});

test('Submit button should be disabled by default', () => {
  render(
    <Provider store={store}>
      <ReactHookForm onSubmit={mockSubmit}>Uncontrolled Form</ReactHookForm>
    </Provider>
  );

  const submitButton = screen.getByText('Submit');
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeDisabled();
});

test('Should show errors on fields change', async () => {
  render(
    <Provider store={store}>
      <ReactHookForm onSubmit={mockSubmit}>Uncontrolled Form</ReactHookForm>
    </Provider>
  );

  const nameInput = screen.getByRole('textbox', { name: 'Name *' });
  const ageInput = screen.getByRole('spinbutton', { name: 'Age *' });
  const emailInput = screen.getByRole('textbox', { name: 'Email *' });
  const countryInput = screen.getByRole('combobox', { name: 'Country *' });
  const passwordInput = screen.getByLabelText('Password *');
  const repeatPasswordInput = screen.getByLabelText('Repeat password *');
  const fileInput = screen.getByLabelText('Upload your picture *');
  await userEvent.type(nameInput, 'a');
  await userEvent.type(ageInput, '250');
  await userEvent.type(emailInput, 's');
  await userEvent.type(countryInput, 'password');
  await userEvent.type(passwordInput, '123');
  await userEvent.type(repeatPasswordInput, '4');
  const file = new File(['hello'], 'hello.pdf', { type: 'txt/pdf' });
  await userEvent.upload(fileInput, file);

  expect(
    await screen.findByText('Name length should be greater than 1')
  ).toBeInTheDocument();
  expect(
    await screen.findByText("You are not a vampire, aren't you?")
  ).toBeInTheDocument();
  expect(
    await screen.findByText('Not a valid email address')
  ).toBeInTheDocument();
  expect(
    await screen.findByText('Choose the country from the provided list')
  ).toBeInTheDocument();
  expect(
    await screen.findByText('Password must be at least 8 characters')
  ).toBeInTheDocument();
  expect(
    await screen.findByText('Passwords are not equal')
  ).toBeInTheDocument();
  expect(
    await screen.findByText('Unsupported file format')
  ).toBeInTheDocument();
});

test('Should call onSubmit', async () => {
  render(
    <Provider store={store}>
      <ReactHookForm onSubmit={mockSubmit}>Uncontrolled Form</ReactHookForm>
    </Provider>
  );

  const nameInput = screen.getByRole('textbox', { name: 'Name *' });
  const ageInput = screen.getByRole('spinbutton', { name: 'Age *' });
  const emailInput = screen.getByRole('textbox', { name: 'Email *' });
  const countryInput = screen.getByRole('combobox', { name: 'Country *' });
  const passwordInput = screen.getByLabelText('Password *');
  const repeatPasswordInput = screen.getByLabelText('Repeat password *');
  const fileInput = screen.getByLabelText('Upload your picture *');
  const termsAndConditionsCheckbox = screen.getByRole('checkbox', { name: '' });
  const submitButton = screen.getByRole('button', { name: 'Submit' });
  await userEvent.type(nameInput, 'Andy');
  await userEvent.type(ageInput, '15');
  await userEvent.type(emailInput, 'test@test.test');
  await userEvent.type(countryInput, 'Belarus');
  await userEvent.type(passwordInput, '123Qwe123#');
  await userEvent.type(repeatPasswordInput, '123Qwe123#');
  const file = new File(['hello'], 'hello.png', { type: 'image/png' });
  await userEvent.upload(fileInput, file);
  await userEvent.click(termsAndConditionsCheckbox);

  expect(submitButton).toBeEnabled();

  await userEvent.click(submitButton);
  expect(mockSubmit).toHaveBeenCalled();
});
