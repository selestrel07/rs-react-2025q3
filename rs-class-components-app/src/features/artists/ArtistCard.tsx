import {
  type FC,
  type ReactNode,
  useState,
  type MouseEvent,
  useEffect,
} from 'react';
import './ArtistCard.css';
import type { ArtistCardProperties } from '../../types/component-properties.ts';
import { getArtists, store } from '../../store.ts';
import { addArtistAction, removeArtistAction } from './artistSlice.ts';

export const ArtistCard: FC<ArtistCardProperties> = (
  props: ArtistCardProperties
): ReactNode => {
  const appStore = store;
  const [isSelected, setSelected] = useState(
    getArtists()
      .map((artist) => artist.id)
      .includes(props.artist.id)
  );

  useEffect(() => {
    if (isSelected) {
      appStore.dispatch(addArtistAction(props.artist));
    } else {
      appStore.dispatch(removeArtistAction(props.artist));
    }
  }, [isSelected, props.artist, appStore]);

  const handleClick = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    props.navigate(props.artist.id);
    setSelected(!isSelected);
  };

  return (
    <div className="card" onClick={handleClick}>
      <input type="checkbox" checked={isSelected} />
      <p>
        <b>Title: </b>
        {props.artist.title}
      </p>
      <p>
        <b>Birth Date: </b>
        {props.artist.birth_date ?? '?'}
      </p>
      <p>
        <b>Date of Death: </b>
        {props.artist.death_date ?? '?'}
      </p>
    </div>
  );
};
