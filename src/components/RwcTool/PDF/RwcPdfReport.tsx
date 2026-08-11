import React from 'react';
import { Field, ComponentRendering, Placeholder } from '@sitecore-content-sdk/nextjs';

export interface PdfReportFields {
  theme?: Field<string> | string;
}

export interface PdfReportProps {
  params: { [key: string]: string };
  fields?: PdfReportFields;
  rendering?: ComponentRendering;
}

export const Default = ({ fields, params, rendering }: PdfReportProps): React.JSX.Element => {
  // Extract theme value from Field<string> or use string directly
  const themeField = fields?.theme;
  let theme = '';

  if (themeField) {
    // Check if it's an object (but not null, since typeof null === 'object' in JS)
    if (typeof themeField === 'object' && themeField !== null && 'value' in themeField) {
      theme = themeField.value || '';
      console.log('in if', theme);
    } else if (typeof themeField === 'string') {
      theme = themeField;
      console.log('in else if', theme);
    } else {
      // Debug: log what we're getting if it doesn't match expected types
      console.warn('RwcPdfReport: Unexpected themeField type:', typeof themeField, themeField);
    }
  } else {
    console.log('RWCPDFReport: in else which means no themefield');
  }

  theme = theme || params?.Style || '';

  return (
    <div className={`pdf-report-drive ${theme} pdf-report-drive-results`}>
      {rendering && <Placeholder name="pdf-report-content" rendering={rendering} />}
    </div>
  );
};
