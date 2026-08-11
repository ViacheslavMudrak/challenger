import { ComponentParams, ComponentRendering } from '@sitecore-content-sdk/nextjs';

export const useAnalytics = (rendering?: ComponentRendering & { params: ComponentParams }) => {
  if (!rendering) {
    return {
      linkComponent: '',
    };
  }

  const dataSource = rendering.dataSource;
  const componentName = rendering.componentName;
  let defaultDataSourceName = '';
  let defaultComponentName = '';
  let detailedComponentName = '';

  if (dataSource && dataSource?.length > 0 && dataSource.lastIndexOf('/') > 0) {
    defaultDataSourceName = dataSource.substring(dataSource.lastIndexOf('/') + 1);
  }

  if (componentName && componentName?.length > 0) {
    defaultComponentName = componentName;

    if (componentName.indexOf('.') > 0 && componentName.indexOf('Nav') < 0) {
      defaultComponentName = componentName.substring(0, componentName.indexOf('.'));
    }
  }

  if (defaultDataSourceName.length > 0 && defaultComponentName.length > 0) {
    detailedComponentName = `${defaultComponentName} | ${defaultDataSourceName}`;
  }

  return {
    linkComponent:
      rendering.params?.link_component || detailedComponentName || defaultComponentName || '',
  };
};
