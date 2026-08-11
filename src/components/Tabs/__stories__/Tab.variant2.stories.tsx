import type { Meta, StoryFn } from '@storybook/react';
import TabVariant2, { TabVariant2Props } from '../Tab.variant2';
import tabData from '../mocks/tab.variant2.json';

const meta = {
  title: 'Components/Tabs/Variant2',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Tab variant 2 supports hash in url to select specific location. For example "/location#melbourne" will open up Melbourne`s location',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

export const Default: StoryFn = () => {
  const data = tabData as unknown as TabVariant2Props;

  return (
    <div className="flex w-full flex-col gap-3 p-10">
      <TabVariant2 rendering={data.rendering}></TabVariant2>
    </div>
  );
};
