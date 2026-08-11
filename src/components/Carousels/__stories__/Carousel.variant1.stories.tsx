import type { ArgTypes, Meta } from '@storybook/react';
import Carousel, { CarouselVariant1Props } from '../Carousel.variant1';
import carouselData from '../mocks/carousel.variant1.json';

const meta = {
  title: 'Components/Carousels/Variant1',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Carousel description coming soon',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<ArgTypes>;

export default meta;

export const Default = () => {
  const data = carouselData as unknown as CarouselVariant1Props;

  return (
    <div className="flex w-full flex-col gap-3 p-10">
      <Carousel rendering={data.rendering}></Carousel>
    </div>
  );
};
