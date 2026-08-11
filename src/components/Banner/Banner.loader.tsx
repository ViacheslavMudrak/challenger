import classNames from 'classnames';

export interface BannerLoaderProps {
  size?: 'xl' | 'lg' | 'md';
}

const BannerLoader = (props: BannerLoaderProps) => {
  const { size = 'lg' } = props;
  return (
    <div role="status" className="w-full animate-pulse">
      <div
        className={classNames('flex w-full flex-col-reverse bg-grey sm:flex-row', {
          'sm:h-[650px]': size === 'xl',
          'sm:h-[500px]': size === 'lg',
          'sm:h-[350px]': size === 'md',
        })}
      >
        <div className="mb-14 mt-10 flex w-full flex-col items-center justify-center px-8 sm:w-6/12 lg:px-20">
          <div aria-label="heading" className="mb-8 h-12 w-full rounded-md bg-grey-darker"></div>
          <div aria-label="content" className="flex w-full flex-col gap-4">
            <div className="h-5 w-[90%] rounded-md bg-grey-darker"></div>
            <div className="h-5 w-[60%] rounded-md bg-grey-darker"></div>
            <div className="h-5 w-[70%] rounded-md bg-grey-darker"></div>
            <div className="h-5 w-[80%] rounded-md bg-grey-darker"></div>
            {(size === 'xl' || size === 'lg') && (
              <div className="h-5 w-[60%] rounded-md bg-grey-darker"></div>
            )}
          </div>
        </div>
        <div
          className={classNames(
            'bg-grey-light',
            '-top-1 sm:top-0',
            'relative flex h-[300px] w-full items-center justify-center sm:h-full sm:w-6/12'
          )}
        >
          <div
            className={classNames(
              'clip-path-polygon-[100%_82%,0%_100%,100%_100%]',
              'sm:clip-path-polygon-[0_0,0_100%,11%_0]',
              'absolute z-50 h-full w-full',
              'bg-grey'
            )}
          ></div>
          <div
            className={classNames(
              'clip-path-polygon-[8%_0,0_100%,0_0]',
              'sm:clip-path-polygon-[11%_0,0%_100%,14%_0]',
              'bg-grey-darker sm:bg-grey-dark',
              'absolute z-30 h-full w-full'
            )}
          ></div>
          <div
            className={classNames(
              'clip-path-polygon-[100%_73%,0%_100%,100%_82%]',
              'sm:clip-path-polygon-[14%_0,0%_100%,20%_0]',
              'bg-grey-darker',
              'absolute z-30 h-full w-full'
            )}
          ></div>
          <svg
            className="h-10 w-10 text-grey-darker sm:h-16 sm:w-16"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default BannerLoader;
