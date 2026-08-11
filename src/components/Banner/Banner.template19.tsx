import { BannerBgColor, BannerComponentProps } from './Banner.types';
import { BannerComponentContent } from './Banner.content';
import classNames from 'classnames';
import BannerComponentImage from './Banner.Image';
import { useAnalytics, useSitecore } from 'lib/challenger/hooks';

const BannerTemplate19 = (props: BannerComponentProps) => {
  const { BannerImage, bgColorClass, BannerContent } = props?.rendering?.fields;
  const bannerBgColor = bgColorClass || BannerBgColor.None;
  const hasContent = (BannerContent?.value || '').trim().length > 0;
  const uniqueId = props?.rendering?.params?.RenderingIdentifier || props.rendering.uid || '';
  const { linkComponent } = useAnalytics(props.rendering);
  const { isEditMode } = useSitecore();
  const bannerHeight1 =
    props?.rendering?.fields?.DisclaimerText?.value || isEditMode
      ? 'min-h-[420px] md:h-[420px]'
      : 'min-h-[385px] md:h-[385px]';
  const bannerHeight2 =
    props?.rendering?.fields?.DisclaimerText?.value || isEditMode ? 'md:h-[420px]' : 'md:h-[385px]';

  return (
    <div
      id={uniqueId}
      role="banner"
      link_component={linkComponent}
      className={classNames('relative w-full', bannerBgColor?.toString())}
    >
      <div className="relative flex w-full flex-col md:flex-row">
        <div className={`relative flex w-full flex-col ${bannerHeight1}`}>
          <div className={`relative top-px h-[110px] w-full md:top-0 ${bannerHeight2}`}>
            <div
              className={classNames(
                'clip-path-polygon-[77%_12%,0_30%,0_75%]',
                'md:clip-path-polygon-[74%_0,0_9%,0_21%]',
                'from-deep-green via-challenger-green to-challenger-green bg-gradient-115',
                'absolute z-40 h-full w-full md:flex'
              )}
            ></div>
            <div
              className={classNames(
                'clip-path-polygon-[77%_12%,100%_45%,100%_6%]',
                'md:clip-path-polygon-[73%_0,100%_16%,100%_5%]',
                'from-deep-green via-challenger-green to-deep-green bg-gradient-140',
                'absolute z-30 h-full w-full md:flex'
              )}
            ></div>
            <div
              className={classNames(
                'clip-path-polygon-[77%_12%,100%_80%,100%_45%]',
                'md:clip-path-polygon-[73%_0,100%_25%,100%_16%]',
                ' from-blue  to-bright-navy bg-gradient-230',
                'absolute z-30 h-full w-full md:flex'
              )}
            ></div>
            <div
              className={classNames(
                'clip-path-polygon-[0_75%,77%_12%,107%_100%,0_100%]',
                'md:clip-path-polygon-[0_21%,73.5%_0,66%_100%,0_88%]',
                'bg-deep-blue',
                'absolute z-30 h-full w-full flex-col md:flex'
              )}
            ></div>
          </div>
          <div
            className={classNames(
              'relative z-30 w-full pt-2 md:absolute md:mt-24 md:max-w-[60%] lg:max-w-[50%] lg:pt-0 xl:m-40 xl:mt-28',
              'pixel-rounding-error-fix-blue',
              'bg-deep-blue lg:bg-transparent',
              {
                'sm:[&_h1]:line-clamp-3 sm:[&_h2]:line-clamp-3 sm:[&_h3]:line-clamp-3': !hasContent,
              },
              {
                'sm:[&_h1]:line-clamp-2 sm:[&_h2]:line-clamp-2 sm:[&_h3]:line-clamp-2': hasContent,
              },
              {
                'lg:[&_h1]:line-clamp-2 lg:[&_h2]:line-clamp-2 lg:[&_h3]:line-clamp-2': !hasContent,
              },
              {
                'lg:[&_h1]:line-clamp-1 lg:[&_h2]:line-clamp-1 lg:[&_h3]:line-clamp-1': hasContent,
              },
              '[&_h1]:text-[2rem] [&_h1]:leading-[2.5rem]',
              '[&_h2]:text-[2rem] [&_h2]:leading-[2.5rem]',
              '[&_h3]:text-[2rem] [&_h3]:leading-[2.5rem]',
              '[&_h4]:text-[2rem] [&_h4]:leading-[2.5rem]',
              'sm:[&_p]:line-clamp-1 lg:[&_p]:line-clamp-2'
            )}
          >
            <div className="mx-5 mb-24 md:mx-10 md:mb-0 md:[&_a]:w-fit">
              <BannerComponentContent {...props} textColor="text-white" headingColor="text-white" />
            </div>
          </div>
        </div>
        <div className="relative h-full w-full md:absolute md:right-0 md:clip-path-polygon-[73%_0,100%_25%,100%_95%,66%_100%]">
          <div className="absolute z-50 h-full w-full bg-deep-blue clip-path-polygon-[0_0,0_8%,100%_0] md:hidden"></div>
          <div
            className={classNames(
              'relative z-40 h-[250px] w-full md:absolute md:right-0 md:h-full md:w-[35%]',
              'clip-path-polygon-[0_7%,100%_0,100%_91.2%,0_88%] md:clip-path-polygon-[0_0,100%_0,100%_100%,0_100%]'
            )}
          >
            <BannerComponentImage image={BannerImage} />
          </div>
          <div
            className={classNames(
              'absolute bottom-0 z-40 h-[200px] w-full clip-path-polygon-[0_75%,0_99%,100%_89%]  md:hidden',
              ' from-bright-navy via-blue to-bright-navy bg-gradient-150'
            )}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BannerTemplate19;
