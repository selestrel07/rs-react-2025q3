import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary.tsx';
import type { FC } from 'react';

const errorMessage = 'Something went wrong!';
const ErrorComponent: FC = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary component tests', () => {
  const consoleMock = vi
    .spyOn(console, 'error')
    .mockImplementation(() => undefined);
  it('Should render fallback UI if an error occurred and log an error to console', async () => {
    render(
      <ErrorBoundary fallback={<p>{errorMessage}</p>}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(consoleMock).toHaveBeenCalled();
    expect(consoleMock.mock.calls[1][0]).toBe('Caught in error boundary: ');
  });
});
