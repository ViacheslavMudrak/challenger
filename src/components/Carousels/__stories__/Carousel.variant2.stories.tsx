import type { Meta, StoryFn } from '@storybook/react';
import carouselData from '../mocks/carousel.variant2.json';
import { CarouselBgColor, CarouselVariant, CarouselVariant2Props } from '../Carousel.types';
import CarouselVariant2Base from '../Carousel.variant2.base';

interface ArgTypes {
  variant: string;
  heading: string;
  content: string;
  headingLevel: 'h2' | 'h3' | 'h4';
  bgColor: string;
  cta: { text: string; href: string };
}

const meta = {
  title: 'Components/Carousels/Variant2',
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
    variant: {
      control: { type: 'select' },
      name: 'Carousel variant',
      options: [...Object.keys(CarouselVariant)],
      description: 'carousel variant',
      table: {
        type: { summary: Object.keys(CarouselVariant) },
        defaultValue: { summary: 'None' },
      },
    },
    heading: {
      name: 'Heading',
      control: { type: 'text' },
      description: 'Heading',
    },
    headingLevel: {
      name: 'Heading Level',
      control: { type: 'select' },
      options: ['h2', 'h3', 'h4'],
      description: 'h2, h3, h4',
    },
    content: {
      name: 'Content',
      control: { type: 'text' },
      description: 'Content',
    },
    cta: {
      name: 'Call to action',
      control: { type: 'object' },
      description: 'Call To Action',
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
    variant: CarouselVariant.Default,
    heading: carouselData.rendering.placeholders['carousel-info'][0].fields.Heading.value,
    headingLevel: 'h3',
    content: carouselData.rendering.placeholders['carousel-info'][0].fields.Content.value,
    cta: {
      href: carouselData.rendering.placeholders['carousel-info'][0].fields.Link.value.href,
      text: carouselData.rendering.placeholders['carousel-info'][0].fields.Link.value.text,
    },
    bgColor: 'None',
  },
} satisfies Meta<ArgTypes>;

export default meta;

export const Default: StoryFn<ArgTypes> = (args: ArgTypes) => {
  carouselData.rendering.variant = args.variant;

  const info = carouselData.rendering.placeholders['carousel-info'][0];

  info.fields.Heading.value = args.heading;
  info.fields.Content.value = args.content;
  info.fields.Link.value.text = args.cta.text;

  carouselData.rendering.params.Styles = args.bgColor;

  const data = carouselData as unknown as CarouselVariant2Props;

  return (
    <div className="flex w-full flex-col gap-3 p-5">
      <CarouselVariant2Base rendering={data.rendering}></CarouselVariant2Base>
    </div>
  );
};
