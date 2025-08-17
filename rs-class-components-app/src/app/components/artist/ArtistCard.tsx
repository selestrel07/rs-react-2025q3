'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import type { MouseEvent, ReactNode } from 'react';
import './ArtistCard.css';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { addArtistAction, removeArtistAction } from '../../store/artistSlice';

export default function ArtistCard({
  id,
  pageNumber,
  children,
}: {
  id: number;
  pageNumber: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedArtists = useAppSelector((state) => state.artists.value);
  const dispatch = useAppDispatch();
  const isSelected = selectedArtists.includes(id);

  const clickHandler = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const artistId = searchParams?.get('artist-id');
    if (!artistId || (artistId && +artistId !== id)) {
      router.push(`/main/?page=${pageNumber}&artist-id=${id}`);
    }
    if (isSelected) {
      dispatch(removeArtistAction(id));
    } else {
      dispatch(addArtistAction(id));
    }
  };

  return (
    <div className="card" onClick={clickHandler}>
      <input type="checkbox" checked={isSelected} readOnly={true} />
      {children}
    </div>
  );
}
