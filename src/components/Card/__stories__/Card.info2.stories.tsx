import type { Meta, StoryFn } from '@storybook/react';
import CardInfoMockedData1 from '../mocks/card.info2_1.json';
import CardInfoMockedData2 from '../mocks/card.info2_2.json';
import CardInfoMockedData3 from '../mocks/card.info2_3.json';
import classNames from 'classnames';
import Card from '../Card';
import { CardSize, HeadingType } from '../Card.types';

interface ArgTypes {
  heading: string;
  content: string;
  subHeading: string;
  cta: { text: string; href: string };
  headingLevel: HeadingType;
  size: CardSize;
  bgColour: 'white' | 'gray' | 'blue';
  showSampleCards: boolean;
  alignment: 'left' | 'center';
  withShadow: boolean;
  borderTopColor: string;
}

const meta = {
  id: 'Card.info2',
  title: 'Components/Cards',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
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
    subHeading: {
      name: 'Sub Heading',
      control: { type: 'text' },
      description: 'Sub Heading',
    },
    size: {
      name: 'Card size',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    borderTopColor: {
      name: 'Border Top Colour',
      control: { type: 'select' },
      options: ['teal', 'blue', 'navy', 'none'],
    },
    alignment: {
      name: 'Horizontal alignment',
      control: { type: 'radio' },
      options: ['left', 'center'],
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
    bgColour: {
      name: 'Background colour',
      control: { type: 'select' },
      options: ['none', 'white', 'gray', 'blue'],
    },
    showSampleCards: {
      name: 'Show sample cards',
      control: { type: 'boolean' },
    },
    withShadow: {
      name: 'With shadow',
      control: { type: 'boolean' },
    },
  },
  args: {
    heading: CardInfoMockedData1.rendering.fields.Heading.value,
    content: CardInfoMockedData1.rendering.fields.Content.value,
    subHeading: '',
    withShadow: true,
    showSampleCards: true,
    borderTopColor: 'blue',
    headingLevel: 'h3',
    alignment: 'left',
    size: (CardInfoMockedData1.rendering.fields.Size.fields.Size.value as CardSize) || 'md',
    cta: {
      text: 'Learn more',
      href: '/test',
    },
  },
} satisfies Meta<ArgTypes>;

export default meta;

export const Default: StoryFn<ArgTypes> = (args: ArgTypes) => {
  const strData = JSON.stringify(CardInfoMockedData1);
  const data = JSON.parse(strData);

  if (args.cta && args.cta.href) {
    data.rendering.fields.Link.value.text = args.cta?.text || '';
    data.rendering.fields.Link.value.href = args.cta?.href || '';
  } else {
    data.rendering.fields.Link = null;
  }

  data.rendering.fields.Heading.value = args.heading;
  data.rendering.fields.SubHeading.value = args.subHeading;
  data.rendering.fields.Content.value = args.content;
  data.rendering.fields.Size.fields.Size.value = args.size;
  data.rendering.fields.Alignment.fields.Alignment.value = args.alignment;
  data.rendering.fields.BorderTopColor.fields.Color.value = args.borderTopColor;

  if (data.rendering.fields.HeadingLevel) {
    data.rendering.fields.HeadingLevel.fields.Level.value = args.headingLevel;
  }

  if (data.rendering.fields.WithShadow) {
    data.rendering.fields.WithShadow.value = args.withShadow;
  }

  const data2 = CardInfoMockedData2;
  const data3 = CardInfoMockedData3;

  data2.rendering.fields.WithShadow.value = args.withShadow;
  data2.rendering.fields.Size.fields.Size.value = args.size;
  data2.rendering.fields.Alignment.fields.Alignment.value = args.alignment;

  data3.rendering.fields.WithShadow.value = args.withShadow;
  data3.rendering.fields.Size.fields.Size.value = args.size;
  data3.rendering.fields.Alignment.fields.Alignment.value = args.alignment;

  return (
    <div className="flex w-full flex-col items-stretch justify-center gap-3 p-14 lg:flex-row">
      <div
        className={classNames(
          'flex w-full flex-col justify-center gap-5 p-5 lg:flex-row',
          { 'bg-white': args.bgColour === 'white' },
          { 'bg-grey-light': args.bgColour === 'gray' },
          { 'bg-deep-blue': args.bgColour === 'blue' }
        )}
      >
        <Card rendering={data.rendering} />
        {args.showSampleCards && (
          <>
            <Card rendering={data2.rendering} />
            <Card rendering={data3.rendering} />
          </>
        )}
      </div>
    </div>
  );
};

Default.storyName = 'Text card';
