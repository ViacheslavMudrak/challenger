import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
  RichText,
  Field,
} from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import { LinkField, Link as JssLink } from '@sitecore-content-sdk/nextjs';
import React from 'react';
import { useSitecore } from 'lib/challenger/hooks';

export type TabItemLocationFields = {
  Link?: LinkField;
  Content?: Field<string>;
};

export interface TabItemLocationProps {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: TabItemLocationFields };
}

const TabItemLocation = (props: TabItemLocationProps) => {
  const { Link = {}, Content } = props.rendering.fields;
  const { isEditMode } = useSitecore();
  const phKey = 'tab-item-location';

  return (
    <div
      className={classNames(
        'relative flex w-full flex-col',
        { 'p-5': isEditMode },
        { 'bg-white': !isEditMode }
      )}
    >
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
      <div
        className={classNames(
          'flex h-full w-full flex-col lg:flex-row',
          { 'bg-white': !isEditMode },
          {
            'relative -top-[2px] w-full border-b-2 border-l-2 border-r-2 border-t-2 border-blue p-5':
              isEditMode,
          }
        )}
      >
        <div
          className={classNames(
            'w-full px-5 text-left lg:w-[320px] lg:p-6',
            '[&_h3]:text-base [&_h3]:text-bright-navy',
            '[&_h4]:text-base [&_h4]:text-bright-navy',
            '[&_p]:pb-5 [&_p]:pt-3 [&_span]:block [&_span]:pb-5 [&_span]:pt-3'
          )}
        >
          <RichText field={Content} />
        </div>
        <div
          className={classNames(
            'tab-item-location z-30 min-h-[300px] w-full lg:w-[calc(100%-320px)]',
            {
              'max-h-96 min-h-[300px] overflow-y-auto': isEditMode,
            }
          )}
        >
          <Placeholder key={phKey} name={phKey} rendering={props.rendering} />
        </div>
      </div>
    </div>
  );
};

export default TabItemLocation;
