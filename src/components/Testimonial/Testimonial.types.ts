import {
  ComponentParams,
  ComponentRendering,
  ImageField,
  RichTextField,
  TextField,
} from '@sitecore-content-sdk/nextjs';

export interface TestimonialDataProps {
  fields: {
    Id: TextField;
    Quote: RichTextField;
    SubQuote: RichTextField;
    Logo: ImageField;
  };
}

export interface TestimonialProps {
  rendering: ComponentRendering & { params: ComponentParams } & {
    fields: { List: TestimonialDataProps[] };
  };
}
