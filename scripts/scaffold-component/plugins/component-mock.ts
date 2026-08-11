import path from 'path';
import { scaffoldFile } from '@sitecore-jss/sitecore-jss-dev-tools';
import generateComponentMock from 'scripts/templates/challenger-component-mock';
import { ScaffoldComponentPlugin, ScaffoldComponentPluginConfig } from '..';

/**
 * Generates the component file.
 */
class ComponentMockPlugin implements ScaffoldComponentPlugin {
  order = 0;

  componentRootPath = 'src/components';

  exec(config: ScaffoldComponentPluginConfig) {
    const { componentName, componentPath } = config;
    const filename = `${componentName}DatasourceSample.json`;
    const outputFilePath = path.join(
      this.componentRootPath,
      componentPath,
      componentName,
      'mocks',
      filename
    );
    const template = generateComponentMock(componentName);

    const componentOutputPath = scaffoldFile(outputFilePath, template);

    return {
      ...config,
      componentOutputPath,
    };
  }
}

export const componentMockPlugin = new ComponentMockPlugin();
