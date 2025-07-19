import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MainPage } from './Main.tsx';
import { artistsMockData } from '../test-utils/test-data.ts';
import { userEvent } from '@testing-library/user-event';
import { ErrorBoundary } from '../features/error-boundary/ErrorBoundary.tsx';

describe('Main page tests', () => {
  it("Should render the 'Simulate Error' button", () => {
    render(<MainPage />);

    expect(screen.getByText('Simulate Error')).toBeInTheDocument();
  });

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

  it('Should throw an error after the "Simulate Error" button click', async () => {
    const consoleMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    render(
      <ErrorBoundary fallback={<p>ErrorMessage</p>}>
        <MainPage />
      </ErrorBoundary>
    );

    const simulateErrorButton = await screen.findByText('Simulate Error');
    await userEvent.click(simulateErrorButton);

    expect(screen.getByText('ErrorMessage')).toBeInTheDocument();
    expect(consoleMock).toHaveBeenCalled();
    expect(new Error(consoleMock.mock.calls[0][1]).message).toBe(
      'Error: Something went wrong! Manually generated error!'
    );
  });
});
