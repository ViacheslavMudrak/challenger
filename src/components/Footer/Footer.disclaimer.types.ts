import { ComponentParams, ComponentRendering, Field } from '@sitecore-content-sdk/nextjs';

export interface Fields {
  data: {
    personaValue: {
      DisclaimerText: Field<string>;
      DisclaimerGeneralText: Field<string>;
    };
    defaultValue: {
      DisclaimerText: Field<string>;
      DisclaimerGeneralText: Field<string>;
    };
  };
}

export interface DisclaimerProps {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: Fields };
}
