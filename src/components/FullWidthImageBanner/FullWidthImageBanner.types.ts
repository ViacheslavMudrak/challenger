import {
  ComponentParams,
  ComponentRendering,
  Field,
  ImageField,
  TextField,
} from '@sitecore-content-sdk/nextjs';

interface Color {
  fields: { Color: Field<string> };
}

interface Alignment {
  fields: { Alignment: Field<string> };
}

interface HeightProps {
  fields: { Size: Field<string> };
}

interface VAlignment {
  fields: { Alignment: Field<string> };
}

export interface FullWidthImageBannerProps {
  rendering: ComponentRendering & { params: ComponentParams } & {
    fields: {
      Image: ImageField;
      FocalX: number;
      FocalY: number;
      OverlayColor: Color;
      OverlayOpacity: TextField;
      ButtonAlignment: Alignment;
      Heading: TextField;
      HeadingAlignment: Alignment;
      HeadingColor: Color;
      Subheading: TextField;
      SubheadingAlignment: Alignment;
      SubheadingColor: Color;
      Disclaimer: TextField;
      DisclaimerAlignment: Alignment;
      DisclaimerColor: Color;
      Height: HeightProps;
      VerticalAlignment: VAlignment;
      UseSEO: boolean;
    };
  };
}
