import { Component, type ReactNode } from 'react';
import type { ArtistInfo } from '../../types/artist-data.ts';

type ArtistCardProps = {
  artist: ArtistInfo;
};

export class ArtistCard extends Component<ArtistCardProps, object> {
  render(): ReactNode {
    return (
      <div className="card">
        <p>
          <b>Title: </b>
          {this.props.artist.title}
        </p>
        <p>
          <b>Birth Date: </b>
          {this.props.artist.birth_date ?? '?'}
        </p>
        <p>
          <b>Date of Death: </b>
          {this.props.artist.death_date ?? '?'}
        </p>
      </div>
    );
  }
}
