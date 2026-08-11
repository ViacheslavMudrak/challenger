import { ComponentParams, ComponentRendering, Placeholder } from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import { CardFields, CardProps } from '../Card/Card.types';
import Card from '../Card/Card';
import React, { useCallback } from 'react';
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
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { EmblaCarouselType } from 'embla-carousel';
import { useDotButton, usePrevNextButtons } from './Carousel.emblaHelpers';

export interface CarouselVariant1Props {
  rendering: ComponentRendering & { params: ComponentParams };
}

const CarouselVariant1 = (props: CarouselVariant1Props) => {
  const { isEditMode } = useSitecore();
  const phKey = `carousel-container`;
  const containerStyles = props?.rendering?.params?.Styles || '';
  const uniqueId = props?.rendering?.params?.RenderingIdentifier || '';

  const items = props.rendering;
  const card_component_prefix = 'card';
  const { linkComponent } = useAnalytics(props.rendering);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ]);
  // const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === true ? autoplay.reset : autoplay.stop;

    resetOrStop();
  }, []);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi, onNavButtonClick);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi, onNavButtonClick);

  if (isEditMode) {
    return (
      <div
        className={classNames(
          'carousel-container relative overflow-x-auto',
          'flex w-full gap-5 border-2 border-blue p-5',
          containerStyles
        )}
      >
        <div className={classNames('relative flex w-fit items-center gap-5')}>
          <Placeholder key={phKey} name={phKey} rendering={props.rendering} />
        </div>
      </div>
    );
  }

  if (!items || !items.placeholders) {
    return null;
  }

  const cardItems = items.placeholders[phKey].filter((i: ComponentRendering) =>
    (i.componentName || '').toLowerCase().startsWith(card_component_prefix)
  );
  const cardCount = cardItems.length;

  const renderCardItems = () => {
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
            className="transform-[translate3d(0, 0, 0)] flex w-full min-w-0 flex-shrink-0 flex-grow-0 basis-full justify-center"
          >
            <div
              className={classNames(
                'flex items-center [&_>_div]:h-full [&_>_div]:min-w-[65vw] md:[&_>_div]:min-w-[700px]',
                'xl:w-fit',
                mappedItem.rendering.componentName == 'Card.info7'
                  ? 'xl:[&_>_div]:w-[1020px]'
                  : 'xl:[&_>_div]:h-[480px] xl:[&_>_div]:w-[820px]'
              )}
            >
              <Card rendering={mappedItem.rendering} />
            </div>
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
      className={classNames(
        'relative flex w-full max-w-full flex-col items-center p-5 ',
        { 'border-2 border-blue': isEditMode },
        containerStyles
      )}
    >
      <div className="flex max-w-full justify-center gap-5">
        {cardCount >= 2 && (
          <div className="hidden w-fit items-center justify-center gap-5 xl:flex">
            <IconButton
              type="ArrowLeftIcon"
              bgColor={IconBgColor.Primary}
              iconColor={IconColor.Blue}
              iconSize={IconSize.Md}
              isDisabled={prevBtnDisabled}
              onClick={onPrevButtonClick}
            />
          </div>
        )}
        <div
          id={props.rendering.uid}
          className={'overflow-hidden xl:max-w-[1020px]'}
          ref={emblaRef}
        >
          <div className={'flex max-w-full'} style={{ touchAction: 'pan-y pinch-zoom' }}>
            {renderCardItems()}
          </div>
        </div>
        {cardCount >= 2 && (
          <div className="hidden w-fit items-center justify-center xl:flex">
            <IconButton
              type="ArrowRightIcon"
              bgColor={IconBgColor.Primary}
              iconColor={IconColor.Blue}
              iconSize={IconSize.Md}
              isDisabled={nextBtnDisabled}
              onClick={onNextButtonClick}
            />
          </div>
        )}
      </div>
      {cardCount >= 2 && (
        <div className="mx-auto flex max-w-[1020px] justify-between gap-6 xl:max-w-fit">
          <div className="flex w-fit xl:hidden">
            <IconButton
              type="ArrowLeftIcon"
              bgColor={IconBgColor.Primary}
              iconColor={IconColor.Blue}
              iconSize={IconSize.Md}
              isDisabled={prevBtnDisabled}
              onClick={onPrevButtonClick}
            />
          </div>
          <div className="my-5 flex flex-wrap justify-center gap-2">
            {scrollSnaps.map((_, index: number) => (
              <button
                key={index}
                type="button"
                className={classNames(
                  'flex h-3 w-3 cursor-pointer touch-manipulation appearance-none rounded-lg',
                  index === selectedIndex ? 'bg-blue' : 'bg-light-blue'
                )}
                onClick={() => onDotButtonClick(index)}
              ></button>
            ))}
          </div>
          <div className="flex w-fit xl:hidden">
            <IconButton
              type="ArrowRightIcon"
              bgColor={IconBgColor.Primary}
              iconColor={IconColor.Blue}
              iconSize={IconSize.Md}
              isDisabled={nextBtnDisabled}
              onClick={onNextButtonClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselVariant1;
