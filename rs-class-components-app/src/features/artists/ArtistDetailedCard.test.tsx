import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ArtistDetailedCard } from './ArtistDetailedCard.tsx';
import { BrowserRouter } from 'react-router';
import { artistsMockData } from '../../test-utils/test-data.ts';
import { Provider } from 'react-redux';
import { store } from '../../store.ts';

describe('Artist detailed card tests', () => {
  it('Should render not found message in case of wrong id provided', async () => {
    render(
      <Provider store={store}>
        <ArtistDetailedCard id={'-1'} />
      </Provider>,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(
      await screen.findByText('No data was found by provided parameters')
    ).toBeInTheDocument();
  });

  it('Should render information in case of correct id provided', async () => {
    const data = artistsMockData.map((artist) => artist.data)[0];
    render(
      <Provider store={store}>
        <ArtistDetailedCard id={data.id.toString()} />
      </Provider>,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    expect(await screen.findByText('Title:')).toBeInTheDocument();
    expect(await screen.findByText(data.title)).toBeInTheDocument();
    expect(await screen.findByText('Alternative titles:')).toBeInTheDocument();
    if (data.alt_titles) {
      expect(
        await screen.findByText(data.alt_titles.join(', '))
      ).toBeInTheDocument();
    }
    expect(await screen.findByText('Birth Date:')).toBeInTheDocument();
    expect(
      await screen.findByText(data.birth_date ?? 'Unknown')
    ).toBeInTheDocument();
    expect(await screen.findByText('Date of Death:')).toBeInTheDocument();
    expect(
      await screen.findByText(data.death_date ?? 'Unknown')
    ).toBeInTheDocument();
  });

  it('Should show alternative titles default text if no alternative titles were provided', async () => {
    const data = artistsMockData.map((artist) => artist.data)[1];
    render(
      <Provider store={store}>
        <ArtistDetailedCard id={data.id.toString()} />
      </Provider>,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(
      await screen.findByText('No Alternative titles')
    ).toBeInTheDocument();
  });

  it('Should show date default text if no date was provided', async () => {
    const data = artistsMockData.map((artist) => artist.data)[2];
    render(
      <Provider store={store}>
        <ArtistDetailedCard id={data.id.toString()} />
      </Provider>,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(await screen.findAllByText('Unknown')).toHaveLength(2);
  });
});
