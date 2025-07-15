import { Component, type ErrorInfo, type ReactNode } from 'react';
import './ErrorBoundary.css';

type ErrorBoundaryProps = {
  fallback: ReactNode;
  children: ReactNode[] | ReactNode;
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
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { error: error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Caught in error boundary: ', error, info);
  }

  render(): ReactNode {
    return <>{this.state.error ? this.props.fallback : this.props.children}</>;
  }
}
