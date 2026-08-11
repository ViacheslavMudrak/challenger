import type { Meta, StoryFn } from '@storybook/react';
import CardInfoMockedData1 from '../mocks/card.info13.json';
import classNames from 'classnames';
import Card from '../Card';
import { HeadingType } from '../Card.types';

interface ArgTypes {
  heading: string;
  headingLevel: HeadingType;
}

const meta = {
  id: 'Card.info13',
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
  },
  args: {
    heading: CardInfoMockedData1.rendering.fields.Heading.value,
    headingLevel: 'h3',
  },
} satisfies Meta<ArgTypes>;

export default meta;

export const Default: StoryFn<ArgTypes> = (args: ArgTypes) => {
  const strData = JSON.stringify(CardInfoMockedData1);
  const data = JSON.parse(strData);

  data.rendering.fields.Heading.value = args.heading;

  if (data.rendering.fields.HeadingLevel) {
    data.rendering.fields.HeadingLevel.fields.Level.value = args.headingLevel;
  }

  return (
    <div className="flex w-full items-stretch justify-center gap-3 p-6 xl:p-14">
      <div className={classNames('flex w-full flex-col justify-center gap-5 lg:flex-row lg:p-5')}>
        <Card rendering={data.rendering} />
      </div>
    </div>
  );
};

Default.storyName = 'Social card';
