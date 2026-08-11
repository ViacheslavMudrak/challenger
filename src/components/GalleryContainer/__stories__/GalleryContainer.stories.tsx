import type { Meta, StoryFn } from '@storybook/react';
import GalleryContainerMockedData from '../mocks/gallery.container.json';
import classNames from 'classnames';

import GalleryContainer, { GalleryContainerProps } from '../GalleryContainer';
import { GapSize } from '../GalleryContainer.types';

interface ArgTypes {
  alignment: string;
  bgColor: 'bg-gray' | 'bg-white' | 'none';
  includeSeparator: boolean;
  gapSize: GapSize;
}

const meta = {
  id: 'GalleryContainer',
  title: 'Components/Gallery',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    alignment: {
      name: 'Alignment',
      control: { type: 'radio' },
      options: ['position-left', 'position-center', 'position-right'],
    },
    gapSize: {
      name: 'Space between cards',
      control: { type: 'radio' },
      options: ['spacing-small', 'spacing-medium', 'spacing-large', 'spacing-xlarge', 'none'],
    },
    bgColor: {
      name: 'Background colour',
      control: { type: 'radio' },
      options: ['bg-white', 'bg-bright-navy', 'bg-grey', 'bg-grey-light', 'none'],
    },
  },
  args: {
    alignment: 'position-center',
    bgColor: 'bg-gray',
    gapSize: 'none',
  },
} satisfies Meta<ArgTypes>;

export default meta;

export const Default: StoryFn<ArgTypes> = (args: ArgTypes) => {
  const data = GalleryContainerMockedData as unknown as GalleryContainerProps;

  data.rendering.params.Styles = `${args.bgColor} ${args.alignment} ${args.gapSize}`;

  return (
    <div className="relative flex w-full flex-col items-stretch justify-center gap-3 p-3 xl:flex-row">
      <div className={classNames('relative flex w-full flex-col justify-center lg:flex-row')}>
        {data.rendering && <GalleryContainer rendering={data.rendering} />}
      </div>
    </div>
  );
};

Default.storyName = 'Gallery container';
