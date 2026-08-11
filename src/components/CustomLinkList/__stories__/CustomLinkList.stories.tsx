import type { Meta, StoryFn } from '@storybook/react';
import CustomLinkList, { CustomLinkListProps } from '../CustomLinkList';
import accordionData from '../mocks/custom-link-list.json';

const meta = {
  title: 'Components/Link list',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Link list description coming soon',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

export const Default: StoryFn = () => {
  const data = accordionData as unknown as CustomLinkListProps;

  return (
    <div className="flex w-full flex-col gap-3 p-10">
      <CustomLinkList rendering={data.rendering}></CustomLinkList>
    </div>
  );
};
