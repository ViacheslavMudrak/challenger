import type { Meta } from '@storybook/react';
import Banner from '../Banner';
import { BannerBgColor, BannerComponentProps, TemplateMapping } from '../Banner.types';
import BannerData from '../mocks/banner.template1.json';
import dayjs from 'dayjs';

interface SBProps {
  template: string;
  image: string;
  headingLevel: string;
  content: string;
  heading: string;
  subHeading: string;
  bgColor: string;
  withAnimation: boolean;
  cta: { text: string; href: string };
  fullName: string;
  role: string;
  publishedDate: Date;
  durationInMins: string;
  profileImage: string;
  showShareholder: boolean;
  showRate: boolean;
}

const meta = {
  title: 'Components/Banners',
  parameters: {
    layout: 'fullscreen',
    jest: ['Banner.test.tsx', 'banner.helpers.test.ts'],
    docs: {
      description: {
        component: 'Banner description goes here',
      },
    },
    defaultViewport: 'desktop',
  },
  argTypes: {
    template: {
      name: 'Template',
      control: { type: 'select' },
      options: Object.keys(TemplateMapping),
      description: 'Banner template',
    },
    headingLevel: {
      control: { type: 'select' },
      name: 'Heading level',
      options: ['h1', 'h2', 'h3'],
      description: 'Heading level',
    },
    content: {
      control: { type: 'text' },
      name: 'Content',
      description: 'Banner content',
    },
    heading: {
      control: { type: 'text' },
      name: 'Main heading',
      description: 'Banner heading',
    },
    subHeading: {
      control: { type: 'text' },
      name: 'Sub heading',
    },
    image: {
      control: { type: 'select' },
      name: 'Banner image',
      description: 'Banner image',
      options: ['sample1.jpg', 'sample2.jpg', 'sample3.jpg', 'none'],
      table: {
        defaultValue: { summary: 'sample1.jpg' },
      },
    },
    cta: {
      name: 'Call to action',
      control: { type: 'object' },
      description: 'Call To Action',
    },
    withAnimation: {
      control: { type: 'boolean' },
      name: 'With animation',
    },
    bgColor: {
      control: { type: 'select' },
      name: 'Background colour',
      options: [...Object.keys(BannerBgColor)],
      description: 'banner background colour',
      table: {
        type: { summary: Object.keys(BannerBgColor) },
        defaultValue: { summary: 'None' },
      },
    },
    fullName: {
      name: 'Full name',
      table: {
        category: 'Article',
      },
      control: { type: 'text' },
    },
    publishedDate: {
      name: 'Published date',
      table: {
        category: 'Article',
      },
      control: { type: 'date' },
    },
    profileImage: {
      control: { type: 'select' },
      table: {
        category: 'Article',
      },
      name: 'Profile image',
      description: 'Profile image',
      options: ['profile1.jpg', 'profile2.jpg', 'none'],
    },
    role: {
      name: 'Role',
      table: {
        category: 'Article',
      },
      control: { type: 'text' },
    },
    durationInMins: {
      name: 'Duration in minutes',
      table: {
        category: 'Article',
      },
      control: { type: 'text' },
    },
    showRate: {
      control: { type: 'boolean' },
      name: 'Show rate',
      table: {
        category: 'Card',
      },
    },
    showShareholder: {
      control: { type: 'boolean' },
      name: 'Show shareholder',
      table: {
        category: 'Card',
      },
    },
  },
  args: {
    template: 'IND_T1_Header_Banner',
    subHeading: '',
    heading: BannerData.rendering.fields.BannerHeading.value,
    headingLevel: 'h1',
    content: BannerData.rendering.fields.BannerContent.value,
    image: 'sample1.jpg',
    cta: {
      text: 'See term rates',
      href: '/test',
    },
    profileImage: 'profile1.jpg',
    publishedDate: new Date(BannerData.rendering.fields.PublishedDate.value),
    bgColor: 'None',
    withAnimation: false,
    fullName: BannerData.rendering.fields.FullName.value,
    role: BannerData.rendering.fields.Role.value,
    durationInMins: BannerData.rendering.fields.DurationInMins.value,
    showRate: false,
    showShareholder: false,
  },
} satisfies Meta<SBProps>;

export default meta;

export const Default = (args: SBProps) => {
  const dateStr = dayjs(args.publishedDate).format('YYYY-MM-DD');
  const strData = JSON.stringify(BannerData);
  const data = JSON.parse(strData);

  if (data.rendering.placeholders['ph-button-1'][0]) {
    if (!args.cta || !args.cta?.text || !args.cta?.href) {
      delete data.rendering.placeholders['ph-button-1'][0];
    } else if (args.cta.text && args.cta.href) {
      data.rendering.placeholders['ph-button-1'][0].fields.LinkValue.value.text = args.cta.text;
      data.rendering.placeholders['ph-button-1'][0].fields.LinkValue.value.href = args.cta.href;
    }
  }

  data.rendering.params.FieldNames = args.template;
  data.rendering.fields.BannerHeading.value = args.heading;
  data.rendering.fields.BannerSubHeading.value = args.subHeading;
  data.rendering.fields.BannerContent.value = args.content;
  data.rendering.fields.BannerHeadingLevel.fields.Level.value = args.headingLevel;
  data.rendering.fields.BannerBgColor.fields.Color.value = args.bgColor;
  data.rendering.fields.BannerWithAnimation.value = args.withAnimation;
  data.rendering.fields.BannerImage.value.src = args.image;
  data.rendering.fields.FullName.value = args.fullName;
  data.rendering.fields.Role.value = args.role;
  data.rendering.fields.DurationInMins.value = args.durationInMins;
  data.rendering.fields.ProfileImage.value.src = args.profileImage;
  data.rendering.fields.PublishedDate.value = dateStr;
  data.rendering.fields.ShowShareholder.value = args.showShareholder;
  data.rendering.fields.ShowRate.value = args.showRate;

  const rendering = data as unknown as BannerComponentProps;

  return <Banner rendering={rendering.rendering} />;
};
