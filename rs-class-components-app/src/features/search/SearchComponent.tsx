import { type ChangeEvent, Component, type ReactNode } from 'react';
import {
  getSearchString,
  setSearchString,
} from '../../services/local-storage.service.ts';
import './SearchComponent.css';

type SearchProps = {
  searchArtists: (searchString: string) => void;
  isLoading: boolean;
};

type SearchState = {
  query: string;
};

export class SearchComponent extends Component<SearchProps, SearchState> {
  state: SearchState = {
    query: getSearchString(),
  };

  handleQueryUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: event.target.value.toString(),
    });
  };

  handleSearch = () => {
    const trimmedString = this.state.query.trim();
    this.setState({
      query: trimmedString,
    });
    this.props.searchArtists(trimmedString);
    setSearchString(trimmedString);
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
