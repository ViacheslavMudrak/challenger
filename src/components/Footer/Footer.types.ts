import { ComponentParams, ComponentRendering } from '@sitecore-content-sdk/nextjs';

export interface FooterProps {
  rendering: ComponentRendering & { params: ComponentParams };
}
