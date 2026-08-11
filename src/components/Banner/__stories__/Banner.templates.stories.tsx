import type { Meta, StoryFn } from '@storybook/react';
import Banner from '../Banner';
import { BannerComponentProps } from '../Banner.types';
import DataTemplate1 from '../mocks/banner.template1.json';
import DataTemplate2 from '../mocks/banner.template2.json';
import DataTemplate3 from '../mocks/banner.template3.json';
import DataTemplate4 from '../mocks/banner.template4.json';
import DataTemplate5 from '../mocks/banner.template5.json';
import DataTemplate6 from '../mocks/banner.template6.json';
import DataTemplate7 from '../mocks/banner.template7.json';
import DataTemplate8 from '../mocks/banner.template8.json';
import DataTemplate9 from '../mocks/banner.template9.json';
import DataTemplate10 from '../mocks/banner.template10.json';
import DataTemplate11 from '../mocks/banner.template11.json';
import DataTemplate12 from '../mocks/banner.template12.json';
import DataTemplate13 from '../mocks/banner.template13.json';
import DataTemplate14 from '../mocks/banner.template14.json';
import DataTemplate15 from '../mocks/banner.template15.json';
import DataTemplate16 from '../mocks/banner.template16.json';
import DataTemplate17 from '../mocks/banner.template17.json';
import DataTemplate18 from '../mocks/banner.template18.json';
import DataTemplate19 from '../mocks/banner.template19.json';

const meta = {
  title: 'Components/Banners/Variants',
  parameters: {
    layout: 'fullscreen',
    jest: ['Banner.test.tsx', 'banner.helpers.test.ts'],
  },
} satisfies Meta;

export default meta;

type Story = StoryFn<typeof meta>;

export const Template1: Story = () => {
  const rendering = DataTemplate1 as unknown as BannerComponentProps;

  return <Banner rendering={rendering.rendering} />;
};

Template1.storyName = 'IND_T1_Header_Banner';

export const Template2: Story = () => {
  const rendering = DataTemplate2 as unknown as BannerComponentProps;

  return <Banner rendering={rendering.rendering} />;
};

Template2.storyName = 'CTA_Middle_Banner_Large';

export const Template3: Story = () => {
  const rendering = DataTemplate3 as unknown as BannerComponentProps;

  return <Banner rendering={rendering.rendering} />;
};

Template3.storyName = 'ADV_T1_Header_Banner';

export const Template4: Story = () => {
  const rendering = DataTemplate4 as unknown as BannerComponentProps;

  return <Banner rendering={rendering.rendering} />;
};

Template4.storyName = 'INSTO_T1_Header_Banner';

export const Template5: Story = () => {
  const rendering = DataTemplate5 as unknown as BannerComponentProps;

  return <Banner rendering={rendering.rendering} />;
};

Template5.storyName = 'CTA_Footer_Banner_No_Image';

export const Template6: Story = () => {
  const rendering = DataTemplate6 as unknown as BannerComponentProps;

  return <Banner rendering={rendering.rendering} />;
};

Template6.storyName = 'IND_T2_Header_Banner';

export const Template7: Story = () => {
  const rendering = DataTemplate7 as unknown as BannerComponentProps;

  return <Banner rendering={rendering.rendering} />;
};

Template7.storyName = 'ADV_T2_Header_Banner';

export const Template8: Story = () => {
  const rendering = DataTemplate8 as unknown as BannerComponentProps;

  return <Banner rendering={rendering.rendering} />;
};

Template8.storyName = 'INSTO_T2_Header_Banner';

export const Template9: Story = () => {
  const rendering = DataTemplate9 as unknown as BannerComponentProps;

  return <Banner rendering={rendering.rendering} />;
};

Template9.storyName = 'GEN_T3_Header_Banner';

export const Template10: Story = () => {
  const rendering = DataTemplate10 as unknown as BannerComponentProps;

  return <Banner rendering={rendering.rendering} />;
};

Template10.storyName = 'GEN_T3_Product_Banner';

export const Template11: Story = () => {
  const rendering = DataTemplate11 as unknown as BannerComponentProps;

  return <Banner rendering={rendering.rendering} />;
};

Template11.storyName = 'ADV_T3_Header_Banner';

export const Template12: Story = () => {
  const rendering = DataTemplate12 as unknown as BannerComponentProps;

  return <Banner rendering={rendering.rendering} />;
};

Template12.storyName = 'GEN_T4_Header_Banner';

export const Template13: Story = () => {
  const rendering = DataTemplate13 as unknown as BannerComponentProps;

  return <Banner rendering={rendering.rendering} />;
};

Template13.storyName = 'ADV_T4_Header_Banner';

export const Template14: Story = () => {
  const rendering = DataTemplate14 as unknown as BannerComponentProps;

  return <Banner rendering={rendering.rendering} />;
};

Template14.storyName = 'IND_T4_Header_Banner';

export const Template15: Story = () => {
  const rendering = DataTemplate15 as unknown as BannerComponentProps;

  return <Banner rendering={rendering.rendering} />;
};

Template15.storyName = 'INSTO_T4_Header_Banner';

export const Template16: Story = () => {
  const rendering = DataTemplate16 as unknown as BannerComponentProps;

  return <Banner rendering={rendering.rendering} />;
};

Template16.storyName = 'GEN_T4_Header_Banner_Blue';

export const Template17: Story = () => {
  const rendering = DataTemplate17 as unknown as BannerComponentProps;

  return <Banner rendering={rendering.rendering} />;
};

Template17.storyName = 'GEN_T4_Header_Banner_Small';

export const Template18: Story = () => {
  const rendering = DataTemplate18 as unknown as BannerComponentProps;

  return <Banner rendering={rendering.rendering} />;
};

Template18.storyName = 'CTA_Footer_Banner_Image';

export const Template19: Story = () => {
  const rendering = DataTemplate19 as unknown as BannerComponentProps;

  return <Banner rendering={rendering.rendering} />;
};

Template19.storyName = 'CTA_Middle_Banner_Small';
