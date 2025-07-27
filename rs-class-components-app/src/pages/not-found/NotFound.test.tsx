import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NotFoundPage } from './NotFound.tsx';

describe('Not Found Page tests', () => {
  it('Should show page not found message', () => {
    render(<NotFoundPage />);

    expect(
      screen.getByText(
        "Oops! It looks like the page you requested wasn't found! Please use the header links to navigate to one of the existing pages."
      )
    ).toBeInTheDocument();
  });
});
