import { ComponentParams, ComponentRendering, Field, RichText } from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import { LinkField, Link as JssLink } from '@sitecore-content-sdk/nextjs';
import React from 'react';
import { useSitecore } from 'lib/challenger/hooks';

export type TabItemFields = {
  Content?: Field<string>;
  Link?: LinkField;
  UseAsAnchor?: Field<boolean>;
};

export interface TabItemProps {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: TabItemFields };
}

const TabItem = (props: TabItemProps) => {
  const { Content, Link = {} } = props.rendering.fields;
  const { isEditMode } = useSitecore();

  return (
    <div className={classNames('flex w-full flex-col', { 'p-5': isEditMode })}>
      {isEditMode && (
        <span
          className={classNames(
            'z-10 w-fit border-b-2 border-l-2 border-r-2 border-t-2',
            'min-w-[200px] border-blue border-b-white bg-white p-5 text-center text-bright-navy'
          )}
        >
          <JssLink field={Link} />
        </span>
      )}
      <span
        className={classNames({
          'relative -top-[2px] w-full border-b-2 border-l-2 border-r-2 border-t-2 border-blue bg-white px-5 py-10':
            isEditMode,
        })}
      >
        <RichText field={Content} />
      </span>
    </div>
  );
};

export default TabItem;
