import {
  ComponentParams,
  Field,
  ImageField,
  Link,
  LinkField,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import { useSitecore } from 'lib/challenger/useSitecore';
import { useEffect, useRef, useState } from 'react';

export interface RotatingLineofAwardsProps {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  rendering: { fields: Record<string, Field<any>>; params: ComponentParams };
}

const RotatingLineofAwards = (props: RotatingLineofAwardsProps) => {
  const { fields } = props?.rendering;
  const { isEditMode } = useSitecore();
  const tickerContainerRef = useRef<HTMLDivElement>(null);
  const [cssValues, setCSSValues] = useState({ animationDuration: 90, clientWidth: 0 });
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const speedObj = props?.rendering?.fields['Speed Limit'] as unknown as any;
  const speed = speedObj?.name;
  const ANIMATION_DURATION_PER_IMAGE = speed === 'Slow' ? 6 : speed === 'Fast' ? 2 : 4;
  const NUMBER_OF_IMAGES = 10;

  const images: Array<ImageField> = [
    fields['Image 1'],
    fields['Image 2'],
    fields['Image 3'],
    fields['Image 4'],
    fields['Image 5'],
    fields['Image 6'],
    fields['Image 7'],
    fields['Image 8'],
    fields['Image 9'],
    fields['Image 10'],
  ];
  const links: Array<LinkField> = [
    fields['Link 1'],
    fields['Link 2'],
    fields['Link 3'],
    fields['Link 4'],
    fields['Link 5'],
    fields['Link 6'],
    fields['Link 7'],
    fields['Link 8'],
    fields['Link 9'],
    fields['Link 10'],
  ];

  const getImagesCount = () => {
    let count = 0;
    images.forEach((img) => {
      if (img?.value?.src && img?.value?.src != '') count++;
    });
    return count;
  };

  const imagesCount = getImagesCount();

  useEffect(() => {
    if (isEditMode) return;

    setTimeout(() => {
      if (tickerContainerRef?.current) {
        setCSSValues({
          animationDuration: imagesCount * ANIMATION_DURATION_PER_IMAGE,
          clientWidth: tickerContainerRef.current.clientWidth,
        });
      }
    }, 100);
  }, []);

  const renderForPageEditor = () => {
    const elements = [];
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tempFields = fields as Record<string, Field<any>>;
    for (let index = 1; index <= NUMBER_OF_IMAGES; index++) {
      const imageField = tempFields[`Image ${index}`];
      const linkField = tempFields[`Link ${index}`];
      elements.push(
        <div className="m-4 min-w-[100px]">
          <div className="mb-4 max-h-[290px] max-w-[200px]">
            <NextImage
              className={`h-auto max-h-[290px] w-auto max-w-[200px] object-cover`}
              field={imageField}
              height={300}
              width={200}
            />
          </div>
          <Link field={linkField} />
        </div>
      );
    }
    return elements;
  };

  if (isEditMode) {
    return (
      <div className="p-5">
        <div className="flex flex-shrink-0 flex-grow gap-x-4 overflow-auto ">
          {renderForPageEditor()}
        </div>
      </div>
    );
  }

  const renderImageWithLink = (key: string) => {
    return images.map((img, i) => {
      if (!img?.value?.src) return <></>;
      if (links[i]?.value?.href && links[i]?.value?.href !== 'https://')
        return (
          <div className="flex flex-shrink-0 flex-grow p-4" key={key + i}>
            <Link field={links[i]}>
              <NextImage
                className={`h-auto max-h-[290px] w-auto max-w-[200px] object-cover`}
                field={img}
                height={300}
                width={200}
              />
            </Link>
          </div>
        );
      return (
        <div className="flex flex-shrink-0 flex-grow p-4" key={key + i}>
          <NextImage
            className={`h-auto max-h-[290px] w-auto max-w-[200px] object-cover`}
            field={img}
            height={300}
            width={200}
          />
        </div>
      );
    });
  };

  return (
    <div className="relative w-full overflow-hidden py-10">
      <div
        className="tickerContainer relative flex w-full gap-x-4 overflow-hidden py-10"
        ref={tickerContainerRef}
      >
        <div
          className="tickerContent my-4 flex flex-grow flex-nowrap items-center gap-x-4 will-change-transform"
          style={
            {
              '--client-width': `${cssValues.clientWidth}px`,
              '--animation-duration': `${cssValues.animationDuration}s`,
            } as React.CSSProperties
          }
        >
          {renderImageWithLink('imageSet1')}
        </div>
        <div
          className="tickerContent flex flex-grow flex-nowrap items-center gap-x-4 will-change-transform"
          style={
            {
              '--client-width': `${cssValues.clientWidth}px`,
              '--animation-duration': `${cssValues.animationDuration}s`,
            } as React.CSSProperties
          }
        >
          {renderImageWithLink('imageSet2')}
        </div>
      </div>
    </div>
  );
};

export default RotatingLineofAwards;
