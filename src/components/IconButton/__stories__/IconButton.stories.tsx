/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Meta, StoryFn } from '@storybook/react';
import IconButton from '../IconButton';
import { IconBgColor, IconButtonProps } from '../IconButton.types';
import { IconColor, IconSize } from 'components/Icons/icon.types';

interface ArgTypes extends IconButtonProps {
  text: string;
}

const meta = {
  title: 'Components/Icon Button',
  component: IconButton,
  parameters: {
    layout: 'none',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'button label',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: '' },
      },
    },
    iconSize: {
      control: { type: 'select' },
      description: 'Icon size',
      options: [...Object.keys(IconSize)],
      table: {
        type: { summary: Object.keys(IconSize) },
        defaultValue: { summary: 'Lg' },
      },
    },
    iconColor: {
      control: { type: 'select' },
      options: [...Object.keys(IconColor)],
      description: 'Icon colour',
      table: {
        type: { summary: Object.keys(IconColor) },
        defaultValue: { summary: 'Black' },
      },
    },
    bgColor: {
      control: { type: 'select' },
      options: [...Object.keys(IconBgColor)],
      description: 'Icon background colour',
      table: {
        type: { summary: Object.keys(IconBgColor) },
        defaultValue: { summary: 'None' },
      },
    },
    type: {
      control: { type: 'select' },
      description: 'Icon type',
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: 'Toggles disable icon button',
    },
  },
  args: {
    text: 'Button label',
    iconSize: 'Lg' as IconSize,
    iconColor: 'Black' as IconColor,
    bgColor: 'None' as IconBgColor,
    type: 'ArrowLeftIcon',
    isDisabled: false,
  },
} satisfies Meta<ArgTypes>;

export default meta;

export const Default: StoryFn<typeof IconButton> = (args: ArgTypes) => {
  const { text, type, isDisabled } = args;

  const iconSize = Object.entries(IconSize).find(([key]) => key === args.iconSize);
  const iconColor = Object.entries(IconColor).find(([key]) => key === args.iconColor);
  const iconBgColor = Object.entries(IconBgColor).find(([key]) => key === args.bgColor);

  return (
    <div className="flex w-full flex-col gap-3 p-10">
      <IconButton
        type={type}
        isDisabled={isDisabled}
        iconColor={iconColor![1]}
        iconSize={iconSize![1]}
        bgColor={iconBgColor![1]}
      >
        {text}
      </IconButton>
    </div>
  );
};

export const Variants: StoryFn<typeof IconButton> = (args: ArgTypes) => {
  const { text } = args;

  return (
    <div className="flex w-full flex-col gap-3 p-10">
      <div className="flex flex-col gap-3 border bg-white p-6">
        <span>With label</span>
        <div className="flex flex-col gap-3">
          <IconButton type="ArrowLeftIcon" bgColor={IconBgColor.Primary} iconSize={IconSize.Sm}>
            {text}
          </IconButton>
        </div>
        <span>Different colours</span>
        <div className="flex gap-2">
          <IconButton
            type="ArrowRightIcon"
            iconColor={IconColor.Navy}
            bgColor={IconBgColor.Primary}
          />
          <IconButton
            type="ArrowRightIcon"
            iconColor={IconColor.White}
            bgColor={IconBgColor.Secondary}
          />
        </div>
        <span>Icon button without background</span>
        <div className="flex gap-2">
          <IconButton type="CloseIcon" iconColor={IconColor.Navy} />
          <IconButton type="ArrowLeftIcon" iconColor={IconColor.Navy} />
          <IconButton type="ArrowRightIcon" iconColor={IconColor.Navy} />
          <IconButton type="ChevronDownIcon" iconColor={IconColor.Navy} />
          <IconButton type="ChevronUpIcon" iconColor={IconColor.Navy} />
        </div>
        <span>Disabled icon</span>
        <div className="flex gap-2">
          <IconButton
            type="ArrowLeftIcon"
            iconColor={IconColor.Navy}
            bgColor={IconBgColor.Primary}
            isDisabled
          />
          <IconButton
            type="ArrowRightIcon"
            iconColor={IconColor.Navy}
            bgColor={IconBgColor.Primary}
          />
        </div>
        <span>Icon sizes</span>
        <div className="flex items-end gap-2">
          <IconButton
            type="ArrowLeftIcon"
            iconColor={IconColor.Navy}
            bgColor={IconBgColor.Primary}
            iconSize={IconSize.Sm}
          />
          <IconButton
            type="ArrowLeftIcon"
            iconColor={IconColor.Navy}
            bgColor={IconBgColor.Primary}
            iconSize={IconSize.Md}
          />
          <IconButton
            type="ArrowLeftIcon"
            iconColor={IconColor.Navy}
            bgColor={IconBgColor.Primary}
            iconSize={IconSize.Lg}
          />
          <IconButton
            type="ArrowLeftIcon"
            iconColor={IconColor.Navy}
            bgColor={IconBgColor.Primary}
            iconSize={IconSize.Xl}
          />
        </div>
      </div>
    </div>
  );
};
