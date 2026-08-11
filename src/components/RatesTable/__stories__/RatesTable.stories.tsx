import type { Meta, StoryFn } from '@storybook/react';
import RatesTable, { RatesTableProps } from '../RatesTable';
import accordionData from '../mocks/rates-table.json';

const meta = {
  title: 'Components/Rates Table',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Rates table description coming soon',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

export const Default: StoryFn = () => {
  const data = accordionData as unknown as RatesTableProps;

  return (
    <div className="flex w-full flex-col gap-3 p-10">
      <RatesTable rendering={data.rendering}></RatesTable>
    </div>
  );
};
