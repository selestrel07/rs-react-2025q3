import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SearchComponent } from './SearchComponent';
import { userEvent } from '@testing-library/user-event';
import { getSearchString } from '../../services/local-storage.service.ts';
import { Provider } from 'react-redux';
import { store } from '../../store.ts';

const navigateToPageMock = vi.fn();

describe('Search component render tests', () => {
  it('Should render search input and search button', async () => {
    render(
      <Provider store={store}>
        <SearchComponent navigateToPage={navigateToPageMock} />
      </Provider>
    );

    expect(await screen.findByText('Search')).toBeInTheDocument();
    expect(
      await screen.findByPlaceholderText('Type artist information...')
    ).toBeInTheDocument();
  });

  it('Should call searchArtists with correct(trimmed) value and save query string in localstorage', async () => {
    const searchString = 'artist';
    render(
      <Provider store={store}>
        <SearchComponent navigateToPage={navigateToPageMock} />
      </Provider>
    );

    const input = await screen.findByPlaceholderText(
      'Type artist information...'
    );
    await userEvent.type(input, `  ${searchString}  `);

    const searchButton = await screen.findByText('Search');
    await userEvent.click(searchButton);

    expect(navigateToPageMock).toBeCalled();
    expect(getSearchString()).toBe(searchString);
  });
});
