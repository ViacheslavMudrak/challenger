import type { Meta, StoryFn } from '@storybook/react';
import CarouselVariant3, { CarouselVariant3Props } from '../Carousel.variant3';
import carouselData from '../mocks/carousel.variant3.json';
import { CarouselBgColor } from '../Carousel.types';

interface ArgTypes {
  content: string;
  bgColor: string;
}

const meta = {
  title: 'Components/Carousels/Variant3',
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
    content: {
      name: 'Content',
      control: { type: 'text' },
      description: 'Content',
    },
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
    content: carouselData.rendering.placeholders['carousel-info'][0].fields.Text.value,
    bgColor: 'None',
  },
} satisfies Meta<ArgTypes>;

export default meta;

export const Default: StoryFn<ArgTypes> = (args: ArgTypes) => {
  const data = carouselData as unknown as CarouselVariant3Props;

  carouselData.rendering.placeholders['carousel-info'][0].fields.Text.value = args.content;

  data.rendering.params.Styles = args.bgColor;
  data.rendering.params.Styles = args.bgColor.toString();

  return (
    <div className="flex w-full flex-col gap-3">
      <CarouselVariant3 rendering={data.rendering}></CarouselVariant3>
    </div>
  );
};
