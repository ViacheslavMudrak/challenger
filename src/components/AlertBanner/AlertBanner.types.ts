import { Field, RichTextField } from '@sitecore-content-sdk/nextjs';

export enum AlertBannerDecorativeColors {
  darkgreen = '#48A23F',
  yellow = '#FFC107',
  navy = '#00205B',
  green = '#B5BD00',
  none = '',
}

interface DropListSelectableRichTextField {
  [key: string]: unknown;
  fields?: {
    Text?: RichTextField;
  };
}

export interface AlertBannerRendering {
  [key: string]: unknown;
  fields: {
    AlertFrom: Field;
    AlertTo: Field;
    AlertMessage: DropListSelectableRichTextField;
    ShowAlert?: Field;
    DecorativeLineColor: Field<string>;
  };
}
