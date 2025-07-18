import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ArtistCard } from './ArtistCard.tsx';
import {
  ArtistInfoEmptyDates,
  ArtistInfoFull,
} from '../../test-utils/test-data.ts';
const getElementByText = (elementText: string) =>
  screen.getByText(
    (_, element) => element !== null && element.textContent === elementText
  );

describe('ArtistCard render test', () => {
  it('Should render artist data', async () => {
    render(<ArtistCard artist={ArtistInfoFull} />);

    expect(
      getElementByText(`Title: ${ArtistInfoFull.title}`)
    ).toBeInTheDocument();
    expect(
      getElementByText(`Birth Date: ${ArtistInfoFull.birth_date}`)
    ).toBeInTheDocument();
    expect(getElementByText(`Date of Death: ${ArtistInfoFull.death_date}`));
  });

  it('Should render question mark if date is null', async () => {
    render(<ArtistCard artist={ArtistInfoEmptyDates} />);

    expect(
      getElementByText(`Title: ${ArtistInfoFull.title}`)
    ).toBeInTheDocument();
    expect(getElementByText(`Birth Date: ?`)).toBeInTheDocument();
    expect(getElementByText(`Date of Death: ?`));
  });
});
