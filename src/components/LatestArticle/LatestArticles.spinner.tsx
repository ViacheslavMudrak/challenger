import { Presence } from '@sitecore-search/ui';

interface SpinnerProps {
  loading: boolean;
}

const Spinner = ({ loading = false }: SpinnerProps) => {
  return (
    <Presence present={loading}>
      <div className="absolute left-0 right-0 top-1/2 block h-full w-full items-center text-center">
        <div role="status">
          <svg
            aria-busy={loading}
            aria-hidden={!loading}
            focusable="false"
            role="progressbar"
            viewBox="0 0 20 20"
            className="inline w-10 animate-spin text-bright-navy"
          >
            <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </Presence>
  );
};

export default Spinner;
