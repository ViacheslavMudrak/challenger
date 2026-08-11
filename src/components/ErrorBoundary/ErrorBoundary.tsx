import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorBoundaryInfo from './ErrorBoundary.info';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });
  }

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;

    if (hasError) {
      return <ErrorBoundaryInfo error={error} errorInfo={errorInfo} />;
    }

    return this.props.children;
  }
}
