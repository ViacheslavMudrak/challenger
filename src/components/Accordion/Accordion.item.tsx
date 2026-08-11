import {
  ComponentParams,
  ComponentRendering,
  Field,
  Text,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import { useSitecore } from 'lib/challenger/hooks';
import React from 'react';

export type AccordionItemFields = {
  Title?: Field<string>;
};

export interface AccordionItemProps {
  rendering: ComponentRendering & { params: ComponentParams } & {
    fields: AccordionItemFields;
  };
}

const AccordionItem = (props: AccordionItemProps) => {
  const { Title } = props.rendering.fields;
  const { isEditMode } = useSitecore();
  const phKey = `accordion-item`;

  return (
    <div
      className={classNames('flex w-full flex-col gap-5', {
        'border-2 border-blue p-3': isEditMode,
      })}
    >
      {isEditMode && (
        <span className="border-b-[1px] border-grey py-2 font-roboto-700 text-lg text-bright-navy">
          <Text field={Title} />
        </span>
      )}
      <span className="py-3">
        <Placeholder key={phKey} name={phKey} rendering={props.rendering} />
      </span>
    </div>
  );
};

export default AccordionItem;
