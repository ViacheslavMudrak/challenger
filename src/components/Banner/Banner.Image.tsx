import classNames from 'classnames';
import { NextImage, ImageField } from '@sitecore-content-sdk/nextjs';

interface BannerImageProps {
  className?: string;
  image?: ImageField;
}

const BannerComponentImage = (props: BannerImageProps) => {
  const { image, className } = props;

  if (!image) {
    return null;
  }

  const renderImage = () => {
    if (image.value?.src) {
      const altText = image.value?.alt ?? '';

      return (
        <NextImage
          field={image}
          alt={altText as string}
          unoptimized={true}
          className="h-full w-full object-cover"
          onError={(event) => ((event.target as HTMLImageElement).style.display = 'none')}
        />
      );
    }
    return <></>;
  };

  return (
    <div
      className={classNames(
        className,
        'banner-image',
        'absolute h-full w-full bg-grey',
        'bg-[url("/challenger_logo_white.svg")] bg-no-repeat',
        'object-cover',
        'bg-center'
      )}
    >
      {renderImage()}
    </div>
  );
};

export default BannerComponentImage;
