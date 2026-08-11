import type { Meta, StoryFn } from '@storybook/react';

import BannerLoader, { BannerLoaderProps } from '../Banner.loader';

const meta = {
  title: 'Components/Banners/Loader',
  component: BannerLoader,
  parameters: {
    layout: 'fullscreen',
    jest: ['Banner.test.tsx', 'banner.helpers.test.ts'],
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      description: 'Banner loader size',
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
  },
  args: {
    size: 'lg',
  },
} satisfies Meta<BannerLoaderProps>;

export default meta;

export const Loader: StoryFn<typeof BannerLoader> = (args: BannerLoaderProps) => {
  return <BannerLoader size={args.size} />;
};
