import { ComponentParams, ComponentRendering, Field } from '@sitecore-content-sdk/nextjs';

export interface Fields {
  Text: Field<string>;
}

export interface AcknowledgementProps {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: Fields };
}
