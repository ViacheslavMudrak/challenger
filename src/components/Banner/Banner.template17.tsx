import { ArticleSummaryType, BannerBgColor, BannerComponentProps } from './Banner.types';
import { BannerComponentContent } from './Banner.content';
import classNames from 'classnames';
import { isDarkBackground } from './banner.helpers';
import { getFormattedDate } from 'lib/challenger/helpers';
import { useAnalytics } from 'lib/challenger/hooks';

const BannerTemplate17 = (props: BannerComponentProps) => {
  const { bgColorClass } = props?.rendering?.fields;
  const { PublishedDate } = props?.rendering?.fields as ArticleSummaryType;
  const bannerBgColor = bgColorClass || BannerBgColor.DeepBlue;
  const isDarkColour = isDarkBackground(bannerBgColor);
  const textColour = isDarkColour ? 'text-white' : 'text-bright-navy';
  const formattedDate = getFormattedDate(PublishedDate?.value);
  const uniqueId = props?.rendering?.params?.RenderingIdentifier || props.rendering.uid || '';
  const { linkComponent } = useAnalytics(props.rendering);

  let publishedYear = 1;
  if (PublishedDate?.value) {
    publishedYear = new Date(PublishedDate?.value).getFullYear();
  }

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
          'w-full py-16 md:pb-6 md:pt-5',
          'flex',
          'sm:justify-start'
        )}
      >
        <div
          className={classNames(
            'mb-11 mt-8 px-6 md:mb-5 md:mt-6 xl:px-24',
            'flex flex-col sm:items-start sm:text-start',
            'sm:[&_p]:line-clamp-3',
            'sm:[&_h1]:line-clamp-2 sm:[&_h2]:line-clamp-2 sm:[&_h3]:line-clamp-2 sm:[&_h4]:line-clamp-2',
            '[&_h1]:text-[2.5rem] sm:[&_h1]:text-5xl sm:[&_h1]:leading-[normal]',
            '[&_h2]:font-roboto-900 [&_h2]:text-[2.5rem] sm:[&_h2]:text-5xl sm:[&_h2]:leading-[normal]',
            '[&_h3]:font-roboto-900 [&_h3]:text-[2.5rem] sm:[&_h3]:text-5xl sm:[&_h3]:leading-[normal]',
            '[&_h4]:font-roboto-900 [&_h4]:text-[2.5rem] sm:[&_h4]:text-5xl sm:[&_h4]:leading-[normal]'
          )}
        >
          <BannerComponentContent
            {...props}
            showHeadingOnly
            headingColor={textColour}
            textColor={textColour}
          />
          {formattedDate && publishedYear > 1 && (
            <span className={classNames('md:leading-2 text-xl leading-3 md:text-2xl', textColour)}>
              Updated: {formattedDate}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerTemplate17;
