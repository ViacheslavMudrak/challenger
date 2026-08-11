import type { Meta, StoryFn } from '@storybook/react';
import POCCard from './POCCard';
import { POCCardProps } from './POCCard.types';
import POCCardDatasourceSample from './mocks/POCCardDatasourceSample.json';
import { flatten, unflatten } from 'flat';
import { mappedObjects } from 'scripts/storybook/storybook.sitecore.types';
import { StorybookToSitecore } from 'scripts/storybook/stories.mapper';

// Remove Fields you dont want to display in Editing Storybook
const propertiesToRemove = ['rendering.fields.CardImage', 'rendering.fields.CardTitleStyle'];

// Add the properties that will simplify sc fields value
interface SimplifiedProps extends Partial<POCCardProps> {
  SbCardImage?: string;
  SbCardTitleStyle?: string;
}

// Map the new fields above to read the properties from the SC complex fields.
// original path accept the nested ath which is the sitecore nested fields that you need to extract
const fieldMapping: mappedObjects[] = [
  {
    fieldName: 'SbCardImage',
    originalPath: 'rendering.fields.CardImage.value.src',
    description: 'CardImage',
    control: 'select',
    options: ['sample.jpg', 'sample1.jpg', 'sample2.jpg', 'none'],
  },
  {
    fieldName: 'SbCardTitleStyle',
    originalPath: 'rendering.fields.CardTitleStyle.fields.HeaderType.value',
    control: 'select',
    options: ['h2', 'h4', 'none'],
  },
];

const jsonForSCControl = POCCardDatasourceSample as POCCardProps;
const converter = new StorybookToSitecore<POCCardProps, SimplifiedProps>(
  jsonForSCControl,
  fieldMapping,
  propertiesToRemove
);

const meta = {
  title: 'Other/POCCard',
  component: POCCard,
  parameters: {
    layout: 'fullscreen',
    jest: [],
  },
  tags: ['autodocs'],
  argTypes: converter.getTypes(),
  args: flatten(converter.getSBFields(jsonForSCControl)),
} satisfies Meta<SimplifiedProps>;

export default meta;

export const Default: StoryFn<typeof POCCard> = (args: SimplifiedProps) => {
  const { rendering } = converter.getSCFields(unflatten(args) as SimplifiedProps) as POCCardProps;

  return <POCCard rendering={rendering} />;
};
