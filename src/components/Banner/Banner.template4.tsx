import { BannerComponentProps } from './Banner.types';
import { BannerComponentContent } from './Banner.content';
import classNames from 'classnames';
import BannerComponentImage from './Banner.Image';
import { useAnalytics } from 'lib/challenger/hooks';

const BannerTemplate4 = (props: BannerComponentProps) => {
  const { BannerImage, BannerWithAnimation, bgColorClass } = props?.rendering?.fields;
  const uniqueId = props?.rendering?.params?.RenderingIdentifier || props.rendering.uid || '';
  const { linkComponent } = useAnalytics(props.rendering);

  return (
    <div
      id={uniqueId}
      role="banner"
      link_component={linkComponent}
      className={classNames('relative flex w-full flex-col-reverse md:flex-row', bgColorClass)}
    >
      <div
        className={classNames(
          'relative z-30 h-[40px] w-full md:hidden',
          'clip-path-polygon-[50%_100%,0_0,100%_0]',
          'bg-white'
        )}
      ></div>
      <div
        className={classNames(
          'md:clip-path-polygon-[0_0,100%_0,100%_100%,0%_96%]',
          'pixel-rounding-error-fix-white',
          'pixel-rounding-error-fix-vertical',
          'bg-white',
          'relative flex min-h-[350px] w-full flex-col md:h-[600px] md:w-[47%]',
          { animation: BannerWithAnimation?.value }
        )}
      >
        <div
          className={classNames(
            'mb-5 mt-4 px-6 pb-4 lg:mt-36 xl:pl-28',
            'sm:[&_h1]:line-clamp-3 sm:[&_h2]:line-clamp-3 sm:[&_h3]:line-clamp-3',
            'lg:[&_h1]:line-clamp-2 lg:[&_h2]:line-clamp-2 lg:[&_h3]:line-clamp-2',
            'sm:[&_p]:line-clamp-6 lg:[&_p]:line-clamp-4',
            '[&_h1]:text-[64px] [&_h1]:leading-[4.5rem]',
            '[&_h2]:font-roboto-900 [&_h2]:text-[64px] [&_h2]:leading-[4.5rem]',
            '[&_h3]:font-roboto-900 [&_h3]:text-[64px] [&_h3]:leading-[4.5rem]',
            '[&_h4]:font-roboto-900 [&_h4]:text-[64px] [&_h4]:leading-[4.5rem]'
          )}
        >
          <BannerComponentContent {...props} />
        </div>
        <div
          className={classNames(
            'clip-path-polygon-[0_92%,0%_97%,100%_100%]',
            'hidden sm:flex',
            'absolute z-50 h-full w-full',
            'from-deep-green via-challenger-green to-challenger-green bg-gradient-300',
            {
              animation: BannerWithAnimation?.value,
            }
          )}
        ></div>
      </div>
      <div
        className={classNames(
          'relative min-h-[350px] w-full md:h-[600px] md:w-[53%] md:flex-row',
          'pixel-rounding-error-fix-white',
          'bg-white sm:bg-transparent'
        )}
      >
        <div
          className={classNames(
            'clip-path-polygon-[0_0,0_100%,7%_0]',
            'md:-left-[1px]',
            'md:clip-path-polygon-[0_0,0_100%,18%_0]',
            'from-deep-green via-challenger-green to-challenger-green bg-gradient-40',
            'sm:bg-white sm:from-white sm:to-white',
            'absolute z-50 h-full w-full',
            {
              animation: BannerWithAnimation?.value,
            }
          )}
        ></div>
        <div
          className={classNames(
            'clip-path-polygon-[10%_0,0%_100%,24%_0]',
            'hidden sm:flex',
            'from-bright-navy via-blue to-blue bg-gradient-70',
            'absolute z-30 h-full w-full',
            { animation: BannerWithAnimation?.value }
          )}
        ></div>
        <div
          className={classNames(
            'clip-path-polygon-[100%_72%,0%_100%,100%_82%]',
            'from-bright-navy via-blue to-blue bg-gradient-35',
            'absolute z-20 h-full w-full',
            { animation: BannerWithAnimation?.value }
          )}
        ></div>
        <BannerComponentImage
          className="clip-path-polygon-[6%_0%,100%_0,100%_80%,0_100%]"
          image={BannerImage}
        />
      </div>
    </div>
  );
};

export default BannerTemplate4;
