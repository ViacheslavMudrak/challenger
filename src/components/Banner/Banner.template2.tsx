import { BannerComponentProps } from './Banner.types';
import { BannerComponentContent } from './Banner.content';
import classNames from 'classnames';
import BannerComponentImage from './Banner.Image';
import { useAnalytics } from 'lib/challenger/hooks';

const BannerTemplate2 = (props: BannerComponentProps) => {
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
          'relative z-30 h-[30px] w-full clip-path-polygon-[100%_0,0_0,100%_100%] md:hidden',
          'bg-bright-navy-light'
        )}
      ></div>
      <div
        className={classNames(
          'pixel-rounding-error-fix-navy-light sm:clip-path-polygon-[0_12%,100%_0,100%_99%,0_93%]',
          'bg-gradient-to-t from-bright-navy-light to-bright-navy md:bg-gradient-to-r',
          'relative z-30 min-h-[410px] w-full flex-col  md:flex md:h-[680px] md:w-6/12'
        )}
      >
        <div
          className={classNames(
            'md:clip-path-polygon-[0_12%,0_17%,100%_0]',
            'from-deep-green via-challenger-green to-challenger-green bg-gradient-115',
            'absolute z-40 hidden h-full w-full md:flex'
          )}
        ></div>
        <div
          className={classNames(
            'mx-6 mt-16 pb-20 sm:mt-32 lg:mx-[95px] xl:mt-56',
            'sm:[&_h1]:line-clamp-3 sm:[&_h2]:line-clamp-3 sm:[&_h3]:line-clamp-3',
            'lg:[&_h1]:line-clamp-2 lg:[&_h2]:line-clamp-2 lg:[&_h3]:line-clamp-2',
            '[&_h1]:text-[2.5rem] [&_h1]:leading-[3rem]',
            '[&_h2]:text-[2.5rem] [&_h2]:leading-[3rem]',
            '[&_h3]:text-[2.5rem] [&_h3]:leading-[3rem]',
            '[&_h4]:text-[2.5rem] [&_h4]:leading-[3rem]',
            'sm:[&_p]:line-clamp-6 lg:[&_p]:line-clamp-4'
          )}
        >
          <BannerComponentContent {...props} textColor="text-white" headingColor="text-white" />
        </div>
      </div>
      <div className="relative z-20 min-h-[410px] w-full md:h-[680px] md:w-6/12 md:flex-row md:bg-transparent">
        <div
          className={classNames(
            'clip-path-polygon-[0_0,100%_20%,100%_5%]',
            'lg:clip-path-polygon-[0_0,100%_16%,100%_2%]',
            'from-deep-green via-challenger-green to-challenger-green bg-gradient-150',
            'absolute z-40 h-full w-full'
          )}
        ></div>
        <div
          className={classNames(
            'clip-path-polygon-[0_0,100%_23%,100%_16%]',
            'from-bright-navy via-blue to-blue bg-gradient-270',
            'absolute z-40 h-full w-full'
          )}
        ></div>
        <div
          className={classNames(
            'bg-bright-navy clip-path-polygon-[0_0,0%_99%,20%_100%]',
            'absolute z-40 hidden h-full w-full sm:-left-[0.5px] sm:flex'
          )}
        ></div>
        <div
          className={classNames(
            'clip-path-polygon-[100%_85%,0%_100%,100%_100%]',
            'pixel-rounding-error-fix-navy',
            'bg-bright-navy',
            'absolute z-40 h-full w-full sm:hidden'
          )}
        ></div>
        <BannerComponentImage
          className={classNames(
            'clip-path-polygon-[0_0,100%_13%,100%_86%,0%_100%] sm:clip-path-polygon-[0_0,100%_8%,100%_90%,20%_100%,0_92%]'
          )}
          image={BannerImage}
        />
      </div>
    </div>
  );
};

export default BannerTemplate2;
