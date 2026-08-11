import { IconProps, IconSize, IconColor } from '../icon.types';
import * as Icon from '..';
import { Meta } from '@storybook/react';
import { FC } from 'react';
import { iconList } from '../content';

const meta = {
  title: 'Components/Icons',
  parameters: {
    layout: 'left',
    jest: 'Icons.test.tsx',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      description: 'Icon Size',
      options: [...Object.keys(IconSize)],
      table: {
        defaultValue: { summary: 'Sm' },
      },
    },
    color: {
      control: { type: 'select' },
      options: [...Object.keys(IconColor)],
      description: 'Icon Colour',
      table: {
        defaultValue: { summary: 'Black' },
      },
    },
  },
  args: {
    size: 'Lg',
    color: 'Black',
  },
} satisfies Meta;

export default meta;

export const Default = (args: IconProps) => {
  const iconSize = Object.entries(IconSize).find(([key]) => key === args.size);
  const iconColor = Object.entries(IconColor).find(([key]) => key === args.color);

  let size = IconSize.Md;
  let color = IconColor.Black;
  let bgColor = 'bg-white';
  let txtColor = 'text-black';

  if (args.color?.toString() === 'White') {
    bgColor = 'bg-blue';
    txtColor = 'text-white';
  }

  if (iconSize) {
    size = iconSize[1];
  }

  if (iconColor) {
    color = iconColor[1];
  }

  return iconList.map((group) => (
    <div key={group.name} className="m-5 flex flex-col">
      <span>{group.name}</span>
      <div className="flex w-full flex-wrap gap-2 gap-x-2 p-3">
        {group.icons.map((item: string) => {
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          const CustomIcon = (Icon as any)[item] as FC<IconProps>;

          return (
            <div
              key={item}
              className={`flex h-32 w-32 flex-col items-center justify-center gap-3 border-2 p-5 ${bgColor}`}
            >
              <CustomIcon size={size} color={color} />
              <span className={`text-xs ${txtColor}`}>{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  ));
};
