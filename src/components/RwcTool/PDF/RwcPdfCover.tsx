import React from 'react';
import {
  Field,
  ImageField,
  RichTextField,
  RichText,
  NextImage,
  ComponentRendering,
} from '@sitecore-content-sdk/nextjs';

export interface PdfCoverFields {
  PreTitle?: Field<string> | RichTextField;
  Title?: Field<string> | RichTextField;
  Date?: Field<string> | RichTextField;
  Image?: ImageField;
  Logo?: ImageField;
}

export interface PdfCoverProps {
  params?: { [key: string]: string };
  fields?: PdfCoverFields;
  rendering?: ComponentRendering;
}

const renderField = (field?: Field<string> | RichTextField) => {
  if (!field) return null;
  if (typeof field === 'object' && 'value' in field) {
    return <RichText field={field as RichTextField} />;
  }
  return <div>{field as string}</div>;
};

export const Default = ({ fields }: PdfCoverProps): React.JSX.Element => {
  if (!fields) {
    return <></>;
  }

  return (
    <div className="pdf-report-cover-page">
      {fields.PreTitle && (
        <div className="pdf-report-cover-page-pretitle">{renderField(fields.PreTitle)}</div>
      )}
      {fields.Title && <h1 className="pdf-report-cover-page-title">{renderField(fields.Title)}</h1>}
      {fields.Date && <div className="pdf-report-cover-page-date">{renderField(fields.Date)}</div>}
      {fields.Image && (
        <div className="pdf-report-cover-page-image">
          <NextImage field={fields.Image} />
        </div>
      )}
      {fields.Logo && (
        <div className="pdf-report-cover-page-logo">
          <NextImage field={fields.Logo} />
        </div>
      )}
    </div>
  );
};
