import type { Meta, StoryFn } from '@storybook/react';
import carouselData from '../mocks/carousel.variant4.json';
import { CarouselBgColor } from '../Carousel.types';
import CarouselVariant4, { CarouselVariant4Props } from '../Carousel.variant4';

interface ArgTypes {
  bgColor: string;
}

const meta = {
  title: 'Components/Carousels/Variant4',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Carousel description coming soon',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    bgColor: {
      control: { type: 'select' },
      name: 'Background colour',
      options: [...Object.values(CarouselBgColor)],
      description: 'carousel background colour',
      table: {
        type: { summary: Object.keys(CarouselBgColor) },
        defaultValue: { summary: 'None' },
      },
    },
  },
  args: {
    bgColor: 'None',
  },
} satisfies Meta<ArgTypes>;

export default meta;

export const Default: StoryFn<ArgTypes> = (args: ArgTypes) => {
  const data = carouselData as unknown as CarouselVariant4Props;

  data.rendering.params.Styles = args.bgColor;

  return (
    <div className="flex w-full flex-col gap-3 p-5">
      <CarouselVariant4 rendering={data.rendering}></CarouselVariant4>
    </div>
  );
};
