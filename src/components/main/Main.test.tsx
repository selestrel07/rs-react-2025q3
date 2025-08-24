import { fireEvent, render, screen } from '@testing-library/react';
import Main from './Main';
import { Provider } from 'react-redux';
import { store } from '../../store/store.ts';

test('Should render buttons', () => {
  render(<Main />);

  expect(screen.getByText('Open Uncontrolled Form')).toBeInTheDocument();
  expect(screen.getByText('Open React Hook Form')).toBeInTheDocument();
});

test('Should open uncontrolled form', async () => {
  render(<Provider store={store}><Main /></Provider>);

  const openForm = screen.getByText('Open Uncontrolled Form');
  fireEvent.click(openForm);
  expect(await screen.findByText('Close')).toBeInTheDocument();
});

test('Should open react hook form', async () => {
  render(<Provider store={store}><Main /></Provider>);

  const openForm = screen.getByText('Open React Hook Form');
  fireEvent.click(openForm);
  expect(await screen.findByText('Close')).toBeInTheDocument();
});

test('Should close uncontrolled form after the close button click', async () => {
  render(<Provider store={store}><Main /></Provider>);

  const openFormButton = screen.getByText('Open Uncontrolled Form');
  fireEvent.click(openFormButton);
  const closeButton = await screen.findByText('Close');
  fireEvent.click(closeButton);
  expect(openFormButton).toBeInTheDocument();
});

test('Should close react hook form after the close button click', async () => {
  render(<Provider store={store}><Main /></Provider>);

  const openFormButton = screen.getByText('Open React Hook Form');
  fireEvent.click(openFormButton);
  const closeButton = await screen.findByText('Close');
  fireEvent.click(closeButton);
  expect(openFormButton).toBeInTheDocument();
});
