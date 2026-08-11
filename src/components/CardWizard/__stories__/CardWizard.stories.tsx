import type { Meta, StoryFn } from '@storybook/react';
import CardWizard, { CardWizardProps } from '../CardWizard';
import cardWizardData from '../mocks/card-wizard.json';

const meta = {
  title: 'Components/Card Wizard',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'card wizard description coming soon',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

export const Default: StoryFn = () => {
  const data = cardWizardData as unknown as CardWizardProps;

  return (
    <div className="flex w-full flex-col gap-3 p-10">
      <CardWizard rendering={data.rendering}></CardWizard>
    </div>
  );
};
