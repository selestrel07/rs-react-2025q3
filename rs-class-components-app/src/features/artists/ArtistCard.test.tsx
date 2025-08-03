import { describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { ArtistCard } from './ArtistCard.tsx';
import {
  ArtistInfoEmptyDates,
  ArtistInfoFull,
} from '../../test-utils/test-data.ts';
import { userEvent } from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../store.ts';
import type { ReactNode } from 'react';
import type { ArtistInfo } from '../../types/artist-data.ts';

const getElementByText = (elementText: string) =>
  screen.getByText(
    (_, element) => element !== null && element.textContent === elementText
  );

const navigateMock = vi.fn();
const renderElement = (child: ReactNode) =>
  render(<Provider store={store}>{child}</Provider>);

describe('ArtistCard render test', () => {
  it('Should render artist data', async () => {
    renderElement(
      <ArtistCard artist={ArtistInfoFull} navigate={navigateMock} />
    );

    expect(
      getElementByText(`Title: ${ArtistInfoFull.title}`)
    ).toBeInTheDocument();
    expect(
      getElementByText(`Birth Date: ${ArtistInfoFull.birth_date}`)
    ).toBeInTheDocument();
    expect(
      getElementByText(`Date of Death: ${ArtistInfoFull.death_date}`)
    ).toBeInTheDocument();
    expect(screen.getByTestId('artist-checkbox')).toBeInTheDocument();
  });

  it('Should render question mark if date is null', async () => {
    renderElement(
      <ArtistCard artist={ArtistInfoEmptyDates} navigate={navigateMock} />
    );

    expect(
      getElementByText(`Title: ${ArtistInfoFull.title}`)
    ).toBeInTheDocument();
    expect(getElementByText(`Birth Date: ?`)).toBeInTheDocument();
    expect(getElementByText(`Date of Death: ?`));
  });

  it('Should trigger navigate function on click', async () => {
    renderElement(
      <ArtistCard artist={ArtistInfoEmptyDates} navigate={navigateMock} />
    );

    await userEvent.click((await screen.findAllByText('Title:'))[0]);

    expect(navigateMock).toBeCalled();
  });

  it('Should add/remove item to/from store on click', async () => {
    const selector = () => store.getState().artists.value;
    const getIds = (artists: ArtistInfo[]) =>
      artists.map((artist) => artist.id);
    renderElement(
      <ArtistCard artist={ArtistInfoEmptyDates} navigate={navigateMock} />
    );

    const checkbox = screen.getByTestId('artist-checkbox');
    act(() => checkbox.click());

    expect(getIds(selector()).includes(ArtistInfoEmptyDates.id)).toBe(true);

    act(() => checkbox.click());

    expect(getIds(selector()).includes(ArtistInfoEmptyDates.id)).toBe(false);
  });
});
