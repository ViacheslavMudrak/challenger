import { BannerComponentProps } from './Banner.types';
import { BannerComponentContent } from './Banner.content';
import classNames from 'classnames';
import BannerComponentImage from './Banner.Image';
import { useAnalytics } from 'lib/challenger/hooks';

const BannerTemplate7 = (props: BannerComponentProps) => {
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
          'bg-challenger-green',
          'relative flex flex-col'
        )}
      >
        <div
          className={classNames(
            'hidden sm:flex',
            'sm:clip-path-polygon-[100%_92%,88%_100%,98%_100%]',
            'z-70 absolute h-full w-full',
            'bg-bright-navy'
          )}
        ></div>
        <div
          className={classNames(
            'hidden sm:flex',
            'sm:clip-path-polygon-[100%_100%,98%_100%,100%_92%]',
            'z-60 absolute h-full w-full',
            'template7-custom-gradient'
          )}
        ></div>
        <div
          className={classNames(
            'mb-5 mt-16 px-6 pb-12 lg:mt-28 xl:pl-24',
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
          'bg-challenger-green md:bg-transparent'
        )}
      >
        <div
          className={classNames(
            'left-0 sm:-left-[0.5px]',
            'top-[0.5px] sm:top-0',
            'clip-path-polygon-[100%_86%,0%_100%,100%_100%]',
            'sm:clip-path-polygon-[0_0,0_92.3%,21%_0]',
            'absolute z-50 h-full w-full',
            'bg-challenger-green'
          )}
        ></div>
        <div
          className={classNames(
            'clip-path-polygon-[100%_61%,0%_100%,100%_90%]',
            'sm:clip-path-polygon-[9%_0,0%_92.3%,26%_0]',
            'from-bright-navy via-blue to-blue bg-gradient-10',
            'absolute z-30 h-full w-full'
          )}
        ></div>

        <div
          className={classNames(
            'hidden sm:flex',
            'sm:clip-path-polygon-[42%_100%,0_100%,0_92%]',
            'from-bright-navy via-blue to-blue bg-gradient-115',
            'absolute z-30 h-full w-full'
          )}
        ></div>
        <div
          className={classNames(
            'hidden sm:flex',
            'sm:clip-path-polygon-[10%_100%,0_100%,0%_92%]',
            'left-0 sm:-left-[0.5px]',
            'bg-challenger-green',
            'absolute z-30 h-full w-full'
          )}
        ></div>
        <div
          className={classNames(
            'clip-path-polygon-[100%_78%,0%_100%,100%_92%]',
            'sm:hidden',
            'from-deep-green to-challenger-green bg-gradient-40 sm:bg-gradient-10',
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

export default BannerTemplate7;
