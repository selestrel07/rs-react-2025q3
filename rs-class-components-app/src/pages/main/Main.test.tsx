import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MainPage } from './Main.tsx';
import { artistsMockData } from '../../test-utils/test-data.ts';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../../store.ts';

const renderElement = () =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </Provider>
  );

describe('Main page tests', () => {
  it('Should show the loading status while the data is not received and elements list after the data is received from the API', async () => {
    renderElement();

    //Empty list message is shown before the data received from the API
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await expect(
      screen.findAllByText(
        (_, element) =>
          element !== null &&
          element.textContent !== null &&
          element.textContent === 'Title: '
      )
    ).resolves.toHaveLength(artistsMockData.length);
  });

  it('Should render with page number one by default', () => {
    renderElement();

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('Should reset page number after search button click', async () => {
    renderElement();

    //switch to the second page
    await userEvent.click(screen.getByRole('button', { name: '>' }));
    expect(screen.getByText('2')).toBeInTheDocument();

    //perform search
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
