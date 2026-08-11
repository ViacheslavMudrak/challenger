import type { Meta, StoryFn } from '@storybook/react';
import CardInfoMockedData1 from '../mocks/card.info6_1.json';
import CardInfoMockedData2 from '../mocks/card.info6_2.json';
import CardInfoMockedData3 from '../mocks/card.info6_3.json';
import classNames from 'classnames';
import Card from '../Card';

interface ArgTypes {
  showSampleCards: boolean;
  image: string;
  cta: {
    text: string;
    href: string;
  };
}

const meta = {
  id: 'Card.info6',
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
    showSampleCards: {
      name: 'Show sample cards',
      control: { type: 'boolean' },
    },
    image: {
      name: 'Image',
      control: { type: 'select' },
      options: ['client1.png', 'client2.png', 'client3.png'],
    },
    cta: {
      name: 'Call to action',
      control: { type: 'object' },
    },
  },
  args: {
    cta: {
      text: 'Learn more',
      href: '/test',
    },
    image: 'client1.png',
    showSampleCards: true,
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

  data.rendering.fields.CardImage.value.src = args.image;

  const data2 = CardInfoMockedData2;
  const data3 = CardInfoMockedData3;

  return (
    <div className="flex w-full items-stretch justify-center gap-3 p-14">
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

Default.storyName = 'Image card';
