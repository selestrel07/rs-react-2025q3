import { describe, expect, it, vi } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
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

const findElementByText = async (elementText: string) =>
  await screen.findByText(
    (_, element) => element !== null && element.textContent === elementText
  );

const navigateMock = vi.fn();
const renderElement = (child: ReactNode) =>
  render(<Provider store={store}>{child}</Provider>);

describe('ArtistCard render test', () => {
  it('Should render artist data', async () => {
    renderElement(
      <ArtistCard id={ArtistInfoFull.id} navigate={navigateMock} />
    );

    expect(
      await findElementByText(`Title: ${ArtistInfoFull.title}`)
    ).toBeInTheDocument();
    expect(
      await findElementByText(`Birth Date: ${ArtistInfoFull.birth_date}`)
    ).toBeInTheDocument();
    expect(
      await findElementByText(`Date of Death: ${ArtistInfoFull.death_date}`)
    ).toBeInTheDocument();
    expect(screen.getByTestId('artist-checkbox')).toBeInTheDocument();
  });

  it('Should render question mark if date is null', async () => {
    renderElement(
      <ArtistCard id={ArtistInfoEmptyDates.id} navigate={navigateMock} />
    );

    expect(
      await findElementByText(`Title: ${ArtistInfoFull.title}`)
    ).toBeInTheDocument();
    expect(await findElementByText(`Birth Date: ?`)).toBeInTheDocument();
    expect(await findElementByText(`Date of Death: ?`));
  });

  it('Should trigger navigate function on click', async () => {
    renderElement(
      <ArtistCard id={ArtistInfoEmptyDates.id} navigate={navigateMock} />
    );

    await userEvent.click((await screen.findAllByText('Title:'))[0]);

    expect(navigateMock).toBeCalled();
  });

  it('Should add/remove item to/from store on click', async () => {
    const selector = () => store.getState().artists.value;
    const getIds = (artists: ArtistInfo[]) =>
      artists.map((artist) => artist.id);
    renderElement(
      <ArtistCard id={ArtistInfoEmptyDates.id} navigate={navigateMock} />
    );

    const checkbox: HTMLInputElement =
      await screen.findByTestId('artist-checkbox');
    act(() => checkbox.click());

    expect(getIds(selector()).includes(ArtistInfoEmptyDates.id)).toBe(true);
    expect(checkbox.checked).toBe(true);

    await waitFor(() => checkbox.checked);
    act(() => checkbox.click());

    expect(getIds(selector()).includes(ArtistInfoEmptyDates.id)).toBe(false);
  });
});
