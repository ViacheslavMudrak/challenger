import type { Meta, StoryFn } from '@storybook/react';
import GalleryCardMockedData from '../mocks/galleryCard.json';
import { HeadingType } from '../GalleryContainer.types';
import GalleryCard from '../GalleryCard';

interface ArgTypes {
  alignment: 'left' | 'center';
  bgColor: 'Gray' | 'White' | 'None';
  content: string;
  headingLevel: HeadingType;
  heading: string;
  image: string;
  linkText: string;
  showSampleCards: boolean;
  useModal: boolean;
  useProfileShard: boolean;
  withShadow: boolean;
}

const meta = {
  id: 'GalleryCard',
  title: 'Components/Gallery',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    alignment: {
      name: 'Alignment',
      control: { type: 'radio' },
      options: ['left', 'center'],
    },

    bgColor: {
      name: 'Background colour',
      control: { type: 'radio' },
      options: ['Gray', 'White', 'None'],
    },
    heading: {
      name: 'Heading',
      control: { type: 'text' },
      description: 'Heading',
    },
    headingLevel: {
      name: 'Heading Level',
      control: { type: 'select' },
      options: ['h2', 'h3', 'h4'],
      description: 'h2, h3, h4',
    },
    content: {
      name: 'Content',
      control: { type: 'text' },
      description: 'Content',
    },
    image: {
      name: 'Image',
      control: { type: 'select' },
      options: [
        'none',
        'sample1.jpg',
        'sample2.jpg',
        'sample3.jpg',
        'sample4.jpg',
        'profile1.jpg',
        'profile2.jpg',
      ],
    },
    linkText: {
      name: 'Link Text',
      control: { type: 'text' },
      description: 'Text for the CTA to open modal',
    },
    useModal: {
      name: 'Open modal',
      control: { type: 'boolean' },
    },
    withShadow: {
      name: 'With shadow',
      control: { type: 'boolean' },
    },
  },
  args: {
    alignment: 'left',
    bgColor: 'None',
    heading: GalleryCardMockedData.rendering.fields.Heading.value,
    content: GalleryCardMockedData.rendering.fields.Content.value,
    withShadow: GalleryCardMockedData.rendering.fields.WithShadow.value,
    useModal: GalleryCardMockedData.rendering.fields.UseModal.value,
    image: 'sample1.jpg',
    headingLevel: 'h3',
    useProfileShard: GalleryCardMockedData.rendering.fields.UseProfileShard.value,
    linkText: GalleryCardMockedData.rendering.fields.LinkText.value,
  },
} satisfies Meta<ArgTypes>;

export default meta;

export const Default: StoryFn<ArgTypes> = (args: ArgTypes) => {
  const strData = JSON.stringify(GalleryCardMockedData);
  const data = JSON.parse(strData);

  data.rendering.fields.Heading.value = args.heading;
  data.rendering.fields.Content.value = args.content;
  data.rendering.fields.Alignment.fields.Alignment.value = args.alignment;
  data.rendering.fields.CardImage.value.src = args.image;
  data.rendering.fields.BackgroundColor.fields.Color.value = args.bgColor;
  data.rendering.fields.LinkText.value = args.linkText;

  if (data.rendering.fields.HeadingLevel) {
    data.rendering.fields.HeadingLevel.value = args.headingLevel;
  }
  if (data.rendering.fields.WithShadow) {
    data.rendering.fields.WithShadow.value = args.withShadow;
  }
  if (data.rendering.fields.UseProfileShard.value) {
    data.rendering.fields.UseProfileShard.value = args.useProfileShard;
  }
  if (data.rendering.fields.UseModal.value) {
    data.rendering.fields.UseModal.value = args.useModal;
  }

  return (
    <div className="relative m-10 flex h-full w-full items-start justify-center  md:max-w-[calc(50%-12px)] md:basis-[calc(50%-12px)] xl:max-w-[calc((100%-48px)/3)] xl:basis-[calc((100%-48px)/3)]">
      {data.rendering && <GalleryCard rendering={data.rendering} />}
    </div>
  );
};

Default.storyName = 'Gallery Card';
