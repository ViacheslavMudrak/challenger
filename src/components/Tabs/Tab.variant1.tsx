import {
  ComponentParams,
  ComponentRendering,
  Field,
  Placeholder,
  Link as JssLink,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import { useAnalytics, useSitecore } from 'lib/challenger/hooks';
import TabItem, { TabItemProps } from './Tab.item';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'components/Icons';
import { IconColor, IconSize } from 'components/Icons/icon.types';
import TabItemGeneric from './Tab.item.generic';
import { DESKTOP_MEDIA_QUERY } from 'components/constants';
import { useMediaQuery } from 'usehooks-ts';
import { useRouter } from 'next/router';
import { getTabBgColour } from './Tab.helpers';

export type TabVariant1Fields = {
  Alignment?: {
    fields: {
      Alignment: Field<string>;
    };
  };
  TabHeaderBgColor?: {
    fields: {
      Color: Field<string>;
    };
  };
};

export interface TabVariant1Props {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: TabVariant1Fields };
}

const TabVariant1 = (props: TabVariant1Props) => {
  const { isEditMode } = useSitecore();
  const containerStyles = props?.rendering?.params?.Styles || '';
  const uniqueId = props?.rendering?.params?.RenderingIdentifier || '';
  const { Alignment, TabHeaderBgColor } = props.rendering.fields;
  const alignment = (Alignment?.fields?.Alignment?.value || '').toLowerCase() || 'center';
  const tabHeaderBgColor = (TabHeaderBgColor?.fields?.Color?.value || '').toLowerCase() || '';
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const phKey = `tab-container`;
  const items = props.rendering;
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [showLeftChevron, setShowLeftChevron] = useState(false);
  const [showRightChevron, setShowRightChevron] = useState(true);
  const { linkComponent } = useAnalytics(props.rendering);
  const router = useRouter();
  const tabWrapperRef = useRef<HTMLDivElement>(null);
  const tabBodyBgColor = getTabBgColour(props?.rendering?.params?.TabBodyBgColor, 1);

  useEffect(() => {
    if (items && items.placeholders) {
      const tabItems = items.placeholders[phKey].filter((i: ComponentRendering) =>
        (i.componentName || '').toLowerCase().startsWith('tab.item')
      );

      if (tabItems && tabItems.length > 0) {
        setSelectedItem((tabItems[0] as ComponentRendering)?.uid || '');
      }
    }
  }, [items, phKey]);

  useEffect(() => {
    if (isEditMode || typeof window == 'undefined') return;

    const onHashChangeStart = () => {
      const id = window?.location?.hash;

      if (id) {
        const el = tabWrapperRef.current?.querySelector(id);
        const uid = el?.getAttribute('data-uid');

        if (uid && uid !== selectedItem) {
          setSelectedItem(uid);
        }
      }
    };

    window.addEventListener('hashchange', onHashChangeStart);

    onHashChangeStart();

    return () => {
      window.removeEventListener('hashchange', onHashChangeStart);
    };
  }, []);

  if (isEditMode) {
    return (
      <div
        className={classNames(
          'relative overflow-x-auto',
          'flex w-full flex-col gap-5 p-5',
          containerStyles
        )}
      >
        <Placeholder key={phKey} name={phKey} rendering={props.rendering} />
      </div>
    );
  }

  if (!items || !items.placeholders) {
    return null;
  }

  const tabItems = items.placeholders[phKey].filter((i: ComponentRendering) =>
    (i.componentName || '').toLowerCase().startsWith('tab.item')
  );

  const hasTabBody = tabItems && tabItems.length > 0;

  const handleTabClick = (useAsAnchor: boolean, link?: LinkField, uid?: string) => {
    setSelectedItem(uid || '');

    if (useAsAnchor && link && link.value.href) {
      router.push(link.value.href);
    }
  };

  const renderTabHeader = () => {
    if (tabItems && tabItems.length > 0) {
      const items = tabItems.map((item) => {
        const mappedItem = {
          rendering: item,
        } as TabItemProps;

        const tabId = mappedItem.rendering.uid;
        const useAsAnchor = !!mappedItem.rendering.fields.UseAsAnchor?.value;
        const link = mappedItem.rendering.fields.Link;

        return (
          <li
            onClick={() => handleTabClick(useAsAnchor, link, tabId)}
            key={tabId}
            className={classNames('w-fit px-9 py-4 text-bright-navy', {
              'border-b-8 border-b-challenger-green font-roboto-700': selectedItem === tabId,
            })}
            data-uid={mappedItem.rendering.uid}
            {...(mappedItem.rendering?.params?.RenderingIdentifier && {
              id: mappedItem.rendering.params.RenderingIdentifier,
            })}
          >
            {useAsAnchor && link && <JssLink field={link} link_name={link.value.text} />}
            {!useAsAnchor && mappedItem.rendering.fields.Link?.value.text}
          </li>
        );
      });

      const handleScroll = (e: SyntheticEvent<HTMLUListElement>) => {
        const width = e.currentTarget.clientWidth;
        const scrollWidth = e.currentTarget.scrollWidth;
        const scrollLeft = e.currentTarget.scrollLeft;
        const containerWidth = scrollWidth - width;

        if (scrollLeft >= containerWidth - 100) {
          setShowRightChevron(false);
          setShowLeftChevron(true);
        } else if (scrollLeft > 100 && scrollLeft < containerWidth) {
          setShowRightChevron(true);
          setShowLeftChevron(true);
        } else if (scrollLeft === 0) {
          setShowLeftChevron(false);
          setShowRightChevron(true);
        }
      };

      return (
        <div className="relative flex w-full items-center">
          {showLeftChevron && (
            <div
              className={classNames(
                'absolute left-0 top-4 z-20 flex h-10 w-20 items-center pl-2 lg:hidden',
                'bg-gradient-to-r from-white to-transparent'
              )}
            >
              <ChevronLeftIcon size={IconSize.Md} color={IconColor.Navy} />
            </div>
          )}
          <div
            className={classNames(
              'relative flex w-full items-center gap-2',
              'border-b-2 border-b-grey-dark drop-shadow-md'
            )}
          >
            <ul
              onScroll={handleScroll}
              className={classNames(
                'mt-2 flex w-full cursor-pointer gap-2 overflow-x-auto whitespace-nowrap xl:overflow-hidden',
                {
                  'justify-center': alignment === 'center' && isDesktop,
                },
                {
                  'justify-end': alignment === 'right' && isDesktop,
                },
                {
                  'bg-white': tabHeaderBgColor === 'white',
                },
                {
                  'bg-grey-light': tabHeaderBgColor === 'grey',
                }
              )}
            >
              {items}
            </ul>
          </div>
          {showRightChevron && (
            <div
              className={classNames(
                'absolute right-0 top-4 z-20 flex h-10 w-14 items-center justify-end pr-2 lg:hidden',
                'bg-gradient-to-r from-transparent to-white'
              )}
            >
              <ChevronRightIcon size={IconSize.Md} color={IconColor.Navy} />
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const renderItems = () => {
    if (hasTabBody) {
      return tabItems.map((item) => {
        const mappedItem = {
          rendering: item,
        } as TabItemProps;

        const useAsAnchor = !!mappedItem.rendering.fields.UseAsAnchor?.value;

        if (useAsAnchor) {
          return <></>;
        }

        if (mappedItem.rendering.componentName.toLowerCase() === 'tab.item') {
          return (
            <div
              id={mappedItem.rendering.uid}
              key={mappedItem.rendering.uid}
              className={classNames(
                selectedItem === mappedItem.rendering.uid ? 'flex' : 'hidden',
                'w-full p-5 pt-5 xl:p-10 xl:pt-[40px]',
                '[&_div]:px-0',
                tabBodyBgColor
              )}
            >
              <TabItem rendering={mappedItem.rendering} />
            </div>
          );
        }

        return (
          <div
            id={mappedItem.rendering.uid}
            key={mappedItem.rendering.uid}
            className={classNames(
              selectedItem === mappedItem.rendering.uid ? 'flex' : 'hidden',
              'w-full p-5 pt-5 xl:p-10 xl:pt-[40px]',
              '[&_div]:px-0',
              tabBodyBgColor
            )}
          >
            <TabItemGeneric rendering={mappedItem.rendering} />
          </div>
        );
      });
    }

    return null;
  };

  return (
    <div
      id={uniqueId}
      link_component={linkComponent}
      className={classNames(
        'tab-variant1 relative',
        'flex w-full flex-col items-start gap-x-5',
        containerStyles
      )}
      ref={tabWrapperRef}
    >
      {renderTabHeader()}
      {hasTabBody && renderItems()}
    </div>
  );
};

export default TabVariant1;
