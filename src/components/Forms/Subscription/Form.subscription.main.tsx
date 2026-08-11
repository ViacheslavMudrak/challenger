import {
  ComponentParams,
  ComponentRendering,
  Field,
  Text,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import React from 'react';
import { HeadingType } from '../Form.types';

export type FormSubscriptionMainFields = {
  Heading?: Field<string>;
  HeadingLevel?: {
    fields: {
      Level: Field<string>;
    };
  };
  Content?: Field<string>;
};

export interface FormSubscriptionMainProps {
  rendering: ComponentRendering & { params: ComponentParams } & {
    fields: FormSubscriptionMainFields;
  };
}

const FormSubscriptionMain = (props: FormSubscriptionMainProps) => {
  const { Content, Heading, HeadingLevel } = props.rendering.fields;
  const phKeyForm = 'form-subscription';
  const CustomHeading = (HeadingLevel?.fields?.Level?.value as HeadingType) || 'h3';

  return (
    <div
      {...(props.rendering?.params?.RenderingIdentifier && {
        id: props.rendering.params.RenderingIdentifier,
      })}
      className={classNames(
        'relative -top-16 flex w-full flex-col gap-3 px-6 md:-top-8 xl:top-0 xl:flex-row xl:px-24 xl:py-3'
      )}
    >
      <div className="flex w-full flex-col lg:mt-20 lg:w-6/12 xl:pr-7">
        <CustomHeading
          className={classNames(
            'font-roboto-700 text-[40px] leading-[3rem] text-white xl:leading-none'
          )}
        >
          <Text field={Heading} />
        </CustomHeading>
        <span className="py-3 text-left text-white">
          <Text field={Content} />
        </span>
      </div>
      <div className="w-full xl:w-6/12">
        <Placeholder key={phKeyForm} name={phKeyForm} rendering={props.rendering} />
      </div>
    </div>
  );
};

export default FormSubscriptionMain;
