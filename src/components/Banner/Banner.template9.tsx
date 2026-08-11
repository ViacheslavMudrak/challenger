import { BannerBgColor } from './Banner.types';
import { BannerComponentProps } from './Banner.types';
import { BannerComponentContent } from './Banner.content';
import classNames from 'classnames';
import { isDarkBackground } from './banner.helpers';
import BannerRate from './Banner.rate';
import BannerShareholder from './Banner.shareholder';
import { useAnalytics } from 'lib/challenger/hooks';

const BannerTemplate9 = (props: BannerComponentProps) => {
  const { bgColorClass, ShowRate, ShowSharePrice } = props.rendering.fields;
  const bannerBgColor = bgColorClass || BannerBgColor.Green;
  const isDarkColour = isDarkBackground(bannerBgColor);
  const showRate = !!ShowRate?.value;
  const showSharePrice = !!ShowSharePrice?.value;
  const textColour = isDarkColour ? 'text-white' : 'text-bright-navy';
  const uniqueId = props?.rendering?.params?.RenderingIdentifier || props.rendering.uid || '';

  const { linkComponent } = useAnalytics(props.rendering);

  return (
    <div
      id={uniqueId}
      role="banner"
      link_component={linkComponent}
      className={classNames(
        'relative flex w-full flex-col sm:flex-row',
        'bg-challenger-green sm:min-h-[350px]'
      )}
    >
      <div className={classNames('hidden sm:flex sm:w-auto sm:flex-1')}></div>
      <div
        className={classNames(
          'absolute right-0 flex h-[296px] w-full overflow-hidden sm:w-[409px]'
        )}
      >
        <div
          className={classNames('absolute -top-10 left-4 z-50 h-full w-full sm:left-0 sm:top-0')}
        >
          <div
            className={classNames(
              'clip-path-polygon-[81%_34%,72%_0,90%_0]',
              'from-challenger-green via-deep-green to-deep-green bg-gradient-170',
              'absolute z-50 h-full w-full'
            )}
          ></div>
          <div
            className={classNames(
              'clip-path-polygon-[90%_0,100%_0,100%_45%,81%_34%]',
              'from-challenger-green via-deep-green  to-deep-green bg-gradient-230',
              'absolute z-50 h-full w-full'
            )}
          ></div>
          <div
            className={classNames(
              'clip-path-polygon-[0_0,81%_34%,90%_0]',
              'from-bright-navy via-blue to-blue bg-gradient-140',
              'absolute z-40 h-full w-full'
            )}
          ></div>
          <div
            className={classNames(
              'clip-path-polygon-[71%_0,100%_98%,_100%_0]',
              'from-blue via-blue to-bright-navy bg-gradient-10',
              'absolute z-30 h-full w-full'
            )}
          ></div>
        </div>
      </div>
      <div className={classNames('relative', bannerBgColor.toString(), 'flex h-fit w-full gap-4')}>
        <div className="flex w-full">
          <div
            className={classNames(
              'mb-5 mt-16 px-6 pb-12 xl:mt-[70px] xl:pl-24',
              {
                'w-full md:w-[500px] lg:w-[650px] xl:w-[calc(100%-480px)]':
                  showRate || showSharePrice,
              },
              'sm:[&_h1]:line-clamp-2 sm:[&_h2]:line-clamp-2 sm:[&_h3]:line-clamp-2 sm:[&_h4]:line-clamp-2',
              'sm:[&_p]:line-clamp-3 sm:[&_p]:w-9/12',
              '[&_h1]:leading-11 [&_h1]:w-10/12 [&_h1]:text-[2.5rem] sm:[&_h1]:text-5xl',
              '[&_h2]:leading-11 [&_h2]:w-10/12 [&_h2]:font-roboto-900 [&_h2]:text-[2.5rem] sm:[&_h2]:text-5xl',
              '[&_h3]:leading-11 [&_h3]:w-10/12 [&_h3]:font-roboto-900 [&_h3]:text-[2.5rem] sm:[&_h3]:text-5xl',
              '[&_h4]:leading-11 [&_h4]:w-10/12 [&_h4]:font-roboto-900 [&_h4]:text-[2.5rem] sm:[&_h4]:text-5xl'
            )}
          >
            <BannerComponentContent {...props} textColor={textColour} headingColor={textColour}>
              {showRate && (
                <div className="my-4 flex w-full items-center md:hidden">
                  <BannerRate />
                </div>
              )}
              {showSharePrice && (
                <div className="my-4 flex w-full items-center md:hidden">
                  <BannerShareholder />
                </div>
              )}
            </BannerComponentContent>
          </div>
          {showRate && (
            <div className="hidden md:flex">
              <BannerRate />
            </div>
          )}
          {showSharePrice && (
            <div className="hidden md:flex">
              <BannerShareholder />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerTemplate9;
