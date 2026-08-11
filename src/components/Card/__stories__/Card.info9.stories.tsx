import type { Meta, StoryFn } from '@storybook/react';
import CardInfoMockedData1 from '../mocks/card.info9_1.json';
import CardInfoMockedData2 from '../mocks/card.info9_2.json';
import CardInfoMockedData3 from '../mocks/card.info9_3.json';
import classNames from 'classnames';
import Card from '../Card';
import { HeadingType } from '../Card.types';
import dayjs from 'dayjs';

interface ArgTypes {
  heading: string;
  content: string;
  headingLevel: HeadingType;
  showSampleCards: boolean;
  withShadow: boolean;
  publishedDate?: Date;
  badge?: string;
  readInMins: string;
  cta: {
    text: string;
    href: string;
  };
}

const meta = {
  id: 'Card.info9',
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
    publishedDate: {
      name: 'Published date',
      control: { type: 'date' },
    },
    readInMins: {
      name: 'Read in minutes',
      control: { type: 'text' },
    },
    badge: {
      name: 'Badge',
      control: { type: 'text' },
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
    readInMins: CardInfoMockedData1.rendering.fields.ReadInMins.value,
    badge: CardInfoMockedData1.rendering.fields.Badge.value,
    publishedDate: new Date(CardInfoMockedData1.rendering.fields.PublishedDate.value),
    showSampleCards: true,
    headingLevel: 'h3',
  },
} satisfies Meta<ArgTypes>;

export default meta;

export const Default: StoryFn<ArgTypes> = (args: ArgTypes) => {
  const strData = JSON.stringify(CardInfoMockedData1);
  const dateStr = dayjs(args.publishedDate).format('YYYY-MM-DD');
  const data = JSON.parse(strData);

  if (args.cta && args.cta.href) {
    data.rendering.fields.Link.value.text = args.cta?.text || '';
    data.rendering.fields.Link.value.href = args.cta?.href || '';
  } else {
    data.rendering.fields.Link = null;
  }

  data.rendering.fields.Heading.value = args.heading;
  data.rendering.fields.Content.value = args.content;
  data.rendering.fields.Badge.value = args.badge || '';
  data.rendering.fields.PublishedDate.value = dateStr || '';
  data.rendering.fields.ReadInMins.value = args.readInMins || '';

  if (data.rendering.fields.HeadingLevel) {
    data.rendering.fields.HeadingLevel.fields.Level.value = args.headingLevel;
  }

  if (data.rendering.fields.WithShadow) {
    data.rendering.fields.WithShadow.value = args.withShadow;
  }

  const data2 = CardInfoMockedData2;
  const data3 = CardInfoMockedData3;

  data2.rendering.fields.WithShadow.value = args.withShadow;
  data3.rendering.fields.WithShadow.value = args.withShadow;

  return (
    <div className="flex w-full items-stretch justify-center gap-3 p-6 xl:p-14">
      <div className={classNames('flex w-full flex-col justify-center gap-5 lg:flex-row lg:p-5')}>
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

Default.storyName = 'Article card | Type 1';
