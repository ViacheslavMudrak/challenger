import { BannerComponentProps } from './Banner.types';
import { BannerComponentContent } from './Banner.content';
import classNames from 'classnames';
import BannerComponentImage from './Banner.Image';
import { useAnalytics } from 'lib/challenger/hooks';

const BannerTemplate3 = (props: BannerComponentProps) => {
  const { BannerImage, bgColorClass } = props?.rendering?.fields;
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
          'md:top-0 md:clip-path-polygon-[0_0,100%_0,100%_98%,0%_100%]',
          'pixel-rounding-error-fix',
          'bg-challenger-green',
          'relative flex min-h-[350px] w-full flex-col md:h-[590px] md:w-[47%]'
        )}
      >
        <div
          className={classNames(
            'mb-5 mt-4 px-6 pb-4 lg:mt-20 xl:pl-24',
            'sm:[&_h1]:line-clamp-3 sm:[&_h2]:line-clamp-3 sm:[&_h3]:line-clamp-3',
            'lg:[&_h1]:line-clamp-3 lg:[&_h2]:line-clamp-3 lg:[&_h3]:line-clamp-3',
            'sm:[&_p]:line-clamp-6 lg:[&_p]:line-clamp-4',
            '[&_h1]:text-hero-lg xl:[&_h1]:text-hero-xl',
            '[&_h2]:font-roboto-900 [&_h2]:text-hero-lg xl:[&_h2]:text-hero-xl',
            '[&_h3]:font-roboto-900 [&_h3]:text-hero-lg xl:[&_h3]:text-hero-xl',
            '[&_h4]:font-roboto-900 [&_h4]:text-hero-lg xl:[&_h4]:text-hero-xl'
          )}
        >
          <BannerComponentContent {...props} />
        </div>
        <div
          className={classNames(
            'clip-path-polygon-[0_90%,0%_100%,100%_98%]',
            'hidden sm:flex',
            'absolute z-50 h-full w-full',
            'from-bright-navy via-blue to-blue bg-gradient-300'
          )}
        ></div>
      </div>
      <div
        className={classNames(
          'relative w-full md:flex-row',
          'min-h-[350px] md:h-[590px] md:w-[53%]',
          'pixel-rounding-error-fix',
          'bg-challenger-green md:bg-transparent'
        )}
      >
        <div
          className={classNames(
            '-left-[0.5px]',
            'clip-path-polygon-[0_0,0_98%,25%_0]',
            'absolute z-50 h-full w-full bg-challenger-green'
          )}
        ></div>
        <div
          className={classNames(
            'clip-path-polygon-[20%_0,0%_98%,31%_0]',
            'from-deep-green via-challenger-green to-challenger-green bg-gradient-70',
            'absolute z-30 h-full w-full'
          )}
        ></div>
        <div
          className={classNames(
            'clip-path-polygon-[100%_63%,0%_98%,100%_80%]',
            'from-bright-navy via-blue to-blue bg-gradient-35',
            'absolute z-20 h-full w-full'
          )}
        ></div>
        <BannerComponentImage
          className="clip-path-polygon-[20%_0%,100%_0,100%_75%,0_98%]"
          image={BannerImage}
        />
      </div>
    </div>
  );
};

export default BannerTemplate3;
