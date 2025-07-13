import { Component } from 'react';

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

  render() {
    return (
      <>
        <h1>Hello</h1>
      </>
    );
  }
}
