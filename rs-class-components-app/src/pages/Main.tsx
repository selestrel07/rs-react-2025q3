import { Component, type ReactNode } from 'react';
import { SearchComponent } from '../features/search/SearchComponent.tsx';
import { loadArtistData, searchArtists } from '../services/api.service.ts';
import type { SearchItem, SearchResult } from '../types/search-item.ts';
import type { ArtistData, ArtistInfo } from '../types/artist-data.ts';
import { ArtistCard } from '../features/artists/ArtistCard.tsx';
import { getSearchString } from '../services/local-storage.service.ts';
import { ErrorBoundary } from '../features/error-boundary/ErrorBoundary.tsx';

export class MainPage extends Component {
  state: {
    items: ArtistInfo[];
    error?: Error;
    isLoading: boolean;
  } = {
    items: [],
    error: undefined,
    isLoading: false,
  };

  componentDidMount(): void {
    this.searchArtists(getSearchString());
  }

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
        return this.setState({
          items: artistsData,
        });
      })
      .catch((err: Error) => this.setState({ error: err }))
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  simulateError = (): void => {
    this.setState({
      error: new Error('Something went wrong! Manually generated error!'),
    });
  };

  render(): ReactNode {
    return (
      <>
        <SearchComponent
          searchArtists={this.searchArtists}
          isLoading={this.state.isLoading}
        />
        <ErrorBoundary
          fallback={
            <p>
              Something went wrong. Please check the console to see the error
              message.
            </p>
          }
          hasError={this.state.error}
        >
          {this.state.items.map((item) => (
            <ArtistCard key={item.id} artist={item} />
          ))}
        </ErrorBoundary>
        <button className="error-button" onClick={this.simulateError}>
          Simulate Error
        </button>
      </>
    );
  }
}
