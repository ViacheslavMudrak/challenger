import type { Meta, StoryFn } from '@storybook/react';
import CardInfoMockedData1 from '../mocks/card.info5_1.json';
import CardInfoMockedData2 from '../mocks/card.info5_2.json';
import CardInfoMockedData3 from '../mocks/card.info5_3.json';
import classNames from 'classnames';
import Card from '../Card';
import { CardSize, HeadingType } from '../Card.types';

interface ArgTypes {
  heading: string;
  headingLevel: HeadingType;
  size: CardSize;
  showSampleCards: boolean;
  withShadow: boolean;
  backgroundColor: 'white' | 'gray' | 'none';
  image: string;
  cta: {
    text: string;
    href: string;
  };
}

const meta = {
  id: 'Card.info5',
  title: 'Components/Cards',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Cards or simple content box, used to divide content elements on page.',
      },
    },
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
    showSampleCards: {
      name: 'Show sample cards',
      control: { type: 'boolean' },
    },
    image: {
      name: 'Image',
      control: { type: 'select' },
      options: ['clipart1.png', 'clipart2.png'],
    },
    backgroundColor: {
      name: 'Card background colour',
      control: { type: 'radio' },
      options: ['white', 'gray', 'none'],
    },
    cta: {
      name: 'Call to action',
      control: { type: 'object' },
    },
    withShadow: {
      name: 'With shadow',
      control: { type: 'boolean' },
    },
  },
  args: {
    heading: CardInfoMockedData1.rendering.fields.Heading.value,
    cta: {
      text: 'Learn more',
      href: '/test',
    },
    withShadow: false,
    image: 'clipart1.png',
    showSampleCards: true,
    headingLevel: 'h3',
    backgroundColor: 'none',
    size: (CardInfoMockedData1.rendering.fields.Size.fields.Size.value as CardSize) || 'md',
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
  data.rendering.fields.Size.fields.Size.value = args.size;
  data.rendering.fields.CardImage.value.src = args.image;
  data.rendering.fields.BackgroundColor.value = args.backgroundColor;

  if (data.rendering.fields.HeadingLevel) {
    data.rendering.fields.HeadingLevel.fields.Level.value = args.headingLevel;
  }

  if (data.rendering.fields.BackgroundColor) {
    data.rendering.fields.BackgroundColor.fields.Color.value = args.backgroundColor;
  }

  if (data.rendering.fields.WithShadow) {
    data.rendering.fields.WithShadow.value = args.withShadow;
  }

  const data2 = CardInfoMockedData2;
  const data3 = CardInfoMockedData3;

  data2.rendering.fields.WithShadow.value = args.withShadow;
  data2.rendering.fields.Size.fields.Size.value = args.size;

  data3.rendering.fields.WithShadow.value = args.withShadow;
  data3.rendering.fields.Size.fields.Size.value = args.size;

  return (
    <div className="flex w-full items-stretch justify-center gap-3 p-14">
      <div
        className={classNames(
          'flex w-full flex-col justify-center gap-5 bg-grey-light lg:flex-row lg:p-5'
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

Default.storyName = 'Clipart card';
