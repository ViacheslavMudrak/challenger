import React from 'react';
import { Field, RichTextField, RichText, ComponentRendering } from '@sitecore-content-sdk/nextjs';

export interface PdfRichTextFields {
  richTextContent?: Field<string> | RichTextField;
  theme?: Field<string> | string;
}

export interface PdfRichTextProps {
  params?: { [key: string]: string };
  fields?: PdfRichTextFields;
  rendering?: ComponentRendering;
}

export const Default = ({ fields, params }: PdfRichTextProps): React.JSX.Element => {
  if (!fields?.richTextContent) {
    return <></>;
  }

  // Extract theme value from Field<string> or use string directly
  const themeField = fields.theme;
  let theme = '';

  if (themeField) {
    // Check if it's an object (but not null, since typeof null === 'object' in JS)
    if (typeof themeField === 'object' && themeField !== null && 'value' in themeField) {
      console.log('RwcPdfRichText full object:', themeField);
      theme = themeField.value || '';
      console.log('in if', theme);
    } else if (typeof themeField === 'string') {
      theme = themeField;
      console.log('in else if', theme);
    } else {
      // Debug: log what we're getting if it doesn't match expected types
      console.warn('RwcPdfRichText: Unexpected themeField type:', typeof themeField, themeField);
    }
  } else {
    console.log('RWCPDFRichText, in else which means no themefield');
  }

  theme = theme || params?.Style || '';
  const richTextContent = fields.richTextContent;

  return (
    <div className={`pdf-report-rich-text ${theme}`}>
      {typeof richTextContent === 'object' && 'value' in richTextContent ? (
        <RichText field={richTextContent as RichTextField} />
      ) : (
        <div>{richTextContent as string}</div>
      )}
    </div>
  );
};
