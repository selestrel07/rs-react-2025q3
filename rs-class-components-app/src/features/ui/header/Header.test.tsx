import { describe, expect, it } from 'vitest';
import { Header } from './Header.tsx';
import { act, render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router';
import { ABOUT } from '../../../data/path-constants.ts';
import { ThemeContextProvider } from '../../../context/ThemeContext.tsx';

describe('Header component tests', () => {
  it('Should contain links to the Main and About pages', () => {
    render(
      <BrowserRouter>
        <ThemeContextProvider>
          <Header />
        </ThemeContextProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole('link', { name: 'Main' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  });

  it('Should contain theme change button', () => {
    render(
      <BrowserRouter>
        <ThemeContextProvider>
          <Header />
        </ThemeContextProvider>
      </BrowserRouter>
    );

    expect(
      screen.getByRole('button', { name: 'Change theme to dark' })
    ).toBeInTheDocument();
  });

  it('Should change the app theme on the change theme button click', () => {
    render(
      <MemoryRouter initialEntries={[ABOUT]}>
        <ThemeContextProvider>
          <Header />
        </ThemeContextProvider>
      </MemoryRouter>
    );

    const changeThemeButton = screen.getByRole('button', {
      name: 'Change theme to dark',
    });

    act(() => changeThemeButton.click());

    expect(screen.getByRole('link', { name: 'Main' })).toHaveStyle(
      'color: #4be42e'
    );
    expect(screen.getByRole('link', { name: 'About' })).toHaveStyle(
      'color: #f8e8e9'
    );

    act(() => changeThemeButton.click());

    expect(screen.getByRole('link', { name: 'Main' })).toHaveStyle(
      'color: #3b6c28'
    );
    expect(screen.getByRole('link', { name: 'About' })).toHaveStyle(
      'color: #ca2b50'
    );
  });
});
