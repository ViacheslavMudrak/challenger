import {
  ComponentParams,
  ComponentRendering,
  LinkField,
  Link as JssLink,
} from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import React from 'react';

export type CustomLinkItemFields = {
  Link?: LinkField;
};

export interface CustomLinkItemProps {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: CustomLinkItemFields };
}

const CustomLinkItem = (props: CustomLinkItemProps) => {
  const { Link } = props.rendering.fields;

  return (
    <div className={classNames('flex w-full flex-col gap-5 border-2 border-blue p-3')}>
      <span className="py-2 font-roboto-700 text-lg text-bright-navy">
        <JssLink field={Link || {}} />
      </span>
    </div>
  );
};

export default CustomLinkItem;
