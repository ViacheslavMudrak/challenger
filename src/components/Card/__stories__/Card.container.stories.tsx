import type { Meta, StoryFn } from '@storybook/react';
import CardContainerMockedData from '../mocks/card.container.json';
import classNames from 'classnames';
import CardContainer, { CardContainerProps } from '../Card.container';
import { CardFields, CardProps, CardType, GapSize } from '../Card.types';
import { getCardComponentName } from '../Card.helpers';

interface ArgTypes {
  cardsPerRow: number;
  alignment: string;
  bgColor: 'bg-gray' | 'bg-white' | 'none';
  includeSeparator: boolean;
  gapSize: GapSize;
  cardType: CardType;
}

const meta = {
  id: 'Card.container',
  title: 'Components/Cards',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    alignment: {
      name: 'Alignment',
      control: { type: 'radio' },
      options: ['position-left', 'position-center', 'position-right'],
    },
    cardsPerRow: {
      name: 'Cards per row',
      control: { type: 'number', min: 1, max: 10, step: 1 },
    },
    gapSize: {
      name: 'Space between cards',
      control: { type: 'radio' },
      options: ['spacing-small', 'spacing-medium', 'spacing-large', 'none'],
    },
    includeSeparator: {
      name: 'Include separator',
      control: { type: 'boolean' },
    },
    bgColor: {
      name: 'Background colour',
      control: { type: 'radio' },
      options: ['bg-gray', 'bg-white', 'bg-bright-navy', 'none'],
    },
    cardType: {
      name: 'Card type',
      control: { type: 'select' },
      options: Object.values(CardType),
      description: 'Card type',
    },
  },
  args: {
    cardsPerRow: 4,
    alignment: 'position-center',
    includeSeparator: false,
    cardType: CardType.Info1,
    bgColor: 'bg-gray',
    gapSize: 'none',
  },
} satisfies Meta<ArgTypes>;

export default meta;

export const Default: StoryFn<ArgTypes> = (args: ArgTypes) => {
  const data = CardContainerMockedData as unknown as CardContainerProps;
  let cardsPerRow = args.cardsPerRow;

  if (cardsPerRow <= 0) {
    cardsPerRow = 1;
  }

  data.rendering.params.CardsPerRow = cardsPerRow.toString();
  data.rendering.params.IncludeSeparator = args.includeSeparator ? '1' : '0';

  data.rendering.params.Styles = `${args.bgColor} ${args.alignment} ${args.gapSize}`;

  if (data.rendering.placeholders) {
    const items = data.rendering.placeholders['card-container'];

    for (let i = 0; i < items.length; i++) {
      const cardItem = { rendering: items[i] } as unknown as CardProps<CardFields>;

      if (cardItem.rendering.fields) {
        cardItem.rendering.componentName = getCardComponentName(args.cardType.toString());
      }
    }
  }

  return (
    <div className="relative flex w-full flex-col items-stretch justify-center gap-3 p-3 xl:flex-row">
      <div className={classNames('relative flex w-full flex-col justify-center lg:flex-row')}>
        {data.rendering && <CardContainer rendering={data.rendering} />}
      </div>
    </div>
  );
};

Default.storyName = 'Card container';
