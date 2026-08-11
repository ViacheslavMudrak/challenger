import {
  ComponentParams,
  ComponentRendering,
  Field,
  Placeholder,
  Text,
} from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import { CardFields, CardProps, HeadingType } from '../Card/Card.types';
import React, { useEffect, useRef, useState } from 'react';
import { CardInfo1Fields } from '../Card/Card.info1';
import { CardInfo4Fields } from '../Card/Card.info4';
import { CardInfo8Fields } from '../Card/Card.info8';
import { CardInfo9Fields } from '../Card/Card.info9';
import { CardInfo10Fields } from '../Card/Card.info10';
import { CardInfo13Fields } from '../Card/Card.info13';
import { CardInfo14Fields } from '../Card/Card.info14';
import { useAnalytics, useSitecore } from 'lib/challenger/hooks';
import IconButton from 'components/IconButton/IconButton';
import { IconBgColor } from 'components/IconButton/IconButton.types';
import { IconColor, IconSize } from 'components/Icons/icon.types';
import Card from 'components/Card/Card';

export type CarouselVariant4Fields = {
  Heading?: Field<string>;
  HeadingLevel?: {
    fields: {
      Level: Field<string>;
    };
  };
};

export interface CarouselVariant4Props {
  rendering: ComponentRendering & { params: ComponentParams } & {
    fields: CarouselVariant4Fields;
  };
}

const CarouselVariant4 = (props: CarouselVariant4Props) => {
  const { isEditMode } = useSitecore();
  const phKeyList = `carousel-container-2`;
  const cardWidth = 290;
  const containerStyles = props?.rendering?.params?.Styles || '';
  const uniqueId = props?.rendering?.params?.RenderingIdentifier || '';
  const { Heading, HeadingLevel } = props.rendering.fields;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [disableScroll, setDisableScroll] = useState<boolean>(false);
  const CustomHeading = (HeadingLevel?.fields?.Level?.value as HeadingType) || 'h3';
  const { linkComponent } = useAnalytics(props.rendering);

  const card_component_prefix = 'card';
  const items = props.rendering;

  const cardWrapper = useRef<HTMLDivElement>(null);
  const leftValues = useRef<number[]>([]);

  useEffect(() => {
    if (isEditMode || outerWidth < 1200 || cardWrapper?.current == null) return;
    leftValues.current = Array.from(cardWrapper.current.children)?.map(
      (el) => (el as HTMLElement)?.offsetLeft
    );
  }, []);

  if (!items || !items.placeholders) {
    return null;
  }

  const cardItems = items.placeholders[phKeyList].filter((i: ComponentRendering) =>
    (i.componentName || '').toLowerCase().startsWith(card_component_prefix)
  );
  const cardCount = cardItems.length;

  const handleBack = () => {
    if (currentIndex <= 0) {
      return;
    }

    const container = document.getElementById(props.rendering.uid || '');
    setDisableScroll(false);

    if (container) {
      container?.scrollTo({
        left:
          currentIndex <= leftValues.current?.length
            ? leftValues.current[currentIndex - 1]
            : cardWidth * (currentIndex - 1),
        behavior: 'smooth',
      });
    }

    setCurrentIndex((prevCurrentIdx) => prevCurrentIdx - 1);
  };

  const handleNext = () => {
    if (currentIndex >= cardItems.length - 1) {
      return;
    }

    const container = document.getElementById(props.rendering.uid || '');

    if (container) {
      const pos =
        currentIndex < leftValues.current?.length - 1
          ? leftValues.current[currentIndex + 1]
          : cardWidth * (currentIndex + 1);
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      setDisableScroll(pos > maxScrollLeft);
      container?.scrollTo({ left: pos, behavior: 'smooth' });
    }

    setCurrentIndex((prevCurrentIdx) => prevCurrentIdx + 1);
  };

  const renderCardItems = () => {
    if (isEditMode) {
      return <Placeholder name={phKeyList} rendering={props.rendering} />;
    }

    if (cardItems && cardCount > 0) {
      const endIdx = cardItems.length;

      return cardItems.slice(0, endIdx).map((item) => {
        const mappedItem = {
          rendering: item,
        } as CardProps<
          | CardFields
          | CardInfo1Fields
          | CardInfo4Fields
          | CardInfo8Fields
          | CardInfo9Fields
          | CardInfo10Fields
          | CardInfo13Fields
          | CardInfo14Fields
        >;

        return (
          <div
            id={mappedItem.rendering.uid}
            key={mappedItem.rendering.uid}
            className="flex w-[270px] lg:w-auto"
          >
            <Card rendering={mappedItem.rendering} />
          </div>
        );
      });
    }

    return null;
  };

  const renderBackground = () => {
    return (
      <>
        <div
          className={classNames(
            'absolute z-10 h-full w-full lg:z-[15]',
            'bg-light-blue',
            'lg:clip-path-polygon-[95%_10.4%,87%_91%,100%_11%]',
            'clip-path-polygon-[0_0,100%_14%,100%_94%,0%_100%]'
          )}
        ></div>
        <div
          className={classNames(
            'absolute z-[15] h-full w-full lg:z-10',
            'from-bright-navy to-blue bg-gradient-80',
            'lg:clip-path-polygon-[0_0,100%_11%,87%_91%,0%_100%]',
            'clip-path-polygon-[0_0,100%_7%,100%_93%,0_93%]'
          )}
        ></div>
      </>
    );
  };

  return (
    <div
      id={uniqueId}
      link_component={linkComponent}
      className={classNames(
        'relative flex w-full flex-col gap-5 lg:min-h-[550px] lg:flex-row',
        containerStyles
      )}
    >
      <div className="absolute z-10 h-[505px] w-full lg:h-full lg:w-[815px]">
        {renderBackground()}
      </div>
      <div className="z-20 flex w-full flex-col items-start justify-center gap-7 p-5 lg:w-full lg:pl-[410px]">
        <div className="mt-9 flex w-full gap-2">
          <CustomHeading
            className={classNames(
              'line-clamp-1 overflow-hidden text-ellipsis font-roboto-700 text-3xl text-white lg:w-[245px]'
            )}
          >
            <Text field={Heading} />
          </CustomHeading>
          {!isEditMode && cardCount >= 2 && (
            <div className="hidden w-fit items-start justify-start gap-5 xl:flex">
              <IconButton
                type="ArrowLeftIcon"
                bgColor={IconBgColor.Primary}
                iconColor={IconColor.Blue}
                iconSize={IconSize.Sm}
                isDisabled={currentIndex <= 0}
                onClick={handleBack}
              />
              <IconButton
                type="ArrowRightIcon"
                bgColor={IconBgColor.Primary}
                iconColor={IconColor.Blue}
                iconSize={IconSize.Sm}
                isDisabled={disableScroll}
                onClick={handleNext}
              />
            </div>
          )}
        </div>
        <div
          id={props.rendering.uid}
          className={classNames('relative flex w-full items-start overflow-x-auto', {
            'xl:overflow-hidden': !isEditMode,
          })}
        >
          <div className={classNames('relative flex h-full w-fit gap-5')} ref={cardWrapper}>
            {renderCardItems()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselVariant4;
