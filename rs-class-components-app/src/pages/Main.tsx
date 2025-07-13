import { Component, type ReactNode } from 'react';
import { SearchComponent } from '../features/search/SearchComponent.tsx';

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
    this.setState({
      items: [searchQuery],
    });
    this.setState({
      isLoading: false,
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
