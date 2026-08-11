import { ComponentParams, ComponentRendering, Placeholder } from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import { CardFields, CardProps } from '../Card/Card.types';
import Card from '../Card/Card';
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

export interface CarouselVariant3Props {
  rendering: ComponentRendering & { params: ComponentParams };
}

const CarouselVariant3 = (props: CarouselVariant3Props) => {
  const { isEditMode } = useSitecore();
  const phKeyList = `carousel-container-2`;
  const phKeyInfo = `carousel-info`;
  const cardWidth = 290;
  const containerStyles = props?.rendering?.params?.Styles || '';
  const uniqueId = props?.rendering?.params?.RenderingIdentifier || '';
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [disableScroll, setDisableScroll] = useState<boolean>(false);
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

  const renderCarouselInfo = () => {
    return (
      <div
        className={classNames(
          '[&_h2]:text-white [&_h3]:text-white [&_h4]:text-white',
          '[&_p]:mb-2 [&_p]:leading-[1.3] [&_p]:text-white [&_span]:text-white'
        )}
      >
        <Placeholder name={phKeyInfo} rendering={props.rendering} />
      </div>
    );
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
            className={classNames('flex w-[270px] lg:w-auto')}
          >
            <Card rendering={mappedItem.rendering} />
          </div>
        );
      });
    }

    return null;
  };

  return (
    <div
      id={uniqueId}
      link_component={linkComponent}
      className={classNames('relative flex w-full flex-col lg:min-h-[550px]', containerStyles)}
    >
      <div
        className={classNames(
          'relative top-[1px] h-[70px] w-full lg:z-[15] lg:h-[90px]',
          'bg-gradient-to-r from-bright-navy to-blue',
          'lg:clip-path-polygon-[75%_0,0%_100%,100%_100%]',
          'clip-path-polygon-[43%_0%,100%_82%,100%_100%,0_100%,0_25%]'
        )}
      ></div>
      <div className="relative flex w-full flex-col bg-gradient-to-r from-bright-navy to-blue lg:min-h-[580px] lg:flex-row">
        <div className="z-20 flex w-full flex-col justify-center px-7 pt-0 lg:mx-24 lg:my-5 lg:w-[500px] lg:px-0">
          {renderCarouselInfo()}
        </div>
        <div className="z-20 flex w-full flex-col items-start justify-center gap-7 p-5 lg:w-[calc(100%-710px)]">
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
      </div>
      <div
        className={classNames(
          'relative h-12 w-full lg:h-[82px]',
          'bg-gradient-to-r from-bright-navy to-blue',
          'lg:clip-path-polygon-[84%_100%,0_0,100%_0]',
          'clip-path-polygon-[100%_0,100%_60%,87%_100%,0_59%,0_0]'
        )}
      ></div>
    </div>
  );
};

export default CarouselVariant3;
