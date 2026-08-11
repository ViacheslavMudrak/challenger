/**
 * Generates React boilerplate for a component under `src/components`
 * @param componentName - the component name
 * @returns component src boilerplate as a string
 */
function generateComponentTypes(componentName: string): string {
  return `import { ComponentParams, ComponentRendering, Field } from '@sitecore-jss/sitecore-jss-nextjs';

export interface Fields {
  Title: Field<string>;
}

export interface ${componentName}Props {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: Fields };
}
`;
}

export default generateComponentTypes;
