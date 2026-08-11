import path from 'path';
import { scaffoldFile } from '@sitecore-jss/sitecore-jss-dev-tools';
import generateComponentTypes from 'scripts/templates/challenger-component-types';
import { ScaffoldComponentPlugin, ScaffoldComponentPluginConfig } from '..';

/**
 * Generates the component file.
 */
class ComponentTypesPlugin implements ScaffoldComponentPlugin {
  order = 0;

  componentRootPath = 'src/components';

  exec(config: ScaffoldComponentPluginConfig) {
    const { componentName, componentPath } = config;
    const filename = `${componentName}.types.tsx`;
    const outputFilePath = path.join(
      this.componentRootPath,
      componentPath,
      componentName,
      filename
    );
    const template = generateComponentTypes(componentName);

    const componentOutputPath = scaffoldFile(outputFilePath, template);

    return {
      ...config,
      componentOutputPath,
    };
  }
}

export const componentTypesPlugin = new ComponentTypesPlugin();
