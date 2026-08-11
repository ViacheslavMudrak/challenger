import type { Meta, StoryFn } from '@storybook/react';
import CardInfoMockedData1 from '../mocks/card.info3_1.json';
import CardInfoMockedData2 from '../mocks/card.info3_2.json';
import CardInfoMockedData3 from '../mocks/card.info3_3.json';
import CardInfoMockedData4 from '../mocks/card.info3_4.json';
import classNames from 'classnames';
import Card from '../Card';
import { CardSize } from '../Card.types';
import { HeadingLevel } from 'components/Banner/Banner.types';

interface ArgTypes {
  heading: string;
  content: string;
  headingLevel: HeadingLevel;
  size: CardSize;
  bgColour: 'white' | 'gray' | 'blue';
  showSampleCards: boolean;
  alignment: 'left' | 'center';
  withShadow: boolean;
}

const meta = {
  id: 'Card.info3',
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
    size: {
      name: 'Card size',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'full'],
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
    bgColour: 'white',
    withShadow: true,
    showSampleCards: true,
    headingLevel: 'h3',
    alignment: 'left',
    size: (CardInfoMockedData1.rendering.fields.Size.fields.Size.value as CardSize) || 'md',
  },
} satisfies Meta<ArgTypes>;

export default meta;

export const Default: StoryFn<ArgTypes> = (args: ArgTypes) => {
  const data = CardInfoMockedData1;

  data.rendering.fields.Heading.value = args.heading;
  data.rendering.fields.Content.value = args.content;
  data.rendering.fields.Size.fields.Size.value = args.size;
  data.rendering.fields.Alignment.fields.Alignment.value = args.alignment;

  if (data.rendering.fields.HeadingLevel) {
    data.rendering.fields.HeadingLevel.fields.Level.value = args.headingLevel;
  }

  if (data.rendering.fields.WithShadow) {
    data.rendering.fields.WithShadow.value = args.withShadow;
  }

  const data2 = CardInfoMockedData2;
  const data3 = CardInfoMockedData3;
  const data4 = CardInfoMockedData4;

  data2.rendering.fields.WithShadow.value = args.withShadow;
  data2.rendering.fields.Size.fields.Size.value = args.size;
  data2.rendering.fields.Alignment.fields.Alignment.value = args.alignment;

  data3.rendering.fields.WithShadow.value = args.withShadow;
  data3.rendering.fields.Size.fields.Size.value = args.size;
  data3.rendering.fields.Alignment.fields.Alignment.value = args.alignment;

  data4.rendering.fields.WithShadow.value = args.withShadow;
  data4.rendering.fields.Size.fields.Size.value = args.size;
  data4.rendering.fields.Alignment.fields.Alignment.value = args.alignment;

  return (
    <div className="flex w-full items-stretch justify-center gap-3 p-14">
      <div className={classNames('flex w-full flex-col justify-center gap-5 lg:flex-row lg:p-5')}>
        <Card rendering={data.rendering} />
        {args.showSampleCards && (
          <>
            <Card rendering={data2.rendering} />
            <Card rendering={data3.rendering} />
            <Card rendering={data4.rendering} />
          </>
        )}
      </div>
    </div>
  );
};

Default.storyName = 'Text card with shards';
