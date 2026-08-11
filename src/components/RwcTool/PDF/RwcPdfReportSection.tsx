import React from 'react';
import { ComponentRendering, Placeholder } from '@sitecore-content-sdk/nextjs';

export interface PdfSectionFields {
  addPageBreak?: boolean;
  addMargin?: boolean;
}

export interface PdfSectionProps {
  params?: { [key: string]: string };
  fields?: PdfSectionFields;
  rendering?: ComponentRendering;
}

export const Default = ({ fields, rendering }: PdfSectionProps): React.JSX.Element => {
  const addBreak = fields?.addPageBreak || false;
  const addMargin = fields?.addMargin || false;

  let cssClass = 'pdf-report-drive';
  if (addBreak) {
    cssClass += ' pdf-report-section';
  }
  if (addMargin) {
    cssClass += ' include-margin';
  }

  return (
    <div className={cssClass}>
      {rendering && <Placeholder name="pdf-report-content-section" rendering={rendering} />}
    </div>
  );
};
