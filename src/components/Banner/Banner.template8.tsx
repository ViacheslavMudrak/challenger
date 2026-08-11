import { BannerComponentProps } from './Banner.types';
import { BannerComponentContent } from './Banner.content';
import classNames from 'classnames';
import BannerComponentImage from './Banner.Image';
import { useAnalytics } from 'lib/challenger/hooks';

const BannerTemplate8 = (props: BannerComponentProps) => {
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
          'md:clip-path-polygon-[0_0,100%_0,100%_100%,0%_100%]',
          'min-h-[350px] w-full md:h-[480px] md:w-[47%]',
          'bg-white',
          'relative flex flex-col'
        )}
      >
        <div
          className={classNames(
            'mb-5 mt-16 px-6 pb-12 lg:mt-24 xl:pl-24',
            'sm:[&_h1]:line-clamp-3 sm:[&_h2]:line-clamp-3 sm:[&_h3]:line-clamp-3 sm:[&_h4]:line-clamp-3',
            'lg:[&_h1]:line-clamp-2 lg:[&_h2]:line-clamp-2 lg:[&_h3]:line-clamp-2 lg:[&_h4]:line-clamp-2',
            'sm:[&_p]:line-clamp-3',
            '[&_h1]:leading-11 [&_h1]:text-[2.5rem] sm:[&_h1]:text-5xl',
            '[&_h2]:leading-11 [&_h2]:font-roboto-900 [&_h2]:text-[2.5rem] sm:[&_h2]:text-5xl',
            '[&_h3]:leading-11 [&_h3]:font-roboto-900 [&_h3]:text-[2.5rem] sm:[&_h3]:text-5xl',
            '[&_h4]:leading-11 [&_h4]:font-roboto-900 [&_h4]:text-[2.5rem] sm:[&_h4]:text-5xl'
          )}
        >
          <BannerComponentContent {...props} />
        </div>
      </div>
      <div
        className={classNames(
          'relative w-full md:flex-row',
          'min-h-[350px] md:h-[480px] md:w-[53%]',
          'bg-white md:bg-transparent'
        )}
      >
        <div
          className={classNames(
            'left-0 sm:-left-[0.5px]',
            'top-[0.5px] sm:top-0',
            'clip-path-polygon-[100%_82%,0%_100%,100%_100%]',
            'sm:clip-path-polygon-[0_0,0_100%,11%_0]',
            'absolute z-50 h-full w-full',
            'bg-white'
          )}
        ></div>
        <div
          className={classNames(
            'clip-path-polygon-[8%_0,0_100%,0_0]',
            'sm:clip-path-polygon-[11%_0,0%_100%,14%_0]',
            'from-deep-green to-challenger-green bg-gradient-320 sm:bg-gradient-10',
            'absolute z-30 h-full w-full'
          )}
        ></div>
        <div
          className={classNames(
            'clip-path-polygon-[100%_73%,0%_100%,100%_82%]',
            'sm:clip-path-polygon-[14%_0,0%_100%,20%_0]',
            'from-bright-navy via-blue to-blue bg-gradient-40',
            'absolute z-30 h-full w-full'
          )}
        ></div>
        <BannerComponentImage
          className="clip-path-polygon-[0%_0%,100%_0,100%_100%,0_100%]"
          image={BannerImage}
        />
      </div>
    </div>
  );
};

export default BannerTemplate8;
