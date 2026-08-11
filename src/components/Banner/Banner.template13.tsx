/* eslint-disable prettier/prettier */
import { BannerBgColor, BannerComponentProps } from './Banner.types';
import { BannerComponentContent } from './Banner.content';
import classNames from 'classnames';
import { useAnalytics } from 'lib/challenger/hooks';

interface CustomBannerProps extends BannerComponentProps {
  showShards?: boolean;
}
const BannerTemplate13 = (props: CustomBannerProps) => {
  const { bgColorClass } = props?.rendering?.fields;
  const { showShards = true } = props;
  const bannerBgColor = bgColorClass || BannerBgColor.None;
  const uniqueId = props?.rendering?.params?.RenderingIdentifier || props.rendering.uid || '';
  const { linkComponent } = useAnalytics(props.rendering);

  return (
    <div
      id={uniqueId}
      role="banner"
      link_component={linkComponent}
      className={classNames('relative flex w-full flex-col', bannerBgColor.toString())}
    >
      <div
        className={classNames(
          'relative z-40',
          'pixel-rounding-error-fix',
          'min-h-[255px] w-full',
          'bg-challenger-green',
          'flex',
          'justify-center'
        )}
      >
        <div
          className={classNames(
            'mt-20 px-8 md:max-w-[800px] md:px-0 xl:mt-24',
            'flex flex-col items-center text-center',
            '[&_p]:font-roboto-500 [&_p]:text-lg [&_p]:text-black sm:[&_p]:line-clamp-3',
            'sm:[&_h1]:line-clamp-2 sm:[&_h2]:line-clamp-2 sm:[&_h3]:line-clamp-2 sm:[&_h4]:line-clamp-2',
            '[&_h1]:text-[2.5rem] sm:[&_h1]:text-5xl sm:[&_h1]:leading-[normal]',
            '[&_h2]:font-roboto-900 [&_h2]:text-[2.5rem] sm:[&_h2]:text-5xl sm:[&_h2]:leading-[normal]',
            '[&_h3]:font-roboto-900 [&_h3]:text-[2.5rem] sm:[&_h3]:text-5xl sm:[&_h3]:leading-[normal]',
            '[&_h4]:font-roboto-900 [&_h4]:text-[2.5rem] sm:[&_h4]:text-5xl sm:[&_h4]:leading-[normal]',
            '[&_h6]:font-roboto-400 [&_h6]:text-xs'
          )}
        >
          <BannerComponentContent {...props} />
        </div>
      </div>
      <div className={classNames('relative z-40', 'h-[100px] w-full md:-top-px')}>
        <div
          className={classNames(
            'clip-path-polygon-[0_0,100%_0,100%_61%,50%_100%,0_61%]',
            'sm:clip-path-polygon-[0_0,100%_0,100%_36%,50%_100%,0_36%]',
            'bg-challenger-green',
            'absolute z-30 h-full w-full'
          )}
        ></div>
        {showShards && (
          <div
            className={classNames(
              'clip-path-polygon-[50%_100%,100%_54%,100%_41%]',
              'sm:clip-path-polygon-[50%_100%,100%_20%,100%_0%]',
              'from-deep-green to-challenger-green bg-gradient-30 sm:bg-gradient-0',
              'absolute z-40 h-full w-full'
            )}
          ></div>
        )}
        {showShards && (
          <div
            className={classNames(
              'clip-path-polygon-[50%_100%,100%_64%,100%_54%]',
              'sm:clip-path-polygon-[50%_100%,100%_36%,100%_20%]',
              'from-blue via-bright-navy to-bright-navy bg-gradient-270',
              'absolute z-40 h-full w-full'
            )}
          ></div>
        )}
      </div>
    </div>
  );
};

export default BannerTemplate13;
