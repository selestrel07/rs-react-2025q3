import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SearchComponent } from './SearchComponent';
import { userEvent } from '@testing-library/user-event';
import { getSearchString } from '../../services/local-storage.service.ts';

const searchArtistsMockFunction = vi.fn();

describe('Search component render tests', () => {
  it('Should render search input and search button', async () => {
    render(<SearchComponent searchArtists={searchArtistsMockFunction} />);

    expect(await screen.findByText('Search')).toBeInTheDocument();
    expect(
      await screen.findByPlaceholderText('Type artist information...')
    ).toBeInTheDocument();
  });

  it('Should call searchArtists with correct(trimmed) value and save query string in localstorage', async () => {
    const searchString = 'artist';
    render(<SearchComponent searchArtists={searchArtistsMockFunction} />);

    const input = await screen.findByPlaceholderText(
      'Type artist information...'
    );
    await userEvent.type(input, `  ${searchString}  `);

    const searchButton = await screen.findByText('Search');
    await userEvent.click(searchButton);

    expect(searchArtistsMockFunction).toBeCalledWith(searchString);
    expect(getSearchString()).toBe(searchString);
  });
});
