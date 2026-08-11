/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { RichText as JssRichText, useSitecore, RichTextField } from '@sitecore-content-sdk/nextjs';

interface Fields {
  Content: RichTextField;
}

type PageContentProps = {
  params: { [key: string]: string };
  fields: Fields;
};

type ComponentContentProps = {
  id: string;
  styles: string;
  children: React.JSX.Element;
};

const ComponentContent = (props: ComponentContentProps) => {
  const id = props.id;
  return (
    <div className={`component content ${props.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <div className="field-content">{props.children}</div>
      </div>
    </div>
  );
};

export const Default = (props: PageContentProps): React.JSX.Element => {
  const { page: sitecoreContext } = useSitecore();
  const id = props.params.RenderingIdentifier;

  if (
    !(props.fields && props.fields.Content) &&
    !(sitecoreContext as any)?.route?.fields?.Content
  ) {
    return (
      <div className={`component content ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-content">[Content]</div>
        </div>
      </div>
    );
  }

  const field = (
    props.fields && props.fields.Content
      ? props.fields.Content
      : (sitecoreContext as any)?.route?.fields?.Content
  ) as RichTextField;

  return (
    <ComponentContent styles={props.params.styles} id={id}>
      <JssRichText field={field} />
    </ComponentContent>
  );
};
