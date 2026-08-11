import { ComponentParams, ComponentRendering, Field, Text } from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import React from 'react';
import { HeadingType } from '../Form.types';
import { CheckIcon } from 'components/Icons';
import { IconColor, IconSize } from 'components/Icons/icon.types';

export type FormSubscriptionCompleteFields = {
  Heading?: Field<string>;
  HeadingLevel?: {
    fields: {
      Level: Field<string>;
    };
  };
  Content?: Field<string>;
};

export interface FormSubscriptionCompleteProps {
  rendering: ComponentRendering & { params: ComponentParams } & {
    fields: FormSubscriptionCompleteFields;
  };
}

const FormSubscriptionComplete = (props: FormSubscriptionCompleteProps) => {
  const { Content, Heading, HeadingLevel } = props.rendering.fields;
  const CustomHeading = (HeadingLevel?.fields?.Level?.value as HeadingType) || 'h3';

  return (
    <div
      className={classNames(
        'relative flex w-full flex-col items-center justify-center gap-3 px-6 xl:flex-row xl:px-24 xl:py-3'
      )}
    >
      <div className="flex w-full flex-col items-center lg:mt-8 lg:w-[600px]">
        <CheckIcon color={IconColor.Green} size={IconSize.Xl} />
        <CustomHeading
          className={classNames(
            'text-center font-roboto-700 text-[40px] leading-[3rem] text-challenger-green xl:leading-none'
          )}
        >
          <Text field={Heading} />
        </CustomHeading>
        <span className="mt-5 py-3 text-center text-white">
          <Text field={Content} />
        </span>
      </div>
    </div>
  );
};

export default FormSubscriptionComplete;
