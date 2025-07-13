import { Component, type ReactNode } from 'react';
import { SearchComponent } from '../features/search/SearchComponent.tsx';
import { loadArtistData, searchArtists } from '../services/api.service.ts';
import type { SearchItem, SearchResult } from '../types/search-item.ts';
import type { ArtistData } from '../types/artist-data.ts';

export class MainPage extends Component {
  state: {
    items: string[];
    isError: boolean;
    isLoading: boolean;
  } = {
    items: [],
    isError: false,
    isLoading: false,
  };

  searchArtists = (searchQuery: string) => {
    this.setState({
      isLoading: true,
    });
    searchArtists(searchQuery)
      .then((result: SearchResult) =>
        result.data.map((item: SearchItem) => loadArtistData(item.api_link))
      )
      .then((data) => {
        return Promise.all(data);
      })
      .then((artists: ArtistData[]) => {
        const artistsData = artists.map(
          (artistData: ArtistData) => artistData.data
        );
        console.debug(artistsData);
        return this.setState({
          items: artistsData,
        });
      })
      .then(() => {
        console.log(this.state.items);
        this.setState({
          isLoading: false,
        });
      });
  };

  render(): ReactNode {
    return (
      <>
        <SearchComponent
          searchArtists={this.searchArtists}
          isLoading={this.state.isLoading}
        />
      </>
    );
  }
}
