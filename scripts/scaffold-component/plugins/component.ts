import path from 'path';
import { scaffoldFile } from '@sitecore-jss/sitecore-jss-dev-tools';
import generateComponentSrc from 'scripts/templates/challenger-component-src';
import { ScaffoldComponentPlugin, ScaffoldComponentPluginConfig } from '..';

/**
 * Generates the component file.
 */
class ComponentPlugin implements ScaffoldComponentPlugin {
  order = 0;

  componentRootPath = 'src/components';

  exec(config: ScaffoldComponentPluginConfig) {
    const { componentName, componentPath } = config;
    const filename = `${componentName}.tsx`;
    const outputFilePath = path.join(
      this.componentRootPath,
      componentPath,
      componentName,
      filename
    );
    const template = generateComponentSrc(componentName);

    const componentOutputPath = scaffoldFile(outputFilePath, template);

    return {
      ...config,
      componentOutputPath,
    };
  }
}

export const componentPlugin = new ComponentPlugin();
