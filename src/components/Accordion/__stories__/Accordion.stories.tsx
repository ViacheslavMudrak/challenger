import type { Meta, StoryFn } from '@storybook/react';
import Accordion, { AccordionProps } from '../Accordion';
import accordionData from '../mocks/accordion.json';

interface ArgTypes {
  alignment: 'left' | 'center';
}

const meta = {
  title: 'Components/Accordion',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Accordion description coming soon',
      },
    },
  },
  argTypes: {
    alignment: {
      name: 'Alignment',
      control: { type: 'radio' },
      options: ['left', 'center'],
    },
  },
  args: {
    alignment: 'left',
  },
  tags: ['autodocs'],
} satisfies Meta<ArgTypes>;

export default meta;

export const Default: StoryFn<ArgTypes> = (args: ArgTypes) => {
  const data = accordionData as unknown as AccordionProps;

  if (data.rendering.fields && data.rendering.fields.Alignment) {
    data.rendering.fields.Alignment.fields.Alignment.value = args.alignment;
  }

  return (
    <div className="flex w-full flex-col gap-3 p-10">
      <Accordion rendering={data.rendering}></Accordion>
    </div>
  );
};
