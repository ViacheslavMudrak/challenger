import classNames from 'classnames';
import { ArticleSummaryType } from './Banner.types';
import { getInitialsFromFullName } from './banner.helpers';
import { NextImage, Text } from '@sitecore-content-sdk/nextjs';
import { getFormattedDate } from 'lib/challenger/helpers';

export interface BannerArticleProps extends ArticleSummaryType {
  TextColor?: string;
}
export const BannerArticleSummary = (props: BannerArticleProps) => {
  if (!props) {
    return null;
  }

  const {
    ProfileImage,
    DurationInMins,
    FullName,
    PublishedDate,
    Role,
    TextColor = 'text-white',
  } = props;
  const formattedDate = getFormattedDate(PublishedDate?.value);

  const renderImage = () => {
    return (
      <NextImage
        field={ProfileImage}
        width={100}
        height={100}
        unoptimized={true}
        className="absolute z-20 h-full w-full object-cover"
        onError={(event) => ((event.target as HTMLImageElement).style.display = 'none')}
      />
    );
  };

  const renderProfileImage = () => {
    if (!ProfileImage) {
      return null;
    }

    return (
      <div
        className={classNames(
          'relative flex h-12 w-12 min-w-[3rem] overflow-hidden rounded-full bg-grey-darker'
        )}
      >
        {FullName?.value && FullName.value.length > 0 && (
          <span
            className={classNames(
              'z-10 flex w-full items-center justify-center font-roboto-500 ',
              TextColor
            )}
          >
            {getInitialsFromFullName(FullName?.value)}
          </span>
        )}

        {renderImage()}
      </div>
    );
  };

  const renderSummary = () => {
    const renderDuration = () => {
      if (DurationInMins?.value) {
        return (
          <span
            className={classNames({
              // eslint-disable-next-line prettier/prettier
              "md:before:px-2 md:before:content-['\\2022']": formattedDate.length > 0,
            })}
          >
            {DurationInMins.value}
          </span>
        );
      }

      return null;
    };

    return (
      <div className={classNames('flex flex-col gap-2 md:gap-0', TextColor)}>
        <div className="flex w-auto flex-col md:w-80 md:flex-row md:gap-2 lg:w-full">
          <Text
            tag="span"
            className="inline-block overflow-hidden text-ellipsis font-roboto-700 sm:whitespace-nowrap"
            field={FullName}
            title={FullName}
          />
          <Text
            tag="span"
            className="inline-block overflow-hidden text-ellipsis sm:whitespace-nowrap"
            field={Role}
            title={Role}
          />
        </div>
        <div className="flex flex-col md:flex-row">
          <span>{formattedDate}</span>
          {renderDuration()}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-10 flex gap-5">
      {renderProfileImage()}
      {renderSummary()}
    </div>
  );
};
