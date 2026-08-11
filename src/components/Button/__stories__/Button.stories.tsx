import type { Meta } from '@storybook/react';
import Button from '../Button';
import { ButtonComponentProps, ColorType, Variant } from '../Button.types';
import buttonData from '../mocks/button.json';

interface ArgTypes {
  text: string;
  linkUrl: string;
  isExternalLink: boolean;
  onClick: object;
  color: ColorType;
  variant: Variant;
  withArrow: false;
  isDisabled: false;
  as: 'button' | 'link';
}

const meta = {
  title: 'Components/Button',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Buttons allow users to trigger an action or event with a single click. For example, you can use a button for allowing the functionality of submitting a form, opening a dialog, canceling an action, or performing a delete operation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'button label',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'Button label' },
      },
    },
    variant: {
      control: 'select',
      description: 'button variant',
      options: ['solid', 'outline', 'link'],
    },
    color: {
      control: 'select',
      description: 'color type',
      options: ['primary', 'secondary', 'tertiary'],
    },
    linkUrl: {
      control: 'text',
      description: 'linkUrl is only applicable when as="link" is being used',
    },
    isExternalLink: {
      control: 'boolean',
      description: 'isExternalLink is only applicable when as="link" is being used',
    },
    onClick: { action: 'clicked' },
  },
  args: {
    text: 'Button label',
    linkUrl: '/',
    isExternalLink: false,
    color: ColorType.Primary,
    variant: Variant.Solid,
    withArrow: false,
  },
} satisfies Meta<ArgTypes>;

export default meta;

export const Default = (args: ArgTypes) => {
  buttonData.rendering.params.FieldNames = args.variant;
  buttonData.rendering.fields.Color.fields.Type.value = args.color;
  buttonData.rendering.fields.HasArrow.value = args.withArrow;
  buttonData.rendering.fields.LinkValue.value.href = args.linkUrl;
  buttonData.rendering.fields.LinkValue.value.url = args.linkUrl;
  buttonData.rendering.fields.LinkValue.value.text = args.text;
  buttonData.rendering.fields.LinkValue.value.target = args.isExternalLink ? '_blank' : '';

  const data = buttonData as unknown as ButtonComponentProps;

  return (
    <div className="flex w-full flex-col gap-3 p-10">
      <Button rendering={data.rendering}></Button>
    </div>
  );
};
