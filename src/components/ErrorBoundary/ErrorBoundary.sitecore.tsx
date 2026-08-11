import { ComponentParams, ComponentRendering, Field, Text } from '@sitecore-content-sdk/nextjs';
import { RichText } from '@sitecore-content-sdk/react';
import { useAnalytics } from 'lib/challenger/useAnalytics';

type Fields = {
  Heading?: Field<string>;
  Message?: Field<string>;
  Content?: Field<string>;
};

export interface ErrorProps {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: Fields };
}

const ErrorBoundarySitecore = (props: ErrorProps) => {
  const { Heading, Message, Content } = props.rendering.fields;
  const { linkComponent } = useAnalytics(props.rendering);

  return (
    <div link_component={linkComponent} className="flex w-full flex-col gap-5 py-5 font-roboto-400">
      <h1 className="font-roboto-700 text-3xl">
        <Text field={Heading} />
      </h1>
      <div className="flex w-full flex-col gap-2 ">
        <span error_message={Message?.value} className="text-bright-navy">
          <RichText field={Content} />
        </span>
      </div>
    </div>
  );
};

export default ErrorBoundarySitecore;
