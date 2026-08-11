import { ComponentParams, ComponentRendering, Field } from '@sitecore-content-sdk/nextjs';

export interface Fields {
  Text: Field<string>;
}

export interface SloganProps {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: Fields };
}
