import React from 'react';
import CarouselVariant2Base from './Carousel.variant2.base';
import { CarouselVariant, CarouselVariant2Props } from './Carousel.types';

export const Default = (props: CarouselVariant2Props) => {
  props.rendering.variant = CarouselVariant.Default;

  return <CarouselVariant2Base {...props} />;
};

export const CarouselBlue = (props: CarouselVariant2Props) => {
  props.rendering.variant = CarouselVariant.CarouselBlue;

  return <CarouselVariant2Base {...props} />;
};

export const CarouselGreen = (props: CarouselVariant2Props) => {
  props.rendering.variant = CarouselVariant.CarouselGreen;

  return <CarouselVariant2Base {...props} />;
};
