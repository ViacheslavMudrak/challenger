import { Field } from '@sitecore-content-sdk/nextjs';

export enum Variant {
  Divider1Top = 'Divider1Top',
  Divider1Bottom = 'Divider1Bottom',
  Divider2Top = 'Divider2Top',
  Divider2Bottom = 'Divider2Bottom',
  Divider3Top = 'Divider3Top',
  Divider3Bottom = 'Divider3Bottom',
  Divider4Top = 'Divider4Top',
  Divider4Bottom = 'Divider4Bottom',
  Divider5Top = 'Divider5Top',
  Divider5Bottom = 'Divider5Bottom',
  Divider6Top = 'Divider6Top',
  Divider6Bottom = 'Divider6Bottom',
  None = 'none',
}

export enum DividerColor {
  Grey = 'bg-grey-light',
  White = 'bg-white',
  Navy = 'bg-bright-navy',
  Green = 'bg-challenger-green',
  Blue = 'bg-blue',
  Teal = 'bg-deep-teal',
  DeepBlue = 'bg-deep-blue',
  LightBlue = 'bg-light-blue',
  None = '',
}

export type DividerFields = {
  DividerColorTop1?: {
    fields: {
      Color: Field<string>;
    };
  };
  DividerColorTop2?: {
    fields: {
      Color: Field<string>;
    };
  };
  DividerColorBottom1?: {
    fields: {
      Color: Field<string>;
    };
  };
  DividerColorBottom2?: {
    fields: {
      Color: Field<string>;
    };
  };
  DividerTopBgColor?: {
    fields: {
      Color: Field<string>;
    };
  };
  DividerBottomBgColor?: {
    fields: {
      Color: Field<string>;
    };
  };
};
