import { describe, expect, it } from 'vitest';
import { SelectionControls } from './SelectionControls';
import { Provider } from 'react-redux';
import { store } from '../../store.ts';
import { screen, render, act } from '@testing-library/react';
import { addArtistAction } from './artistSlice.ts';
import {
  ArtistInfoEmptyDates,
  ArtistInfoFull,
} from '../../test-utils/test-data.ts';

describe('Selection Controls component tests', () => {
  it('Should render buttons', () => {
    render(
      <Provider store={store}>
        <SelectionControls />
      </Provider>
    );

    expect(
      screen.getByRole('button', { name: 'Unselect all' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Download' })
    ).toBeInTheDocument();
  });

  it('Should render correct selected items info', async () => {
    store.dispatch(addArtistAction(ArtistInfoFull));
    render(
      <Provider store={store}>
        <SelectionControls />
      </Provider>
    );

    expect(screen.getByText('1 item is selected')).toBeInTheDocument();
    //add second item to selected
    await act(() => store.dispatch(addArtistAction(ArtistInfoEmptyDates)));
    expect(screen.getByText('2 items are selected')).toBeInTheDocument();
  });

  it('Should unselectAll items', async () => {
    store.dispatch(addArtistAction(ArtistInfoFull));
    render(
      <Provider store={store}>
        <SelectionControls />
      </Provider>
    );

    await act(() => {
      const unselectAllItems = screen.getByRole('button', {
        name: 'Unselect all',
      });
      unselectAllItems.click();
    });

    expect(store.getState().artists.value.length).toBe(0);
  });
});
