import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { setCookie, getCookie } from 'cookies-next';
import { PersonaItem } from './Nav.types';
import { ComponentParams, ComponentRendering } from '@sitecore-content-sdk/nextjs';
import { useRouter } from 'next/router';
import { useSitecore } from 'lib/challenger/hooks';
import { COOKIE_USER_TYPE_NAME, DEFAULT_URL } from 'src/constants';

type PersonaItemField = {
  items: PersonaItem[];
};

export interface NavPersonaProps {
  params: { [key: string]: string };
  rendering: ComponentRendering & { params: ComponentParams } & { fields: PersonaItemField };
}

const NavPersona = (props: NavPersonaProps) => {
  const [selectedItem, setSelectedItem] = useState<PersonaItem>();
  const userCookie = getCookie(COOKIE_USER_TYPE_NAME);
  const router = useRouter();
  const { items } = props.rendering.fields;
  const { isEditMode, isPreviewMode, getPagePersona } = useSitecore();

  useEffect(() => {
    if (userCookie) {
      const defaultItem = items.find((item) => item.fields.CookieValue?.value === userCookie);

      if (defaultItem) {
        setSelectedItem(defaultItem);
      }
    } else {
      const pagePersona = getPagePersona();
      const defaultItem = items.find((i) => i.fields.IsDefault.value);
      const pagePersonaItem = items.find((i) => i.fields.CookieValue?.value === pagePersona);

      if (pagePersonaItem) {
        setSelectedItem(pagePersonaItem);
      } else if (defaultItem) {
        setSelectedItem(defaultItem);
      }
    }
  }, [getPagePersona, items, selectedItem, userCookie]);

  const handleClick = (item: PersonaItem) => {
    setCookie(COOKIE_USER_TYPE_NAME, item.fields.CookieValue?.value);
    setSelectedItem(item);

    if (!isEditMode && !isPreviewMode) {
      router.push(item.fields.Link.value.href || DEFAULT_URL);
    }
  };

  return (
    <div className="flex justify-between">
      <ul className="relative -left-3 hidden h-full items-center gap-2 xl:flex">
        {items.map((item: PersonaItem) => {
          return (
            <li
              key={item.name}
              className={classNames(
                'cursor-pointer px-3 py-3 hover:underline hover:underline-offset-4',
                {
                  'bg-blue':
                    item.fields.CookieValue?.value === selectedItem?.fields.CookieValue?.value,
                }
              )}
              onClick={() => handleClick(item)}
            >
              {item.name}
              <a href={item.fields.Link.value.href} className="hidden">
                {item.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NavPersona;
