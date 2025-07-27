import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AboutPage } from './About.tsx';

describe('About Page tests', () => {
  it('Should render About Page Text', () => {
    render(<AboutPage />);

    expect(
      screen.getAllByText(
        (_, element) =>
          element !== null &&
          element.textContent !== null &&
          element.textContent.includes('Dzmitry')
      )[0]
    ).toBeInTheDocument();
  });

  it('Should contain link to RS School React course', () => {
    render(<AboutPage />);

    expect(
      screen.getByRole('link', { name: 'RS School React course' })
    ).toBeInTheDocument();
  });
});
