import type { Meta, StoryFn } from '@storybook/react';
import Breadcrumb, { BreadcrumbFields } from '../Breadcrumb';
import breadcrumbData from '../mocks/breadcrumb.json';

const meta = {
  title: 'Components/Breadcrumb',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Breadcrumb description coming soon',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

export const Default: StoryFn = () => {
  const data = breadcrumbData as unknown as BreadcrumbFields;

  return (
    <div className="flex w-full flex-col gap-3 p-10">
      <Breadcrumb fields={data} params={{}}></Breadcrumb>
    </div>
  );
};
