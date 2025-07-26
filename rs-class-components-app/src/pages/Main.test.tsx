import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MainPage } from './Main.tsx';
import { artistsMockData } from '../test-utils/test-data.ts';

describe('Main page tests', () => {
  it('Should show the empty list message while the data is not received and elements list after the data is received from the API', async () => {
    render(<MainPage />);

    //Empty list message is shown before the data received from the API
    expect(
      screen.getByText('No results were found for the provided query.')
    ).toBeInTheDocument();

    //Wait for the data is received from the API and Search button is enabled
    await waitFor(() => expect(screen.getByText('Search')).toBeEnabled());

    expect(
      screen.getAllByText(
        (_, element) =>
          element !== null &&
          element.textContent !== null &&
          element.textContent === 'Title: '
      ).length
    ).toBe(artistsMockData.length);
  });
});
