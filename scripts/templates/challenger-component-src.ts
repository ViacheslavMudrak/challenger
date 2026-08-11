/**
 * Generates React boilerplate for a component under `src/components`
 * @param componentName - the component name
 * @returns component src boilerplate as a string
 */
function generateComponentSrc(componentName: string): string {
  return `import React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ${componentName}Props } from './${componentName}.types';

const ${componentName} = (props: ${componentName}Props): JSX.Element => {
  return (
    <div className="component text-center">
      <div className="border-gray-200 border">
        <Text className="card new components" field={props.rendering.fields.Title} />
      </div>
    </div>
  );
};

export default ${componentName};
`;
}

export default generateComponentSrc;
