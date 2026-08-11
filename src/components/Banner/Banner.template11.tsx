/* eslint-disable prettier/prettier */
import { BannerBgColor, BannerComponentProps } from './Banner.types';
import { BannerComponentContent } from './Banner.content';
import classNames from 'classnames';
import { isDarkBackground } from './banner.helpers';
import { useAnalytics } from 'lib/challenger/hooks';

const BannerTemplate11 = (props: BannerComponentProps) => {
  const { bgColorClass, BannerContent } = props?.rendering?.fields;
  const bannerBgColor = bgColorClass || BannerBgColor.Green;
  const isDarkColour = isDarkBackground(bannerBgColor);
  const textColour = isDarkColour ? 'text-white' : 'text-bright-navy';
  const uniqueId = props?.rendering?.params?.RenderingIdentifier || props.rendering.uid || '';
  const { linkComponent } = useAnalytics(props.rendering);

  return (
    <div
      id={uniqueId}
      role="banner"
      link_component={linkComponent}
      className={classNames('relative flex w-full flex-col sm:flex-row', bannerBgColor.toString())}
    >
      <div
        className={classNames(
          'relative',
          bannerBgColor.toString(),
          'h-full w-full'
        )}
      >
        <div
          className={classNames(
            'relative z-30',
            'mt-16 pl-8 pr-12 xl:mt-24 xl:pl-24',
            { 'pb-16': BannerContent },
            { 'mt-24 md:mt-36 xl:mt-36': !BannerContent },
            'sm:[&_h1]:line-clamp-2 sm:[&_h2]:line-clamp-2 sm:[&_h3]:line-clamp-2 sm:[&_h4]:line-clamp-2',
            'sm:[&_p]:line-clamp-2 sm:[&_p]:w-10/12',
            '[&_h1]:leading-11 [&_h1]:w-10/12 [&_h1]:text-[2.5rem] sm:[&_h1]:text-5xl',
            '[&_h2]:leading-11 [&_h2]:w-10/12 [&_h2]:font-roboto-900 [&_h2]:text-[2.5rem] sm:[&_h2]:text-5xl',
            '[&_h3]:leading-11 [&_h3]:w-10/12 [&_h3]:font-roboto-900 [&_h3]:text-[2.5rem] sm:[&_h3]:text-5xl',
            '[&_h4]:leading-11 [&_h4]:w-10/12 [&_h4]:font-roboto-900 [&_h4]:text-[2.5rem] sm:[&_h4]:text-5xl'
          )}
        >
          <BannerComponentContent {...props} textColor={textColour} headingColor={textColour} />
        </div>
        <div className="absolute bottom-0 w-full overflow-hidden sm:right-0 sm:top-0 sm:w-[409px]">
          <div className={classNames('h-[360px] w-full overflow-hidden')}>
            <div className={classNames('absolute left-14 top-5 h-full w-full sm:left-0 sm:top-0')}>
              <div
                className={classNames(
                  'clip-path-polygon-[100%_67%,76%_78%,100%_88%]',
                  'from-bright-navy via-blue to-blue bg-gradient-240',
                  'absolute z-40 h-full w-full'
                )}
              ></div>
              <div
                className={classNames(
                  'clip-path-polygon-[76%_78%,100%_88%,100%_100%,67%_100%]',
                  'from-bright-navy via-blue to-blue bg-gradient-0',
                  'absolute z-40 h-full w-full'
                )}
              ></div>
              <div
                className={classNames(
                  'clip-path-polygon-[100%_67%,27%_100%,100%_100%]',
                  'from-bright-navy  to-blue bg-gradient-90',
                  'absolute z-30 h-full w-full'
                )}
              ></div>
              <div
                className={classNames(
                  'clip-path-polygon-[96%_0,100%_0,100%_100%,70%_100%]',
                  'from-blue via-blue to-bright-navy bg-gradient-90',
                  'absolute z-20 h-full w-full'
                )}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerTemplate11;
