import type { Meta, StoryFn } from '@storybook/react';
import FormSubscription, { FormSubscriptionProps } from '../Form.subscription';
import formSubscriptionData from '../mocks/form.subscription.json';
import { FormBgColor } from 'components/Forms/Form.types';

interface ArgTypes {
  FormBgColor: keyof typeof FormBgColor;
}

const meta = {
  title: 'Components/Forms/Subscription',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'coming soon',
      },
    },
  },
  argTypes: {
    FormBgColor: {
      name: 'FormBgColor',
      control: { type: 'select' },
      description: 'Form background colour',
      options: [...Object.keys(FormBgColor)],
    },
  },
  args: {
    FormBgColor: 'None',
  },
  tags: ['autodocs'],
} satisfies Meta<ArgTypes>;

export default meta;

export const Default: StoryFn = (args: ArgTypes) => {
  const data = formSubscriptionData as unknown as FormSubscriptionProps;
  if (args?.FormBgColor) {
    data.rendering.params.FormHeaderBgColor = args.FormBgColor;
  }

  return (
    <div className="flex w-full flex-col p-5">
      <FormSubscription rendering={data.rendering}></FormSubscription>
    </div>
  );
};
