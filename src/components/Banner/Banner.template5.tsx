import { BannerComponentProps } from './Banner.types';
import { BannerComponentContent } from './Banner.content';
import classNames from 'classnames';
import { useAnalytics } from 'lib/challenger/hooks';

const BannerTemplate5 = (props: BannerComponentProps) => {
  const { bgColorClass } = props?.rendering?.fields;
  const uniqueId = props?.rendering?.params?.RenderingIdentifier || props.rendering.uid || '';
  const { linkComponent } = useAnalytics(props.rendering);

  return (
    <div
      id={uniqueId}
      role="banner"
      link_component={linkComponent}
      className={classNames('relative w-full ', bgColorClass)}
    >
      <div className="relative flex flex-col">
        <div className="relative z-40 flex min-h-[160px] w-full ">
          <div className={classNames('relative top-[0.5px] z-30 flex w-full flex-row')}>
            <div
              className={classNames(
                'clip-path-polygon-[50%_0%,100%_50%,100%_100%,0_100%,0%_45%]',
                'sm:clip-path-polygon-[50%_0,100%_75%,100%_100%,0%_100%]',
                'bg-bright-navy',
                'absolute z-30 flex h-full w-full'
              )}
            ></div>
            <div
              className={classNames(
                'clip-path-polygon-[50%_0%,0_13%,0_23%]',
                'sm:clip-path-polygon-[50%_0%,0_45%,0_60%]',
                'from-deep-green via-deep-green to-challenger-green bg-gradient-250',
                'absolute z-40 flex h-full w-full'
              )}
            ></div>
            <div
              className={classNames(
                'clip-path-polygon-[50%_0,0_23%,0_46%]',
                'sm:clip-path-polygon-[50%_0,0_60%,0_100%]',
                'bg-deep-green',
                'absolute z-40 h-full w-full md:flex'
              )}
            ></div>
            <div
              className={classNames(
                'clip-path-polygon-[50%_0%,100%_28%,100%_51%]',
                'sm:clip-path-polygon-[50%_0%,100%_44%,100%_77%]',
                'from-deep-green to-challenger-green bg-gradient-170',
                'absolute z-40 h-full w-full'
              )}
            ></div>
          </div>
        </div>
        <div
          className={classNames(
            'relative z-40 w-full sm:left-0 sm:right-0 sm:top-0 sm:mx-auto',
            'bg-gradient-to-t from-bright-navy-light to-bright-navy',
            'h-auto',
            'w-full'
          )}
        >
          <div
            className={classNames(
              'z-40 -mt-12 px-6 pb-24 sm:-mt-8',
              'sm:left-0 sm:right-0 sm:mx-auto sm:max-w-[600px] lg:max-w-[850px]',
              'flex flex-col sm:items-center sm:justify-center sm:[&_p]:text-center',
              'sm:[&_h1]:line-clamp-3 sm:[&_h2]:line-clamp-3 sm:[&_h3]:line-clamp-3',
              'lg:[&_h1]:line-clamp-2 lg:[&_h2]:line-clamp-2 lg:[&_h3]:line-clamp-2',
              'sm:[&_p]:line-clamp-6 lg:[&_p]:line-clamp-4',
              '[&_h1]:text-center [&_h1]:font-roboto-700 [&_h1]:text-[2.5rem] [&_h1]:leading-[3rem]',
              '[&_h1]:text-center [&_h2]:text-[2.5rem] [&_h2]:leading-[3rem]',
              '[&_h1]:text-center [&_h3]:text-[2.5rem] [&_h3]:leading-[3rem]',
              '[&_h1]:text-center [&_h4]:text-[2.5rem] [&_h4]:leading-[3rem]'
            )}
          >
            <BannerComponentContent {...props} textColor="text-white" headingColor="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerTemplate5;
