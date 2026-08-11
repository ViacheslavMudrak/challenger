import { ComponentParams, ComponentRendering } from '@sitecore-content-sdk/nextjs';

/**
 * Shared component props
 */
export type ComponentProps = {
  rendering: ComponentRendering;
  params: ComponentParams;
};

/**
 * Component props with context
 * You can access `sitecoreContext` by withSitecoreProvider/useSitecore
 * @example withSitecoreProvider()(ContentBlock)
 * @example const { page: sitecoreContext } = useSitecore()
 */
export type ComponentWithContextProps = ComponentProps & {
  sitecoreContext: Record<string, unknown>;
};
