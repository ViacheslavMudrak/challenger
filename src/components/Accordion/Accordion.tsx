import {
  ComponentParams,
  ComponentRendering,
  Field,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import { useAnalytics, useSitecore } from 'lib/challenger/hooks';
import AccordionItem, { AccordionItemProps } from './Accordion.item';
import { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from 'components/Icons';
import { IconColor, IconSize } from 'components/Icons/icon.types';
import * as cheerio from 'cheerio';

type AccordionColumnRendering = {
  fields?: { Text?: { value?: string } };
};

type AccordionItemRendering = {
  fields?: { Title?: { value?: string }; Text?: { value?: string } };
  placeholders?: {
    'accordion-item'?: Array<{
      fields?: { Text?: { value?: string } };
      placeholders?: {
        'column-container-a'?: AccordionColumnRendering[];
        'column-container-b'?: AccordionColumnRendering[];
        'column-container-c'?: AccordionColumnRendering[];
        'column-container-d'?: AccordionColumnRendering[];
      };
    }>;
  };
};

export type AccordionFields = {
  Alignment?: {
    fields: {
      Alignment: Field<string>;
    };
  };
};
export interface AccordionProps {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: AccordionFields };
}

const Accordion = (props: AccordionProps) => {
  const { isEditMode } = useSitecore();
  const containerStyles = props?.rendering?.params?.Styles || '';
  const phKey = `accordion-container`;
  const items = props.rendering;
  const { fields = {} } = props.rendering;
  const [selectedAccordionId, setSelectedAccordionId] = useState<string>('');
  const alignment = (fields.Alignment?.fields?.Alignment?.value || '').toLowerCase() || 'left';
  const { linkComponent } = useAnalytics(props.rendering);
  const accordionItemRef = useRef<HTMLDivElement>(null);
  const accordionWrapperRef = useRef<HTMLDivElement>(null);
  const selectedAccordionIdRef = useRef(selectedAccordionId);
  selectedAccordionIdRef.current = selectedAccordionId;
  const accordionData = props.rendering.placeholders?.['accordion-container'];

  const accordionSchemaData = accordionData?.map((rawItem) => {
    const item = rawItem as AccordionItemRendering;
    const accordionItemPlaceholder = item?.placeholders?.['accordion-item']?.[0];
    const directText = accordionItemPlaceholder?.fields?.Text?.value;
    const colArray = accordionItemPlaceholder?.placeholders;

    const text = directText
      ? cheerio.load(directText).text()
      : (() => {
          const array: string[] = [];
          const cols = [
            'column-container-a',
            'column-container-b',
            'column-container-c',
            'column-container-d',
          ] as const;
          for (const col of cols) {
            const val = colArray?.[col]?.[0]?.fields?.Text?.value;
            if (val) array.push(cheerio.load(val).text());
          }
          return array;
        })();

    return {
      '@type': 'Question',
      name: item?.fields?.Title?.value,
      acceptedAnswer: { '@type': 'Answer', text },
    };
  });

  const accordionSchema = {
    '@content': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: accordionSchemaData,
  };

  useEffect(() => {
    if (isEditMode || typeof window == 'undefined') return;

    const onHashChangeStart = () => {
      const id = window?.location?.hash;

      if (!id) return;

      const el = accordionWrapperRef.current?.querySelector(id);
      const uid = el?.getAttribute('data-uid');
      //const isScrollAdjustmentNeeded = selectedAccordionId !== '';

      if (!uid || uid === selectedAccordionIdRef.current) return;

      setSelectedAccordionId(uid);
      // if (isScrollAdjustmentNeeded) {
      //   const openedAccordionEl = accordionWrapperRef.current?.querySelector(id);
      //   openedAccordionEl && window.scrollTo(0, (openedAccordionEl as HTMLElement)?.scrollTop);
      // }
    };

    window.addEventListener('hashchange', onHashChangeStart);

    onHashChangeStart();

    return () => {
      window.removeEventListener('hashchange', onHashChangeStart);
    };
  }, [isEditMode]);

  if (isEditMode) {
    return (
      <div className={classNames('relative flex w-full flex-col gap-3 p-5', containerStyles)}>
        <Placeholder key={phKey} name={phKey} rendering={props.rendering} />
      </div>
    );
  }

  if (!items || !items.placeholders) {
    return null;
  }

  const accordionItems = items.placeholders[phKey].filter((i: ComponentRendering) =>
    (i.componentName || '').toLowerCase().startsWith('accordion.item')
  );

  const handleAccordionItemClick = (uid?: string) => {
    if (uid !== '' && uid === selectedAccordionId) {
      setSelectedAccordionId('');
    } else {
      setSelectedAccordionId(uid || '');
    }
  };

  const renderAccordionItems = () => {
    if (accordionItems && accordionItems.length > 0) {
      const renderedItems = accordionItems.map((item, idx) => {
        const mappedItem = {
          rendering: item,
        } as AccordionItemProps;

        const accordionId = mappedItem.rendering.uid;

        return (
          <div
            key={accordionId}
            className="flex w-full flex-col"
            ref={accordionItemRef}
            link_name={`${mappedItem.rendering.fields.Title?.value}:expand`}
            link_component="on-page"
            link_event="accordion-expand"
            data-uid={mappedItem.rendering.uid}
            {...(mappedItem.rendering?.params?.RenderingIdentifier && {
              id: mappedItem.rendering.params.RenderingIdentifier,
            })}
          >
            <div
              onClick={() => handleAccordionItemClick(accordionId)}
              key={accordionId}
              className={classNames(
                'flex w-full cursor-pointer items-center gap-5 py-4',
                'text-left font-roboto-700 text-lg text-bright-navy',
                { 'justify-between text-left': alignment === 'left' },
                { 'justify-center text-center': alignment === 'center' },

                'border-b-[1px] border-grey',
                { 'border-t-[1px] border-grey': idx === 0 }
              )}
            >
              <div>{mappedItem.rendering.fields.Title?.value}</div>
              <div>
                <ChevronDownIcon
                  color={IconColor.Navy}
                  size={IconSize.Md}
                  title={selectedAccordionId === accordionId ? 'Collapse' : 'Expand'}
                  className={classNames('group-hover:fill-blue', {
                    'accordion-chevron-up rotate-180 fill-blue':
                      selectedAccordionId === accordionId,
                    'accordion-chevron-down': selectedAccordionId !== accordionId,
                  })}
                />
              </div>
            </div>
            <div
              className={classNames(
                'w-full text-left',
                selectedAccordionId === mappedItem.rendering.uid ? 'accordion-expand' : 'hidden'
              )}
            >
              <AccordionItem rendering={mappedItem.rendering} />
            </div>
          </div>
        );
      });

      return <div className={classNames('flex w-full flex-col')}>{renderedItems}</div>;
    }

    return null;
  };

  return (
    <>
      <script
        id="faq_schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(accordionSchema) }}
      ></script>
      <div
        link_component={linkComponent}
        className={classNames(
          'relative',
          'flex w-full flex-col items-start gap-5 p-5',
          containerStyles
        )}
        {...(props.rendering?.params?.RenderingIdentifier && {
          id: props.rendering.params.RenderingIdentifier,
        })}
        ref={accordionWrapperRef}
      >
        {renderAccordionItems()}
      </div>
    </>
  );
};

export default Accordion;
