import type { Meta, StoryFn } from '@storybook/react';
import CardInfoMockedData1 from '../mocks/card.info7_1.json';
import CardInfoMockedData2 from '../mocks/card.info7_2.json';
import classNames from 'classnames';
import Card from '../Card';
import { HeadingType } from '../Card.types';

interface ArgTypes {
  heading: string;
  content: string;
  headingLevel: HeadingType;
  showSampleCards: boolean;
  withShadow: boolean;
  image: string;
  cta: {
    text: string;
    href: string;
  };
}

const meta = {
  id: 'Card.info7',
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
    content: {
      name: 'Content',
      control: { type: 'text' },
      description: 'Content',
    },
    showSampleCards: {
      name: 'Show sample cards',
      control: { type: 'boolean' },
    },
    image: {
      name: 'Image',
      control: { type: 'select' },
      options: [
        'none',
        'sample1.jpg',
        'sample2.jpg',
        'sample3.jpg',
        'sample4.jpg',
        'profile1.jpg',
        'profile2.jpg',
      ],
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
    content: CardInfoMockedData1.rendering.fields.Content.value,
    cta: {
      text: 'Learn more',
      href: '/test',
    },
    withShadow: true,
    image: 'sample1.jpg',
    showSampleCards: false,
    headingLevel: 'h3',
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
  data.rendering.fields.Content.value = args.content;
  data.rendering.fields.CardImage.value.src = args.image;

  if (data.rendering.fields.HeadingLevel) {
    data.rendering.fields.HeadingLevel.fields.Level.value = args.headingLevel;
  }

  if (data.rendering.fields.WithShadow) {
    data.rendering.fields.WithShadow.value = args.withShadow;
  }

  const data2 = CardInfoMockedData2;

  data2.rendering.fields.WithShadow.value = args.withShadow;

  return (
    <div className="flex w-full items-stretch justify-center gap-3 p-6 xl:p-14">
      <div className={classNames('flex w-full flex-col justify-center gap-5 lg:flex-row lg:p-5')}>
        <Card rendering={data.rendering} />
        {args.showSampleCards && (
          <>
            <Card rendering={data2.rendering} />
          </>
        )}
      </div>
    </div>
  );
};

Default.storyName = 'Landscape image card with shards';
