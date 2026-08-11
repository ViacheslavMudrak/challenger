import path from 'path';
import { scaffoldFile } from '@sitecore-jss/sitecore-jss-dev-tools';
import generateComponentStories from 'scripts/templates/challenger-component-stories';
import { ScaffoldComponentPlugin, ScaffoldComponentPluginConfig } from '..';

/**
 * Generates the component file.
 */
class ComponentStoriesPlugin implements ScaffoldComponentPlugin {
  order = 0;

  componentRootPath = 'src/components';

  exec(config: ScaffoldComponentPluginConfig) {
    const { componentName, componentPath } = config;
    const filename = `${componentName}.stories.tsx`;
    const outputFilePath = path.join(
      this.componentRootPath,
      componentPath,
      componentName,
      filename
    );
    const template = generateComponentStories(componentName);

    const componentOutputPath = scaffoldFile(outputFilePath, template);

    return {
      ...config,
      componentOutputPath,
    };
  }
}

export const componentStoriesPlugin = new ComponentStoriesPlugin();
