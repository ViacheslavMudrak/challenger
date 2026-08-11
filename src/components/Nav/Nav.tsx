import {
  ComponentRendering,
  LinkFieldValue,
  Placeholder,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import { MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import NavPanel from './Nav.panel';
import { useMediaQuery, useOnClickOutside } from 'usehooks-ts';
import { JsonLink, NavItemChild, NavProps, PersonaItem } from './Nav.types';
import NavHamburger from './Nav.hamburger';
import { DEFAULT_USER_TYPE } from './Nav.constants';
import { DESKTOP_MEDIA_QUERY } from 'components/constants';
import { hasArticle, mapMenuItem } from './Nav.helpers';
import NavDrawer from './Nav.drawer';
import NavMenuItem from './Nav.menuItem';
import { DESKTOP_MAX_WIDTH } from 'components/constants';
import NavSearch from './Nav.search';
import { useAnalytics, useSitecore } from 'lib/challenger/hooks';
import { COOKIE_USER_TYPE_NAME } from 'src/constants';
import { getCookie } from 'cookies-next';

const Nav = (props: NavProps): React.JSX.Element => {
  const { fields, rendering } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [toggleNavPanel, setToggleNavPanel] = useState(false);
  const [currentItem, setCurrentItem] = useState<string>('');
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);

  const router = useRouter();
  const ref = useRef(null) as unknown as MutableRefObject<HTMLDivElement>;
  const { isEditMode, isPreviewMode, getPagePersona } = useSitecore();
  const { linkComponent } = useAnalytics(props.rendering);
  const selectedPersona = getCookie(COOKIE_USER_TYPE_NAME);

  useEffect(() => {
    if (isDesktop) {
      setIsOpen(false);
    } else {
      setToggleNavPanel(false);
      setCurrentItem('');
    }
  }, [isDesktop]);

  useOnClickOutside(ref, () => {
    setToggleNavPanel(false);
  });

  const pagePersona = getPagePersona();

  let personaNav: NavItemChild | undefined = {
    NavigationTitle: { value: '' },
    ShowInNavigation: { value: '' },
    Href: { jsonValue: { value: { href: '' } } },
  };

  if (fields && fields.data && fields.data.dataSource) {
    // get persona from page
    personaNav = fields.data.dataSource.Children.results.find(
      (c) => c.Persona?.value?.toString().toLowerCase() === pagePersona.toLowerCase()
    );

    // get persona from cookie if no nav items returned
    if (!personaNav) {
      personaNav = fields.data.dataSource.Children.results.find(
        (c) => c.Persona?.value?.toString().toLowerCase() === selectedPersona
      );
    }

    // use default persona if no nav items from cookie returned
    if (!personaNav) {
      personaNav = fields.data.dataSource.Children.results.find(
        (c) => c.Persona?.value?.toString().toLowerCase() === DEFAULT_USER_TYPE
      );
    }
  }

  const menuItems = personaNav?.Children?.results as NavItemChild[];

  const renderNavItem = (link: LinkFieldValue, hasChildren: boolean, menuId: string) => {
    const { text = '', href = '/' } = link;

    const handleMouseClick = (id: string) => {
      setCurrentItem(id);

      if (hasChildren) {
        setToggleNavPanel(!(id === currentItem && toggleNavPanel));
      } else {
        router.push(href);
      }
    };

    return (
      text.length > 0 && (
        <li
          key={menuId}
          role="menuitem"
          className="group flex cursor-pointer items-center gap-2"
          onClick={() => handleMouseClick(menuId)}
        >
          <NavMenuItem text={text} isActive={currentItem === menuId} isExpanded={toggleNavPanel} />
        </li>
      )
    );
  };

  const handleHamburgerClick = () => {
    document.body.className = !isOpen ? 'disable-scroll' : '';
    setIsOpen(!isOpen);
  };

  const handleBackdropClick = () => {
    document.body.className = '';
    setIsOpen(false);
  };

  const handleNavPanelClick = () => {
    setToggleNavPanel(false);
  };

  const renderNavPanel = () => {
    if (!menuItems) {
      return null;
    }

    const selectedItem = menuItems.find((i) => i.Href.jsonValue.value.id === currentItem);

    if (!selectedItem) {
      return null;
    }

    const { items, navigationTitle, href, article, hasLinks } = mapMenuItem(selectedItem);

    if (!hasArticle(article) && !hasLinks) {
      return null;
    }

    return (
      <NavPanel
        title={navigationTitle.value?.toString() || ''}
        href={href.jsonValue.value.href}
        menuItems={items?.results}
        article={article}
        show={toggleNavPanel}
        className={classNames(
          'nav-menu-panel',
          { 'slide-down-animation': toggleNavPanel },
          { 'slide-up-animation': !toggleNavPanel }
        )}
        onClick={handleNavPanelClick}
      />
    );
  };

  const renderSEOLink = (link: JsonLink, linkText: TextField = { value: '' }): ReactNode => {
    if (!link?.jsonValue?.value?.href) return <></>;
    return <a href={link?.jsonValue.value.href}>{linkText?.value}</a>;
  };

  const renderSubLinksForSEO = (val: NavItemChild): ReactNode => {
    const mainLink = renderSEOLink(val?.Href, val?.NavigationTitle);
    if (val?.Children?.results && val?.Children?.results?.length <= 0) return <div>{mainLink}</div>;

    return (
      <div>
        {mainLink && <div>{mainLink}</div>}
        {val?.Children?.results && val?.Children.results.length > 0 && (
          <ul>
            {val?.Children?.results.map((value, i) => (
              <li key={`${val?.NavigationTitle?.value}-${i}`}>
                {renderSEOLink(value.Href, value?.NavigationTitle)}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const renderPersonaLinks = () => {
    const personaList: Array<ReactNode> = [];
    if (
      rendering?.placeholders &&
      rendering.placeholders?.['header-utility'] &&
      rendering.placeholders['header-utility']?.length == 1 &&
      (rendering.placeholders['header-utility'][0] as ComponentRendering)?.placeholders &&
      (rendering.placeholders['header-utility'][0] as ComponentRendering)?.placeholders?.[
        'utility-top-left'
      ] &&
      (rendering.placeholders['header-utility'][0] as ComponentRendering)?.placeholders?.[
        'utility-top-left'
      ]?.length
    ) {
      const navPersonaRendering = (
        rendering.placeholders['header-utility'][0] as ComponentRendering
      )?.placeholders?.['utility-top-left'][0] as ComponentRendering;

      if (navPersonaRendering?.componentName !== 'Nav.persona') return;

      const personaLinks = navPersonaRendering?.fields?.items as Array<PersonaItem>;
      if (personaLinks && personaLinks?.length > 0)
        personaLinks?.map((item, i) =>
          personaList.push(
            <li key={`personaLink-${i}`}>
              <a href={item?.fields?.Link?.value?.href}>{item.fields.UtilityBarLinkText?.value}</a>
            </li>
          )
        );
    }
    return personaList;
  };

  const renderLinksForSEO = (): ReactNode => {
    if (isEditMode) return <div></div>;
    return (
      <div className="header-links hidden">
        <div className="persona-links">
          <ul>{renderPersonaLinks()}</ul>
        </div>
        <div className="category-links">{menuItems.map((item) => renderSubLinksForSEO(item))}</div>
      </div>
    );
  };

  return (
    <>
      <div
        link_component={linkComponent}
        className={classNames(
          'left-0 top-0 z-[90] w-full xl:relative',
          isEditMode || isPreviewMode ? 'relative' : 'fixed'
        )}
      >
        {renderLinksForSEO()}
        {rendering && <Placeholder name="header-alert" rendering={rendering} />}
        {isDesktop && rendering && <Placeholder name="header-utility" rendering={rendering} />}
        <div className="relative" ref={ref}>
          <div
            role="navigation"
            className={classNames(
              'relative z-[90] flex w-full flex-col items-center justify-center bg-white',
              'border-b-4 py-2 pl-6 pr-8 xl:border-b-2  xl:py-4 xl:pl-0 xl:pr-0',
              { 'shadow-lg': !toggleNavPanel },
              toggleNavPanel || isOpen ? 'border-challenger-green' : 'border-white'
            )}
          >
            <div
              className={classNames(
                'flex w-full items-center justify-between gap-3 xl:gap-4 xl:px-24',
                DESKTOP_MAX_WIDTH
              )}
            >
              <div className="flex min-w-fit">
                {rendering && <Placeholder name="header-top-left" rendering={rendering} />}
              </div>
              <div className="hidden w-10/12 items-center gap-3 xl:flex xl:justify-end xl:gap-5">
                <div className={classNames('overflow-hidden')}>
                  <ul className="flex gap-5" role="menu">
                    {menuItems &&
                      menuItems.map((item) => {
                        const { link, hasChildren, id } = mapMenuItem(item);

                        if (!item.ShowInNavigation || item.ShowInNavigation.value !== '1') {
                          return <></>;
                        }

                        return renderNavItem(link, hasChildren, id);
                      })}
                  </ul>
                </div>
                {rendering && <Placeholder name="header-top-right" rendering={rendering} />}
              </div>
              {!isDesktop && (
                <div className="flex gap-4 xl:hidden">
                  <NavSearch {...props} />
                  <NavHamburger onClick={handleHamburgerClick} isOpen={isOpen} />
                </div>
              )}
            </div>
          </div>
          <NavDrawer
            menuItems={menuItems}
            show={isOpen}
            rendering={rendering}
            ctaList={rendering && <Placeholder name="header-top-right" rendering={rendering} />}
            utilityList={rendering && <Placeholder name="header-utility" rendering={rendering} />}
            onClose={handleHamburgerClick}
            onBackdropClick={handleBackdropClick}
            isEditMode={isEditMode}
            onCloseMobile={handleBackdropClick}
          />
          {renderNavPanel()}
        </div>
      </div>
      {!isEditMode && !isPreviewMode && (
        <div
          className={classNames('relative h-[4.7rem] w-full xl:hidden')}
          id="heightPlaceholder"
        ></div>
      )}
    </>
  );
};

export default Nav;
