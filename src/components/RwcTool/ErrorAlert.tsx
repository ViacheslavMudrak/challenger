type ErrorAlertProps = {
  title?: string;
  message?: string;
  details?: string | null;
  className?: string;
};

const ErrorAlert = ({
  title = "We couldn't load your results right now",
  message = 'This is usually temporary. Please try again in a moment.',
  details,
  className = '',
}: ErrorAlertProps) => {
  return (
    <div
      role="alert"
      className={`border-red-200 from-red-50 via-rose-50 rounded-2xl border bg-gradient-to-br to-white p-6 shadow-sm sm:p-7 ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="text-red-500 ring-red-100 mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3l-8.47-14.14a2 2 0 0 0-3.42 0Z"
            />
          </svg>
        </div>
        <div>
          <h2 className="font-roboto mb-1 text-xl font-bold text-bright-navy sm:text-2xl">
            {title}
          </h2>
          <p className="font-roboto text-sm text-black/80 sm:text-base">{message}</p>
          {details && (
            <p className="font-roboto mt-2 text-xs text-black/60 sm:text-sm">
              Technical details: {details}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;
