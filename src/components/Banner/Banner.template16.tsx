/* eslint-disable prettier/prettier */
import { BannerBgColor, BannerComponentProps } from './Banner.types';
import { BannerComponentContent } from './Banner.content';
import classNames from 'classnames';
import { isDarkBackground } from './banner.helpers';
import { useAnalytics } from 'lib/challenger/hooks';

const BannerTemplate16 = (props: BannerComponentProps) => {
  const { bgColorClass } = props?.rendering?.fields;
  const bannerBgColor = bgColorClass || BannerBgColor.DeepBlue;
  const isDarkColour = isDarkBackground(bannerBgColor);
  const textColour = isDarkColour ? 'text-white' : 'text-bright-navy';
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
          'min-h-[255px] w-full pb-20',
          'flex',
          'sm:justify-center'
        )}
      >
        <div
          className={classNames(
            'mt-20 px-8 md:max-w-[800px] md:px-0 xl:mt-16',
            'flex flex-col sm:items-center sm:text-center',
            'sm:[&_p]:line-clamp-3',
            'sm:[&_h1]:line-clamp-2 sm:[&_h2]:line-clamp-2 sm:[&_h3]:line-clamp-2 sm:[&_h4]:line-clamp-2',
            '[&_h1]:text-[2.5rem] sm:[&_h1]:text-5xl sm:[&_h1]:leading-[normal]',
            '[&_h2]:font-roboto-900 [&_h2]:text-[2.5rem] sm:[&_h2]:text-5xl sm:[&_h2]:leading-[normal]',
            '[&_h3]:font-roboto-900 [&_h3]:text-[2.5rem] sm:[&_h3]:text-5xl sm:[&_h3]:leading-[normal]',
            '[&_h4]:font-roboto-900 [&_h4]:text-[2.5rem] sm:[&_h4]:text-5xl sm:[&_h4]:leading-[normal]'
          )}
        >
          <BannerComponentContent {...props} headingColor={textColour} textColor={textColour} />
        </div>
      </div>
    </div>
  );
};

export default BannerTemplate16;
