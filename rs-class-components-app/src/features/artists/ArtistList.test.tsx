import { afterEach, describe, expect, it } from 'vitest';
import { setSearchQuery } from '../search/searchQuerySlice.ts';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store.ts';
import { ArtistList } from './ArtistList.tsx';
import { BrowserRouter } from 'react-router';

describe('ArtistList component tests', () => {
  afterEach(() => {
    store.dispatch(setSearchQuery(''));
  });

  it('Should render not found message in case of 404 error returned by the API', async () => {
    await act(() => store.dispatch(setSearchQuery('error')));
    render(
      <Provider store={store}>
        <ArtistList />
      </Provider>,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(
      await screen.findByText('No data was found by provided parameters')
    ).toBeInTheDocument();
  });

  it('Should render server error message if there is server error returned by the API', async () => {
    await act(() => store.dispatch(setSearchQuery('server-error')));
    render(
      <Provider store={store}>
        <ArtistList />
      </Provider>,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(
      await screen.findByText(
        'Internal server error. Please try to use app later.'
      )
    ).toBeInTheDocument();
  });

  it('Should render unknown error data if there is an unknown error returned by the API', async () => {
    await act(() => store.dispatch(setSearchQuery('unknown-error')));
    render(
      <Provider store={store}>
        <ArtistList />
      </Provider>,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(
      await screen.findByText('{"message":"unknown-error"}')
    ).toBeInTheDocument();
  });

  it('Should render proper message in case of empty data returned by the API', async () => {
    await act(() => store.dispatch(setSearchQuery('empty')));
    render(
      <Provider store={store}>
        <ArtistList />
      </Provider>,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(
      await screen.findByText('No results were found for the provided query.')
    ).toBeInTheDocument();
  });
});
