import React from 'react';
import { Field, RichText as JssRichText } from '@sitecore-content-sdk/nextjs';
import { useSitecore } from 'lib/challenger/useSitecore';
import {
  getFixedTermValue,
  getUpdatedContentReplacedWithRate,
} from 'lib/challenger/fixedTerm.helper';
import { useFixedTermRates } from 'lib/challenger/useFixedTermRates';

interface Fields {
  Text: Field<string>;
}

export type RichTextProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: RichTextProps): React.JSX.Element => {
  const { isEditMode } = useSitecore();
  const field = props?.fields?.Text;
  const contentTerms = getFixedTermValue(field?.value, isEditMode);
  const rates = useFixedTermRates(contentTerms);

  if (!isEditMode && field?.value && rates) {
    field.value = getUpdatedContentReplacedWithRate(field.value, rates);
  }

  const text = props.fields ? (
    <JssRichText field={props.fields.Text} />
  ) : (
    <span className="is-empty-hint">Rich text</span>
  );
  const id = props.params.RenderingIdentifier;

  return (
    <div
      className={`component rich-text ${props.params.styles.trimEnd()}`}
      id={id ? id : undefined}
    >
      <div className="component-content">{text}</div>
    </div>
  );
};
