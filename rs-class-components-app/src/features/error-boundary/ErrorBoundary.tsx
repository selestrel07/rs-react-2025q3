import { Component, type ReactNode } from 'react';
import './ErrorBoundary.css';

type ErrorBoundaryProps = {
  fallback: ReactNode;
  children: ReactNode[];
  hasError: Error | undefined;
};

type ErrorBoundaryState = {
  error: Error | undefined;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: this.props.hasError };
    if (this.props.hasError) {
      console.error(this.props.hasError.message);
    }
  }

  static getDeStateFromError(error: Error) {
    console.error(error.message);
    return { error: error };
  }

  componentDidUpdate(prevProps: Readonly<ErrorBoundaryProps>) {
    if (this.props.hasError && this.props.hasError !== prevProps.hasError) {
      this.setState({ error: this.props.hasError });
      console.error(this.props.hasError.message);
    }
  }

  render(): ReactNode {
    return (
      <div className="data-container">
        {this.state.error ? this.props.fallback : this.props.children}
      </div>
    );
  }
}
