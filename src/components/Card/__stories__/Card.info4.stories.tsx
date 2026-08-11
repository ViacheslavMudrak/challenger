import type { Meta, StoryFn } from '@storybook/react';
import CardInfoMockedData1 from '../mocks/card.info4_1.json';
import CardInfoMockedData2 from '../mocks/card.info4_2.json';
import CardInfoMockedData3 from '../mocks/card.info4_3.json';
import CardInfoMockedData4 from '../mocks/card.info4_4.json';
import classNames from 'classnames';
import Card from '../Card';
import { CardSize, HeadingType, ShardColorType, ShardType } from '../Card.types';

interface ArgTypes {
  heading: string;
  content: string;
  headingLevel: HeadingType;
  size: CardSize;
  showSampleCards: boolean;
  alignment: 'left' | 'center';
  withShadow: boolean;
  shardColor: ShardColorType;
  shardType: ShardType;
  image: string;
  fullName?: string;
  role?: string;
  bio?: string;
  useModal: boolean;
  cta: {
    text: string;
    href: string;
  };
}

const meta = {
  id: 'Card.info4',
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
    useModal: {
      name: 'Open modal instead',
      control: { type: 'boolean' },
    },
    shardColor: {
      name: 'Shard colour',
      control: { type: 'select' },
      options: [...Object.keys(ShardColorType)],
      if: { arg: 'shardType', eq: 'article' },
    },
    shardType: {
      name: 'Shard type',
      control: { type: 'select' },
      options: ['article', 'profile'],
    },
    fullName: {
      name: 'Full Name',
      control: { type: 'text' },
      table: {
        category: 'Profile',
      },
      description: 'Full Name',
    },
    role: {
      name: 'Role',
      control: { type: 'text' },
      table: {
        category: 'Profile',
      },
      description: 'Role',
    },
    bio: {
      name: 'Biography',
      control: { type: 'text' },
      table: {
        category: 'Profile',
      },
      description: 'Bio',
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
    useModal: false,
    image: 'sample1.jpg',
    showSampleCards: true,
    fullName: CardInfoMockedData1.rendering.fields.FullName.value,
    bio: CardInfoMockedData1.rendering.fields.Bio.value,
    role: CardInfoMockedData1.rendering.fields.Role.value,
    shardColor: CardInfoMockedData1.rendering.fields.ShardColor.fields.Color
      .value as ShardColorType,
    headingLevel: 'h3',
    alignment: 'left',
    shardType: 'article',
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
  data.rendering.fields.Content.value = args.content;
  data.rendering.fields.Size.fields.Size.value = args.size;
  data.rendering.fields.Alignment.fields.Alignment.value = args.alignment;
  data.rendering.fields.ShardColor.value = args.shardColor;
  data.rendering.fields.ShardType.value = args.shardType;
  data.rendering.fields.CardImage.value.src = args.image;
  data.rendering.fields.UseModal.value = args.useModal;
  data.rendering.fields.FullName.value = args.fullName;
  data.rendering.fields.Bio.value = args.bio;
  data.rendering.fields.Role.value = args.role;

  if (data.rendering.fields.HeadingLevel) {
    data.rendering.fields.HeadingLevel.value = args.headingLevel;
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

  data2.rendering.fields.ShardType.fields.ShardType.value = args.shardType;
  data3.rendering.fields.ShardType.fields.ShardType.value = args.shardType;
  data4.rendering.fields.ShardType.fields.ShardType.value = args.shardType;

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

Default.storyName = 'Image card with shards';
