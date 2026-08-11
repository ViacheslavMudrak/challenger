import { NextImage as JssImage, ImageField, NextImage } from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import { useSitecore } from 'lib/challenger/hooks';

export interface CardBaseImageProps {
  image: ImageField;
  className?: string;
}

const CardBaseImage = (props: CardBaseImageProps): React.JSX.Element => {
  const { image, className = '' } = props;
  const { isEditMode } = useSitecore();

  if (!image) {
    return <></>;
  }

  const renderImage = () => {
    if (isEditMode) {
      return (
        <JssImage field={image} width={100} height={100} className="h-full w-full object-cover" />
      );
    }

    if (image.value?.src) {
      const altText = image.value?.alt || '';

      return (
        <NextImage
          field={image}
          alt={altText as string}
          width={100}
          height={100}
          quality={100}
          unoptimized={true}
          className={`h-full w-full object-cover ${className}`}
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

export default CardBaseImage;
