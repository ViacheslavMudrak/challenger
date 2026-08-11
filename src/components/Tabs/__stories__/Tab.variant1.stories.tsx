import type { Meta, StoryFn } from '@storybook/react';
import TabVariant1, { TabVariant1Props } from '../Tab.variant1';
import tabData from '../mocks/tab.variant1.json';

interface ArgTypes {
  alignment: 'left' | 'center' | 'right';
  headerBgColor: string;
  bodyBgColor: string;
}

const meta = {
  title: 'Components/Tabs/Variant1',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Tab description coming soon',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    alignment: {
      name: 'Horizontal alignment',
      control: { type: 'radio' },
      options: ['left', 'center', 'right'],
    },
    headerBgColor: {
      name: 'Tab header bg colour',
      control: { type: 'radio' },
      options: ['white', 'grey', 'none'],
    },
    bodyBgColor: {
      name: 'Tab body bg colour',
      control: { type: 'radio' },
      options: ['None', 'White', 'Grey'],
    },
  },
  args: {
    alignment: 'center',
    headerBgColor: 'bg-white',
    bodyBgColor: 'White',
  },
} satisfies Meta<ArgTypes>;

export default meta;

export const Default: StoryFn<ArgTypes> = (args: ArgTypes) => {
  if (tabData.rendering.fields.Alignment) {
    tabData.rendering.fields.Alignment.fields.Alignment.value = args.alignment;
  }

  if (tabData.rendering.fields.TabHeaderBgColor) {
    tabData.rendering.fields.TabHeaderBgColor.fields.Color.value = args.headerBgColor;
  }

  tabData.rendering.params.TabBodyBgColor = args.bodyBgColor;

  const data = tabData as unknown as TabVariant1Props;

  return (
    <div className="flex w-full flex-col gap-3 p-10">
      <TabVariant1 rendering={data.rendering}></TabVariant1>
    </div>
  );
};
