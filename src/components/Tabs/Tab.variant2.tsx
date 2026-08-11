import { ComponentParams, ComponentRendering, Placeholder } from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import { useAnalytics, useSitecore } from 'lib/challenger/hooks';
import { TabItemProps } from './Tab.item';
import { useEffect, useRef, useState } from 'react';
import TabItemGeneric from './Tab.item.generic';
import TabItemLocation, { TabItemLocationProps } from './Tab.item.location';
import TabVariant2Accordion from './Tab.variant2.accordion';
import { useMediaQuery } from 'usehooks-ts';
import { DESKTOP_MEDIA_QUERY } from 'components/constants';

export interface TabVariant2Props {
  rendering: ComponentRendering & { params: ComponentParams };
}

const TabVariant2 = (props: TabVariant2Props) => {
  const { isEditMode } = useSitecore();
  const containerStyles = props?.rendering?.params?.Styles || '';
  const uniqueId = props?.rendering?.params?.RenderingIdentifier || '';
  const phKey = `tab-container`;
  const items = props.rendering;
  const [selectedItem, setSelectedItem] = useState<string>('');
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const { linkComponent } = useAnalytics(props.rendering);
  const tabWrapperRef = useRef<HTMLDivElement>(null);

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
            setSelectedItem((selectedItem as ComponentRendering)?.uid || '');
            return;
          }
        }
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

  const handleTabClick = (uid?: string) => {
    setSelectedItem(uid || '');
  };

  const renderTabHeader = () => {
    if (tabItems && tabItems.length > 0) {
      const items = tabItems.map((item) => {
        const mappedItem = {
          rendering: item,
        } as TabItemProps;

        const tabId = mappedItem.rendering.uid;

        return (
          <li
            onClick={() => handleTabClick(tabId)}
            key={tabId}
            className="flex"
            data-uid={mappedItem.rendering.uid}
            {...(mappedItem.rendering?.params?.RenderingIdentifier && {
              id: mappedItem.rendering.params.RenderingIdentifier,
            })}
          >
            <div
              className={classNames(
                'w-2 py-6',
                {
                  'border-l-8 border-l-challenger-green ': selectedItem === tabId,
                },
                { 'border-l-[1px] border-l-grey-dark bg-grey-light': selectedItem !== tabId }
              )}
            ></div>
            <div
              className={classNames(
                'w-full px-7 py-6 text-left font-roboto-700 text-2xl text-bright-navy',
                {
                  'bg-white': selectedItem === tabId,
                },
                { 'bg-grey-light': selectedItem !== tabId }
              )}
            >
              {mappedItem.rendering.fields.Link?.value.text}
            </div>
          </li>
        );
      });

      return <ul className={classNames('flex w-full cursor-pointer flex-col')}>{items}</ul>;
    }

    return null;
  };

  const renderItems = () => {
    if (tabItems && tabItems.length > 0) {
      return tabItems.map((item) => {
        const mappedItem = {
          rendering: item,
        } as TabItemLocationProps;

        if (mappedItem.rendering.componentName.toLowerCase() === 'tab.item.location') {
          return (
            <div
              id={mappedItem.rendering.uid}
              key={mappedItem.rendering.uid}
              className={classNames(
                selectedItem === mappedItem.rendering.uid ? 'flex h-full w-full' : 'hidden'
              )}
            >
              <TabItemLocation rendering={mappedItem.rendering} />
            </div>
          );
        }

        return (
          <div
            id={mappedItem.rendering.uid}
            key={mappedItem.rendering.uid}
            className={classNames(
              selectedItem === mappedItem.rendering.uid ? 'flex' : 'hidden',
              '[&_div]:items-start [&_div]:px-0 [&_div]:py-0 [&_h3]:mt-5 [&_h3]:text-base'
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
    <>
      <div
        id={uniqueId}
        link_component={linkComponent}
        className={classNames(
          'relative hidden lg:flex',
          'h-full w-full flex-row items-start bg-grey-light',
          containerStyles
        )}
        ref={tabWrapperRef}
      >
        <div className="h-full w-[32%]">{renderTabHeader()}</div>
        <div className="h-full w-[68%]">{renderItems()}</div>
      </div>
      {!isDesktop && <TabVariant2Accordion rendering={props.rendering} />}
    </>
  );
};

export default TabVariant2;
