import { describe, expect, it } from 'vitest';
import { Header } from './Header.tsx';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router';
import { ABOUT } from '../../../data/path-constants.ts';

describe('Header component tests', () => {
  it('Should contain links to the Main and About pages', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByRole('link', { name: 'Main' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  });

  it('Test active and inactive link colors', () => {
    render(
      <MemoryRouter initialEntries={[ABOUT]}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'Main' })).toHaveStyle(
      'color: #3b6c28'
    );
    expect(screen.getByRole('link', { name: 'About' })).toHaveStyle(
      'color: #ca2b50'
    );
  });
});
