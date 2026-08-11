import type { Meta, StoryFn } from '@storybook/react';
import { ReactElement } from 'react';

const meta = {
  title: 'Design/Typography',
  parameters: {
    layout: 'left',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      table: {
        type: { summary: 'Custom text' },
        defaultValue: { summary: 'The quick brown fox jumps over the lazy dog.' },
      },
    },
  },
  args: {
    text: 'The quick brown fox jumps over the lazy dog.',
  },
} satisfies Meta;

export default meta;

interface ArgTypes {
  text: string;
}

type Story = StoryFn<typeof meta & ArgTypes>;

export const Default: Story = (args: ArgTypes) => {
  const sampleText = args.text;

  const renderHeading = (title: ReactElement, subtitle: string, heading: ReactElement) => {
    return (
      <div className="mt-5 flex flex-col gap-2">
        {title}
        <span className="italic">{subtitle}</span>
        <hr className="border-grey" />
        {heading}
      </div>
    );
  };

  return (
    <div className="m-5 flex flex-col gap-4">
      {renderHeading(
        <h1 className="text-hero-lg md:text-hero-xl">Hero XL</h1>,
        'size: 64px/4rem | weight: extra bold/800',
        <h1>{sampleText}</h1>
      )}
      {renderHeading(
        <h1>Heading 1</h1>,
        'size: 48px/3rem | weight: extra bold/800',
        <h1>{sampleText}</h1>
      )}
      {renderHeading(
        <h2>Heading 2</h2>,
        'size: 40px/2.5rem | weight: extra bold/800',
        <h2>{sampleText}</h2>
      )}
      {renderHeading(
        <h3>Heading 3</h3>,
        'size: 32px/2rem | weight: bold/700',
        <h3>{sampleText}</h3>
      )}
      {renderHeading(
        <h4>Heading 4</h4>,
        'size: 24px/1.5rem | weight: bold/700',
        <h4>{sampleText}</h4>
      )}
      {renderHeading(
        <h5>Heading 5</h5>,
        'size: 18px/1.125rem | weight: medium/500',
        <h5>{sampleText}</h5>
      )}
      {renderHeading(
        <h6>Heading 6</h6>,
        'size: 16px/1rem | weight: normal/400',
        <h6>{sampleText}</h6>
      )}
    </div>
  );
};
