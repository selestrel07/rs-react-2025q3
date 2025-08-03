import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App.tsx';

describe('Router tests', () => {
  it('Should render correctly', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: 'Main' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });
});
