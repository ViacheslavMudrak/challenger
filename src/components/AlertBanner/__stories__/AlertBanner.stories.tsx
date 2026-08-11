import type { Meta, StoryFn } from '@storybook/react';
import alerBannerMockData from '../mocks/alertbanner.json';
import AlertBanner from '../AlertBanner';
import { AlertBannerDecorativeColors, AlertBannerRendering } from '../AlertBanner.types';

interface ArgTypes {
  decorativeIconColor: keyof typeof AlertBannerDecorativeColors;
  alertMessage: string;
}

const meta = {
  title: 'Components/AlertBanner',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'AlertBanner is a Front-End only component which used to display sitewide alerts',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    decorativeIconColor: {
      name: 'DecorativeLineColor',
      control: { type: 'select' },
      description: 'Information icon and top border colour',
      options: [...Object.keys(AlertBannerDecorativeColors)],
    },
    alertMessage: {
      control: { type: 'text' },
      name: 'AlertMessage',
      description: 'Alert Banner richtext content',
    },
  },
  args: {
    decorativeIconColor: 'yellow',
    alertMessage:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel tortor ante. Phasellus tempus sed magna a dapibus. Nunc et dui ipsum. Nam et ligula risus. Suspendisse potenti.',
  },
} satisfies Meta<ArgTypes>;

export default meta;

export const Default: StoryFn = (args: ArgTypes) => {
  const data = alerBannerMockData as unknown as AlertBannerRendering;
  data.fields.DecorativeLineColor.value = args.decorativeIconColor;
  if (!data.fields.AlertMessage?.fields?.Text?.value) return <div></div>;
  data.fields.AlertMessage.fields.Text.value = args.alertMessage;

  return (
    <div className="flex w-full ">
      <AlertBanner {...data}></AlertBanner>
    </div>
  );
};
