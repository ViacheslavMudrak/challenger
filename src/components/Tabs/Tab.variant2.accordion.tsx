import { ComponentParams, ComponentRendering } from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import { SyntheticEvent, useEffect, useState } from 'react';
import TabItemLocation, { TabItemLocationProps } from './Tab.item.location';
import { ChevronDownIcon } from 'components/Icons';
import { IconColor, IconSize } from 'components/Icons/icon.types';
export interface TabVariant2AccordionProps {
  rendering: ComponentRendering & { params: ComponentParams };
}

const TabVariant2Accordion = (props: TabVariant2AccordionProps) => {
  const phKey = `tab-container`;
  const items = props.rendering;
  const containerStyles = props?.rendering?.params?.Styles || '';
  const uniqueId = props?.rendering?.params?.RenderingIdentifier || '';
  const [selectedAccordionId, setSelectedAccordionId] = useState<string>('');

  useEffect(() => {
    if (items && items.placeholders) {
      const tabItems = items.placeholders[phKey].filter((i: ComponentRendering) =>
        (i.componentName || '').toLowerCase().startsWith('tab.item')
      );

      if (tabItems && tabItems.length > 0) {
        const hash = (window.location.hash || '').replace('#', '').toLocaleLowerCase();

        if (hash) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const selectedItem = tabItems.find((t: any) =>
            (t.fields?.Link?.value?.text || '').toLocaleLowerCase().startsWith(hash)
          );

          if (selectedItem) {
            setSelectedAccordionId((selectedItem as ComponentRendering)?.uid || '');
          }
        }
      }
    }
  }, [items, phKey]);

  if (!items || !items.placeholders) {
    return null;
  }

  const tabItems = items.placeholders[phKey].filter((i: ComponentRendering) =>
    (i.componentName || '').toLowerCase().startsWith('tab.item')
  );

  const handleAccordionItemClick = (e: SyntheticEvent, uid?: string) => {
    if (uid !== '' && uid === selectedAccordionId) {
      setSelectedAccordionId('');
    } else {
      e.currentTarget.scrollIntoView();
      setSelectedAccordionId(uid || '');
    }
  };

  const renderAccordionItems = () => {
    if (tabItems && tabItems.length > 0) {
      const items = tabItems.map((item) => {
        const mappedItem = {
          rendering: item,
        } as TabItemLocationProps;

        const accordionId = mappedItem.rendering.uid;

        return (
          <div key={accordionId} className="flex w-full flex-col">
            <div
              onClick={(e) => handleAccordionItemClick(e, accordionId)}
              key={accordionId}
              className={classNames(
                'flex w-full cursor-pointer items-center justify-between gap-5 py-6',
                {
                  'border-l-8 border-l-challenger-green bg-white':
                    selectedAccordionId === accordionId,
                },
                {
                  'border-l-[2px] border-l-grey bg-grey-light': selectedAccordionId !== accordionId,
                },
                'font-roboto-700 text-xl text-bright-navy'
              )}
            >
              <div className="pl-5">{mappedItem.rendering.fields.Link?.value.text}</div>
              <div className="pr-5">
                <ChevronDownIcon
                  color={IconColor.Navy}
                  size={IconSize.Md}
                  title={selectedAccordionId === accordionId ? 'Collapse' : 'Expand'}
                  className={classNames('group-hover:fill-blue', {
                    'tab-accordion-chevron-up rotate-180 fill-blue':
                      selectedAccordionId === accordionId,
                    'tab-accordion-chevron-down': selectedAccordionId !== accordionId,
                  })}
                />
              </div>
            </div>
            <div
              className={classNames(
                'w-full bg-white',
                'border-l-8 border-l-challenger-green',
                selectedAccordionId === mappedItem.rendering.uid ? 'tab-accordion-expand' : 'hidden'
              )}
            >
              <TabItemLocation rendering={mappedItem.rendering} />
            </div>
          </div>
        );
      });

      return <div className={classNames('flex w-full flex-col')}>{items}</div>;
    }

    return null;
  };

  return (
    <div
      id={uniqueId}
      className={classNames(
        'relative drop-shadow-md lg:hidden',
        'flex w-full flex-col items-start gap-5',
        containerStyles
      )}
    >
      {renderAccordionItems()}
    </div>
  );
};

export default TabVariant2Accordion;
