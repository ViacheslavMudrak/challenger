import Script from 'next/script';
import { ComponentParams, ComponentRendering, Field } from '@sitecore-content-sdk/nextjs';

export type AnalyticsFields = {
  Script?: {
    value: Field<string>;
  };
};

export interface AnalyticsProps {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: AnalyticsFields };
}

const Analytics = (props: AnalyticsProps) => {
  return (
    <>
      <Script src={`${props.rendering.fields.Script?.value}`} async />
    </>
  );
};

export default Analytics;
