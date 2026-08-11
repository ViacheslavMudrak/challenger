/**
 * Generates React boilerplate for a component under `src/components`
 * @param componentName - the component name
 * @returns component src boilerplate as a string
 */
function generateComponentStories(componentName: string): string {
  return `import type { Meta, StoryFn } from '@storybook/react';
import ${componentName} from './${componentName}';
import { ${componentName}Props } from './${componentName}.types';
import ${componentName}DatasourceSample from './mocks/${componentName}DatasourceSample.json';
import { flatten, unflatten } from 'flat';
import { mappedObjects } from 'scripts/storybook/storybook.sitecore.types';
import { StorybookToSitecore } from 'scripts/storybook/stories.mapper';

// Remove Fields you dont want to display in Editing Storybook
const propertiesToRemove = ['rendering.fields.Title'];

// Add the properties that will simplify sc fields value
interface SimplifiedProps extends Partial<${componentName}Props> {
  SbTitle?: string;
}

// Map the new fields above to read the properties from the SC complex fields.
// original path accept the nested ath which is the sitecore nested fields that you need to extract
const fieldMapping: mappedObjects[] = [
  {
    fieldName: 'SbTitle',
    originalPath: 'rendering.fields.Title.value',
    description: 'Title',
    control: 'text',
    options: [],
  },
];

const jsonForSCControl = ${componentName}DatasourceSample as ${componentName}Props;
const converter = new StorybookToSitecore<${componentName}Props,SimplifiedProps>(jsonForSCControl, fieldMapping, propertiesToRemove);

const meta = {
  title: 'Components/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'fullscreen',
    jest: [],
  },
  tags: ['autodocs'],
  argTypes: converter.getTypes(),
  args: flatten(converter.getSBFields(jsonForSCControl)),
} satisfies Meta<SimplifiedProps>;

export default meta;

export const Default: StoryFn<typeof ${componentName}> = (args: SimplifiedProps) => {
  const { rendering } = converter.getSCFields(unflatten(args) as SimplifiedProps) as ${componentName}Props;

  return <${componentName} rendering={rendering} />;
};
`;
}

export default generateComponentStories;
