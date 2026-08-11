import { ErrorInfo } from 'react';

interface ErrorBoundaryInfoProps {
  error?: Error;
  errorInfo?: ErrorInfo;
}

const ErrorBoundaryInfo = (props: ErrorBoundaryInfoProps) => {
  const { error, errorInfo } = props;

  console.error('error', error);
  console.error('error info', errorInfo);

  return (
    <div className="flex w-full flex-col gap-5 p-5 font-roboto-400">
      <h1 className="font-roboto-700 text-3xl">
        There was an error loading the application. Please refresh the page to try again
      </h1>
      <div className="flex w-full flex-col gap-2">
        <span className="text-bright-navy">An error has occurred</span>
        <span className="text-bright-navy">Please refresh the page or try again later</span>
      </div>
    </div>
  );
};

export default ErrorBoundaryInfo;
