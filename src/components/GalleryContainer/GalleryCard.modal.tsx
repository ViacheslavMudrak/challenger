import IconButton from 'components/IconButton/IconButton';
import { IconColor, IconSize } from 'components/Icons/icon.types';
import classNames from 'classnames';
import { MutableRefObject, useEffect, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import {
  ImageField,
  NextImage,
  RichText,
  RichTextField,
  Text,
  TextField,
} from '@sitecore-content-sdk/nextjs';

interface GalleryCardModalProps {
  Heading?: TextField;
  Content?: RichTextField;
  Image: ImageField;
  onClose: () => void;
}

const GalleryCardModal = (props: GalleryCardModalProps) => {
  const { onClose, Heading, Content, Image } = props;
  const ref = useRef(null) as unknown as MutableRefObject<HTMLDivElement>;
  const imageWrapperRef = useRef(null) as unknown as MutableRefObject<HTMLDivElement>;
  const contentWrapperRef = useRef(null) as unknown as MutableRefObject<HTMLDivElement>;
  const isImageOnly = !(Heading?.value || Content?.value);

  useEffect(() => {
    if (Image?.value?.src && contentWrapperRef.current && imageWrapperRef.current) {
      contentWrapperRef.current.style.maxWidth = imageWrapperRef.current.offsetWidth + 'px';
    }
  }, []);

  useOnClickOutside(ref, () => {
    onClose();
  });

  const handleClick = () => {
    onClose();
  };

  const renderImage = () => {
    if (Image.value?.src) {
      const altText = Image.value?.alt || '';

      return (
        <NextImage
          field={Image}
          alt={altText as string}
          width={100}
          height={100}
          quality={100}
          unoptimized={true}
          className={`h-full w-full object-cover ${isImageOnly ? 'xl:max-h-[calc(80vh-96px)]' : ''}`}
          onError={(event) => ((event.target as HTMLImageElement).style.display = 'none')}
        />
      );
    }

    return <></>;
  };

  return (
    <div
      link_component="modal"
      className={classNames(
        'fixed left-0 top-0 z-[90] flex h-screen w-full flex-col px-6',
        'items-center justify-between overflow-y-auto text-left',
        'bg-black-25'
      )}
    >
      <div
        ref={ref}
        className="relative m-auto overflow-y-hidden rounded-md bg-white p-5 xl:h-auto xl:max-h-[80vh] xl:max-w-[80vw] xl:px-8 xl:py-8"
      >
        <div className="mr-[-8px] flex justify-end [&>button]:w-auto">
          <IconButton
            type="CloseIcon"
            iconColor={IconColor.Navy}
            iconSize={IconSize.Lg}
            onClick={handleClick}
          />
        </div>
        <div
          className={`gallery-modal flex h-full max-h-[calc(90vh-75px)] w-full flex-col items-start gap-4 overflow-y-auto xl:max-h-[calc(80vh-96px)] ${isImageOnly ? '' : 'xl:pr-4'}`}
        >
          {Image?.value?.src && <div ref={imageWrapperRef}>{renderImage()}</div>}
          <div
            ref={contentWrapperRef}
            className="flex min-w-[250px] flex-col gap-4 md:min-w-[350px] [&:empty]:hidden"
          >
            {Heading?.value && (
              <div className={`flex w-full  `}>
                <h3 className="min-h-[32px] font-roboto-700 text-2xl text-blue">
                  <Text field={Heading}></Text>
                </h3>
              </div>
            )}

            {Content?.value && (
              <div className="flex w-full flex-col items-start ">
                <RichText field={Content} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryCardModal;
