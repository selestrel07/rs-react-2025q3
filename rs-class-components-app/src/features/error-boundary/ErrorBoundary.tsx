import { Component, type ReactNode } from 'react';

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

  render(): ReactNode {
    return (
      <div className="data-container">
        {this.state.error ? this.props.fallback : this.props.children}
      </div>
    );
  }
}
