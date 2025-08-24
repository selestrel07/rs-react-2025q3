import { render, screen } from '@testing-library/react';
import UncontrolledForm from './UncontrolledForm';
import { Provider } from 'react-redux';
import { store } from '../../store/store.ts';

const mockSubmit = jest.fn();

test('Should render all fields', () => {
  render(
    <Provider store={store}>
      <UncontrolledForm onSubmit={mockSubmit}>
        Uncontrolled Form
      </UncontrolledForm>
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
