import { BannerComponentProps } from './Banner.types';
import { BannerComponentContent } from './Banner.content';
import classNames from 'classnames';
import BannerComponentImage from './Banner.Image';
import { useAnalytics } from 'lib/challenger/hooks';

export const BannerTemplate1 = (props: BannerComponentProps) => {
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
          'bg-challenger-green'
        )}
      ></div>
      <div
        className={classNames(
          'template1-content',
          'bg-challenger-green',
          'pixel-rounding-error-fix',
          'relative flex flex-1',
          'min-h-[350px] w-full md:h-[600px] md:w-[49%]',
          { animation: BannerWithAnimation?.value }
        )}
      >
        <div
          className={classNames(
            'mb-5 mt-4 px-6 pb-4 lg:mt-20 xl:px-0 xl:pl-24',
            'sm:[&_h1]:line-clamp-4 sm:[&_h2]:line-clamp-4 sm:[&_h3]:line-clamp-4',
            'lg:[&_h1]:line-clamp-3 lg:[&_h2]:line-clamp-3 lg:[&_h3]:line-clamp-3',
            'sm:[&_p]:line-clamp-6 lg:[&_p]:line-clamp-3',
            '[&_h1]:text-hero-lg xl:[&_h1]:text-hero-xl',
            '[&_h2]:font-roboto-900 [&_h2]:text-hero-lg xl:[&_h2]:text-hero-xl',
            '[&_h3]:font-roboto-900 [&_h3]:text-hero-lg xl:[&_h3]:text-hero-xl',
            '[&_h4]:font-roboto-900 [&_h4]:text-hero-lg xl:[&_h4]:text-hero-xl'
          )}
        >
          <BannerComponentContent {...props} />
        </div>
      </div>
      <div
        className={classNames(
          'relative w-full flex-col md:flex-row',
          'min-h-[350px] md:h-[600px] md:w-[51%]',
          'pixel-rounding-error-fix',
          'bg-challenger-green md:bg-transparent'
        )}
      >
        <div
          className={classNames(
            'template1-shape1',
            'absolute z-50 h-full w-full bg-challenger-green',
            { animation: BannerWithAnimation?.value }
          )}
        ></div>
        <div
          className={classNames(
            'template1-shape2',
            'from-bright-navy via-blue to-blue bg-gradient-40',
            'absolute z-40 h-full w-full',
            { animation: BannerWithAnimation?.value }
          )}
        ></div>
        <div
          className={classNames(
            'template1-shape3',
            'from-deep-green via-challenger-green to-challenger-green bg-gradient-70',
            'absolute z-30 h-full w-full',
            { animation: BannerWithAnimation?.value }
          )}
        ></div>
        <div
          className={classNames(
            'template1-shape4',
            'from-deep-green via-deep-green to-challenger-green bg-gradient-140',
            'absolute z-20 h-full w-full',
            { animation: BannerWithAnimation?.value }
          )}
        ></div>
        <BannerComponentImage
          className={classNames('template1-shape5', { animation: BannerWithAnimation?.value })}
          image={BannerImage}
        />
      </div>
    </div>
  );
};

export default BannerTemplate1;
