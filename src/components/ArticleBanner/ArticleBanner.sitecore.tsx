/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArticleSummaryType, PageFields, HeadingLevel } from './ArticleBanner.types';
import classNames from 'classnames';
import {
  ComponentParams,
  ComponentRendering,
  Text,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { getBannerBgColour, isDarkBackground } from './ArticleBanner.helpers';
import { useAnalytics } from 'lib/challenger/hooks';
import { ArticleBannerSummary } from './ArticleBanner.summary';
import ArticleBannerComponentImage from './ArticleBanner.Image';

/*New component implemented by reusing GEN_T4_HEADER_BANNER variant of Banner component for mapping page level fields and to be specifically developed for Article pages*/

interface ArticleBannerProps {
  rendering: ComponentRendering & { params: ComponentParams };
}

const ArticleBanner = (props: ArticleBannerProps) => {
  const { page: _sdkPage } = useSitecore();
  const pageFields = (_sdkPage as any)?.route?.fields as unknown as PageFields;
  const bannerBgColor = getBannerBgColour(pageFields?.BannerBgColor?.fields?.Color?.value);
  const isDarkColour = isDarkBackground(bannerBgColor);
  const textColour = isDarkColour ? 'text-white' : 'text-bright-navy';
  const uniqueId = props?.rendering?.params?.RenderingIdentifier || props.rendering.uid || '';
  const { linkComponent } = useAnalytics(props.rendering);

  const summaryComponentFields: ArticleSummaryType = {
    ReadInMins: pageFields?.ReadInMins,
    FullName: pageFields?.FullName,
    ProfileImage: pageFields?.ProfileImage,
    PublishedDate: pageFields?.PublishedDate,
  };

  const renderSubHeading = () => {
    return (
      <Text
        tag="span"
        article_category={pageFields?.BannerSubheading?.value}
        className="mb-5 block text-lg text-bright-teal"
        field={pageFields?.BannerSubheading}
      />
    );
  };

  const renderHeading = () => {
    const level = (pageFields?.HeadingLevel?.value as HeadingLevel | undefined) || 'h1';

    return (
      <Text
        tag={level}
        role="heading"
        article_name={pageFields?.ArticleTitle?.value}
        className={`mb-5 overflow-hidden text-ellipsis font-roboto-700 ${textColour}`}
        field={pageFields?.ArticleTitle}
        title={pageFields?.ArticleTitle?.value}
      />
    );
  };

  return (
    <div
      id={uniqueId}
      role="banner"
      link_component={linkComponent}
      article_id={uniqueId}
      className={classNames('relative flex w-full flex-col md:flex-row', bannerBgColor?.toString())}
    >
      <div
        className={classNames(
          'relative w-full md:flex-row',
          'h-[285px] md:h-[320px] md:w-[380px]',
          bannerBgColor?.toString()
        )}
      >
        <div
          className={classNames(
            'clip-path-polygon-[0_80%,0%_100%,67%_96%]',
            'md:clip-path-polygon-[89%_70%,96%_0,80%_0]',
            'bg-gradient-to-l from-deep-green to-challenger-green md:bg-gradient-350',
            'absolute z-30 h-full w-full'
          )}
        ></div>
        <div
          className={classNames(
            'clip-path-polygon-[100%_91%,100%_98%,67%_96%]',
            'sm:clip-path-polygon-[89%_70%,87%_100%,67%_100%]',
            'from-blue via-bright-navy to-bright-navy bg-gradient-270',
            'absolute z-30 h-full w-full'
          )}
        ></div>
        <div
          className={classNames(
            'clip-path-polygon-[100%_79%,100%_91%,67%_96%]',
            'sm:clip-path-polygon-[89%_70%,85%_100%,100%_100%]',
            'from-deep-green via-deep-green to-challenger-green bg-gradient-70 md:bg-gradient-180',
            'absolute z-30 h-full w-full'
          )}
        ></div>
        <div
          className={classNames(
            'clip-path-polygon-[100%_0,100%_86%,67%_96%,0_84%,0_0]',
            'sm:clip-path-polygon-[95%_0,89%_70%,70%_100%,0_100%,0_0]',
            'absolute z-20 h-full w-full'
          )}
        >
          <ArticleBannerComponentImage
            className="clip-path-polygon-[0%_0%,100%_0,100%_100%,0_100%]"
            image={pageFields?.ArticleImageUrl}
          />
        </div>
      </div>
      <div
        className={classNames(
          'md:clip-path-polygon-[0_0,100%_0,100%_100%,0%_100%]',
          'min-h-[320px] w-full md:h-[320px] md:w-[calc(100%-380px)]',
          bannerBgColor?.toString(),
          'relative flex flex-col'
        )}
      >
        <div
          className={classNames(
            'mb-5 mt-6 px-6 pb-12 lg:mt-14 xl:pl-9',
            'sm:[&_h1]:line-clamp-2 sm:[&_h2]:line-clamp-2 sm:[&_h3]:line-clamp-3 sm:[&_h4]:line-clamp-2',
            'sm:[&_p]:line-clamp-4',
            '[&_h1]:leading-11 [&_h1]:w-10/12 [&_h1]:text-[2.5rem]  sm:[&_h1]:text-5xl',
            '[&_h2]:leading-11 [&_h2]:w-10/12 [&_h2]:font-roboto-900 [&_h2]:text-[2.5rem] sm:[&_h2]:text-5xl',
            '[&_h3]:leading-11 [&_h3]:w-10/12 [&_h3]:font-roboto-900 [&_h3]:text-[2.5rem]  sm:[&_h3]:text-5xl',
            '[&_h4]:leading-11 [&_h4]:w-10/12 [&_h4]:font-roboto-900 [&_h4]:text-[2.5rem]  sm:[&_h4]:text-5xl'
          )}
        >
          {renderSubHeading()}
          {renderHeading()}
          <ArticleBannerSummary {...summaryComponentFields} TextColor={textColour} />
        </div>
      </div>
    </div>
  );
};

export default ArticleBanner;
