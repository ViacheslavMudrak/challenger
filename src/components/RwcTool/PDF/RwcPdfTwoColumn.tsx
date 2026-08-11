import React from 'react';
import {
  Field,
  RichTextField,
  RichText,
  ComponentRendering,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';

export interface PdfTwoColumnFields {
  addPageBreak?: boolean;
  addMargin?: boolean;
  richTextContent?: Field<string> | RichTextField;
  theme?: string;
}

export interface PdfTwoColumnProps {
  params?: { [key: string]: string };
  fields?: PdfTwoColumnFields;
  rendering?: ComponentRendering;
}

export const Default = ({ fields, params, rendering }: PdfTwoColumnProps): React.JSX.Element => {
  const addBreak = fields?.addPageBreak === true;
  const addMargin = fields?.addMargin === true;
  const theme = fields?.theme || params?.theme || '';
  const richTextContent = fields?.richTextContent;

  let cssClass = 'pdf-report-drive';
  if (addBreak) {
    cssClass += ' pdf-report-section';
  }
  if (addMargin) {
    cssClass += ' include-margin';
  }

  return (
    <div className={cssClass}>
      {richTextContent && (
        <div className={`pdf-report-rich-text ${theme}`}>
          {typeof richTextContent === 'object' && 'value' in richTextContent ? (
            <RichText field={richTextContent as RichTextField} />
          ) : (
            <div>{richTextContent as string}</div>
          )}
        </div>
      )}
      <div className="two-column">
        <div className="col1">
          <Placeholder name="col1" rendering={rendering as ComponentRendering} />
        </div>
        <div className="col2">
          <Placeholder name="col2" rendering={rendering as ComponentRendering} />
        </div>
      </div>
    </div>
  );
};
