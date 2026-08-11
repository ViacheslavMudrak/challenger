import type { Meta, StoryFn } from '@storybook/react';
import CardInfoMockedData1 from '../mocks/card.info1_1.json';
import CardInfoMockedData2 from '../mocks/card.info1_2.json';
import CardInfoMockedData3 from '../mocks/card.info1_3.json';
import CardInfoMockedData4 from '../mocks/card.info1_4.json';
import { CardSize, IconType } from '../Card.types';
import Card from '../Card';
import classNames from 'classnames';

interface ArgTypes {
  heading: string;
  content: string;
  cta: { text: string; href: string };
  icon: IconType;
  headingLevel: 'h2' | 'h3' | 'h4';
  showSampleCards: boolean;
  size: CardSize;
  withBorder: boolean;
  backgroundColor: 'white' | 'gray' | 'none';
  alignment: 'left' | 'center' | 'right';
  withShadow: boolean;
  withHoverEffect?: boolean;
  withIconBgColor?: boolean;
  displayLogo?: boolean;
}

const meta = {
  id: 'Card.info1',
  title: 'Components/Cards',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    icon: {
      name: 'Icon',
      control: { type: 'select' },
      description: 'Icon',
      options: [
        'UmbrellaIcon',
        'CoinIcon',
        'PersonIcon',
        'CheckIcon',
        'ChartBarIcon',
        'ChartPieIcon',
        'LockIcon',
        'ConnectIcon',
        'ChatIcon',
        'ApplyIcon',
        'None',
      ],
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
    size: {
      name: 'Card size',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'full', 'none'],
    },
    showSampleCards: {
      name: 'Show sample cards',
      control: { type: 'boolean' },
    },
    withHoverEffect: {
      name: 'With hover effect',
      control: { type: 'boolean' },
    },
    withBorder: {
      name: 'With border',
      control: { type: 'boolean' },
    },
    alignment: {
      name: 'Horizontal alignment',
      control: { type: 'radio' },
      options: ['left', 'center', 'right'],
    },
    backgroundColor: {
      name: 'Card background colour',
      control: { type: 'radio' },
      options: ['white', 'gray', 'none'],
    },
    withShadow: {
      name: 'With shadow',
      control: { type: 'boolean' },
    },
    withIconBgColor: {
      name: 'With Icon Background Colour',
      control: { type: 'boolean' },
    },
    displayLogo: {
      name: 'Display logo',
      control: { type: 'boolean' },
    },
  },
  args: {
    icon: 'ChartPieIcon',
    heading: CardInfoMockedData1.rendering.fields.Heading.value,
    content: CardInfoMockedData1.rendering.fields.Content.value,
    withBorder: false,
    backgroundColor: 'gray',
    alignment: 'center',
    withShadow: false,
    showSampleCards: true,
    withHoverEffect: true,
    headingLevel: 'h3',
    displayLogo: false,
    withIconBgColor: false,
    size: 'md',
    cta: {
      text: 'Select',
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
  data.rendering.fields.Content.value = args.content;
  data.rendering.fields.Size.fields.Size.value = args.size;
  data.rendering.fields.DisplayLogo.value = args.displayLogo;
  data.rendering.fields.Icon.fields.IconType.value = args.icon;
  data.rendering.fields.WithIconBgColor.value = args.withIconBgColor;
  data.rendering.fields.WithHoverEffect.value = args.withHoverEffect;

  if (data.rendering.fields.BackgroundColor) {
    data.rendering.fields.BackgroundColor.fields.Color.value = args.backgroundColor;
  }

  if (data.rendering.fields.Alignment) {
    data.rendering.fields.Alignment.fields.Alignment.value = args.alignment;
  }

  if (data.rendering.fields.WithBorder) {
    data.rendering.fields.WithBorder.value = args.withBorder;
  }

  if (data.rendering.fields.HeadingLevel) {
    data.rendering.fields.HeadingLevel.fields.Level.value = args.headingLevel;
  }

  if (data.rendering.fields.WithShadow) {
    data.rendering.fields.WithShadow.value = args.withShadow;
  }

  const data2 = CardInfoMockedData2;
  const data3 = CardInfoMockedData3;
  const data4 = CardInfoMockedData4;

  data2.rendering.fields.BackgroundColor.fields.Color.value = args.backgroundColor;
  data3.rendering.fields.BackgroundColor.fields.Color.value = args.backgroundColor;
  data4.rendering.fields.BackgroundColor.fields.Color.value = args.backgroundColor;

  data2.rendering.fields.Size.fields.Size.value = args.size;
  data3.rendering.fields.Size.fields.Size.value = args.size;
  data4.rendering.fields.Size.fields.Size.value = args.size;

  return (
    <div className="flex w-full flex-col items-stretch justify-center gap-3 p-9 xl:flex-row">
      <div className={classNames('flex w-full flex-col justify-center p-5 lg:flex-row')}>
        <Card rendering={data.rendering} />
        {args.showSampleCards && (
          <>
            <div className="hidden h-full w-px bg-grey lg:flex"></div>
            <Card rendering={data2.rendering} />
            <div className="hidden h-full w-px bg-grey lg:flex"></div>
            <Card rendering={data3.rendering} />
            <div className="hidden h-full w-px bg-grey lg:flex"></div>
            <Card rendering={data4.rendering} />
          </>
        )}
      </div>
    </div>
  );
};

Default.storyName = 'Icon card';
