import { type ChangeEvent, Component, type ReactNode } from 'react';
import { setSearchString } from '../../services/local-storage.service.ts';

type SearchProps = {
  searchArtists: (searchString: string) => void;
  isLoading: boolean;
};

type SearchState = {
  query: string;
};

export class SearchComponent extends Component<SearchProps, SearchState> {
  state: SearchState = {
    query: '',
  };

  handleQueryUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: event.target.value.toString().trim(),
    });
  };

  clearQuery = () => {
    this.setState({
      query: '',
    });
  };

  handleSearch = () => {
    this.props.searchArtists(this.state.query);
    setSearchString(this.state.query);
    this.clearQuery();
  };

  render(): ReactNode {
    return (
      <div className="search-wrapper">
        <input
          type="search"
          value={this.state.query}
          onChange={this.handleQueryUpdate}
          disabled={this.props.isLoading}
        />
        <button onClick={this.handleSearch} disabled={this.props.isLoading}>
          Search
        </button>
      </div>
    );
  }
}
