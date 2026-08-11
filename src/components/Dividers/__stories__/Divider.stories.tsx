import type { Meta, StoryFn } from '@storybook/react';
import dividerData from '../mocks/divider.json';
import { DividerBase } from '../Divider.base';
import { DividerColor, Variant } from '../Divider.types';
import { getBodyBgColor } from '../Divider.helpers';
import classNames from 'classnames';
interface ArgTypes {
  dividerTop: Variant;
  dividerTopColor1: string;
  dividerTopColor2: string;
  dividerTopBgColor?: string;
  dividerBottom: Variant;
  dividerBottomColor1: string;
  dividerBottomColor2: string;
  dividerBottomBgColor?: string;
  bodyBgColor?: string;
}

const meta = {
  title: 'Components/Dividers',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Dividers description coming soon',
      },
    },
  },
  argTypes: {
    bodyBgColor: {
      control: { type: 'select' },
      name: 'Body Background Colour',
      options: [...Object.keys(DividerColor)],
      description: 'Body Background Colour',
      table: {
        type: { summary: Object.keys(DividerColor) },
        defaultValue: { summary: 'None' },
      },
    },
    dividerTop: {
      control: { type: 'select' },
      name: 'Divider Top Type',
      options: [...Object.values(Variant)],
      description: 'Divider Top',
      table: {
        type: { summary: Object.keys(Variant) },
        category: 'Divider Top',
        defaultValue: { summary: 'None' },
      },
    },
    dividerTopColor1: {
      control: { type: 'select' },
      name: 'Divider top colour 1',
      options: [...Object.keys(DividerColor)],
      description: 'Divider top colour 1',
      table: {
        type: { summary: Object.keys(DividerColor) },
        category: 'Divider Top',
        defaultValue: { summary: 'None' },
      },
    },
    dividerTopColor2: {
      control: { type: 'select' },
      name: 'Divider top colour 2',
      options: [...Object.keys(DividerColor)],
      description: 'Divider top colour 2',
      table: {
        type: { summary: Object.keys(DividerColor) },
        category: 'Divider Top',
        defaultValue: { summary: 'None' },
      },
    },
    dividerTopBgColor: {
      name: 'Divider Top Bg colour',
      control: { type: 'radio' },
      options: ['bg-grey-light', 'bg-white', 'none'],
      table: {
        category: 'Divider Top',
        defaultValue: { summary: 'None' },
      },
    },
    dividerBottom: {
      control: { type: 'select' },
      name: 'Divider Bottom Type',
      options: [...Object.values(Variant)],
      description: 'Divider Bottom',
      table: {
        type: { summary: Object.keys(Variant) },
        category: 'Divider Bottom',
        defaultValue: { summary: 'None' },
      },
    },
    dividerBottomColor1: {
      control: { type: 'select' },
      name: 'Divider bottom colour 1',
      options: [...Object.keys(DividerColor)],
      description: 'Divider bottom colour 1',
      table: {
        type: { summary: Object.keys(DividerColor) },
        category: 'Divider Bottom',
        defaultValue: { summary: 'None' },
      },
    },
    dividerBottomColor2: {
      control: { type: 'select' },
      name: 'Divider bottom colour 2',
      options: [...Object.keys(DividerColor)],
      description: 'Divider bottom colour 2',
      table: {
        type: { summary: Object.keys(DividerColor) },
        category: 'Divider Bottom',
        defaultValue: { summary: 'None' },
      },
    },
    dividerBottomBgColor: {
      name: 'Divider Bottom Bg colour',
      control: { type: 'radio' },
      options: ['bg-grey-light', 'bg-white', 'none'],
      table: {
        category: 'Divider Bottom',
        defaultValue: { summary: 'None' },
      },
    },
  },
  args: {
    dividerTop: Variant.Divider1Top,
    dividerBottom: Variant.Divider1Bottom,
    dividerTopBgColor: 'none',
    dividerBottomBgColor: 'none',
    dividerTopColor1: '',
    dividerTopColor2: '',
    dividerBottomColor1: '',
    dividerBottomColor2: '',
    bodyBgColor: 'DeepBlue',
  },
  tags: ['autodocs'],
} satisfies Meta<ArgTypes>;

export default meta;

export const Default: StoryFn<ArgTypes> = (args: ArgTypes) => {
  const strData = JSON.stringify(dividerData);
  const data1 = JSON.parse(strData);

  data1.rendering.params.FieldNames = args.dividerTop;
  data1.rendering.fields.DividerTopBgColor.fields.Color.value = args.dividerTopBgColor;
  data1.rendering.fields.DividerColorTop1.fields.Color.value = args.dividerTopColor1;
  data1.rendering.fields.DividerColorTop2.fields.Color.value = args.dividerTopColor2;

  const data2 = JSON.parse(strData);
  data2.rendering.params.FieldNames = args.dividerBottom;
  data2.rendering.fields.DividerBottomBgColor.fields.Color.value = args.dividerBottomBgColor;
  data2.rendering.fields.DividerColorBottom1.fields.Color.value = args.dividerBottomColor1;
  data2.rendering.fields.DividerColorBottom2.fields.Color.value = args.dividerBottomColor2;

  const bodyBgColor = getBodyBgColor(args.bodyBgColor);

  return (
    <div className="relative flex w-full flex-col p-10">
      <div className="relative top-[1px] w-full">
        <DividerBase rendering={data1.rendering}></DividerBase>
      </div>
      <div className={classNames('relative h-64 w-full', bodyBgColor)}></div>
      <DividerBase rendering={data2.rendering}></DividerBase>
    </div>
  );
};
