import classNames from 'classnames';
import { NavItemChild, NavRenderingType } from './Nav.types';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from 'components/Icons';
import { IconColor, IconSize } from 'components/Icons/icon.types';
import { MutableRefObject, ReactNode, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { DEFAULT_USER_TYPE } from './Nav.constants';
import { DESKTOP_MEDIA_QUERY, MOBILE_MEDIA_QUERY } from 'components/constants';
import NavDrawerSubMenu from './Nav.drawer.subMenu';
import { getUserTypeText, mapMenuItem } from './Nav.helpers';
import ButtonLink from 'components/Button/Button.link';
import { Variant } from 'components/Button/Button.types';
import NavUtilityPanel from './Nav.utility.panel';
import { ComponentParams, ComponentRendering } from '@sitecore-content-sdk/nextjs';
import { getCookie } from 'cookies-next';
import { COOKIE_USER_TYPE_NAME, DEFAULT_URL } from 'src/constants';
interface NavDrawerProps {
  menuItems: NavItemChild[];
  show: boolean;
  onBackdropClick?: () => void;
  onClose?: () => void;
  ctaList?: ReactNode;
  utilityList?: ReactNode;
  rendering?: ComponentRendering & { params: ComponentParams };
  isEditMode?: boolean;
  onCloseMobile?: () => void;
}

const NavDrawer = (props: NavDrawerProps) => {
  const {
    menuItems,
    show,
    onBackdropClick,
    onClose,
    ctaList,
    utilityList,
    rendering,
    isEditMode,
    onCloseMobile,
  } = props;
  const [isReady, setIsReady] = useState<boolean>(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<NavItemChild>();
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY);
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const [toggleSubMenu, setToggleSubMenu] = useState(false);
  const [toggleUtilityPanel, setToggleUtilityPanel] = useState(false);
  const utilityData = rendering?.placeholders?.['header-utility'] as NavRenderingType[];
  const userCookie = getCookie(COOKIE_USER_TYPE_NAME) || '';
  const ctaWrapper = useRef(null) as unknown as MutableRefObject<HTMLDivElement>;
  const utilityRef = useRef(null) as unknown as MutableRefObject<HTMLDivElement>;
  const [paddingVal, setPaddingVal] = useState('0px');
  const router = useRouter();

  useEffect(() => {
    if (show) {
      setIsReady(true);
    } else {
      setToggleSubMenu(false);
      setToggleUtilityPanel(false);
      setSelectedMenuItem(undefined);
    }
  }, [show]);

  useEffect(() => {
    if (!isMobile) {
      setIsReady(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isReady || isDesktop || isEditMode) return;

    const links = ctaWrapper.current?.querySelectorAll('a');
    const utilityLinks = utilityRef.current?.querySelectorAll('a');
    if (links && links?.length > 0) {
      links.forEach((link) => link.addEventListener('click', handleCloseMobile));
    }
    if (utilityLinks && utilityLinks?.length > 0) {
      utilityLinks.forEach((link) => link.addEventListener('click', handleCloseMobile));
    }
    getPaddingBasedOnUtilityListItems();
    () => {
      links?.forEach((link) => link.removeEventListener('click', handleCloseMobile));
      utilityLinks?.forEach((link) => link.removeEventListener('click', handleCloseMobile));
    };
  }, [isReady]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleCloseMobile = () => {
    if (onCloseMobile && !isEditMode) {
      onCloseMobile();
    }
  };

  const renderMenuItem = (menuItem: NavItemChild) => {
    const { hasChildren, href, id, navigationTitle } = mapMenuItem(menuItem);

    const handleMenuItemClick = () => {
      if (hasChildren) {
        setSelectedMenuItem(menuItem);
        setToggleSubMenu(true);
      } else {
        router.push(href.jsonValue.value.href || DEFAULT_URL);
        handleClose();
      }
    };

    return (
      <li
        role="menuitem"
        className="group flex w-full cursor-pointer items-start justify-between gap-2"
        onClick={handleMenuItemClick}
        key={id}
      >
        <span className="font-roboto-700 text-[24px] text-deep-blue">
          {navigationTitle.value?.toString()}
        </span>
        <a href={href.jsonValue.value.href} className="hidden">
          {navigationTitle.value}
        </a>
        {hasChildren && (
          <div className="mt-[10px]">
            <ChevronRightIcon color={IconColor.Navy} size={IconSize.Md} />
          </div>
        )}
      </li>
    );
  };

  const handleSubMenuBackClick = () => {
    setToggleSubMenu(false);
  };

  const handleBackdropClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    handleSubMenuBackClick();

    if (onBackdropClick) {
      onBackdropClick();
    }
  };

  const handleSubMenuItemClick = (url: string) => {
    if (url) {
      router.push(url);
    }

    handleSubMenuBackClick();
    handleClose();
  };

  if (!isReady) {
    return null;
  }

  const handleUserTypeClick = () => {
    setToggleUtilityPanel(true);
  };

  const handleUtilityPanelClose = () => {
    setToggleUtilityPanel(false);
    if (!isDesktop && !isEditMode) {
      handleClose();
    }
  };

  const getPaddingBasedOnUtilityListItems = (): void => {
    if (typeof window !== 'undefined' && !isDesktop)
      setPaddingVal((utilityRef.current?.offsetHeight ?? 0) + 15 + 'px');
  };

  return (
    <div
      className={classNames(
        'absolute z-[90] w-full overflow-hidden',
        'xl:hidden',
        'nav-drawer',
        { 'fade-in-animation': show },
        { 'fade-out-animation': !show }
      )}
    >
      <div
        className={classNames(
          'xl:hidden',
          'absolute h-full w-full overflow-hidden bg-black bg-opacity-70'
        )}
        onClick={handleBackdropClick}
      ></div>
      <div
        className={classNames(
          'nav-drawer',
          { 'slide-out-animation': show },
          { 'slide-in-animation': !show },
          'bg-white',
          'absolute right-0 flex max-w-md flex-col items-stretch justify-between',
          'h-full w-full overflow-hidden'
        )}
      >
        <div className="relative flex items-center justify-between bg-grey-light px-6 py-4">
          <span>{getUserTypeText(utilityData, userCookie, DEFAULT_USER_TYPE)}</span>
          <ButtonLink
            onClick={handleUserTypeClick}
            Color={{ fields: { Type: { value: 'primary' } } }}
            variant={Variant.Link}
            as="button"
            LinkValue={{
              value: {
                text: 'Change',
                href: '',
              },
            }}
          />
        </div>
        <div
          className={`flex h-full flex-col justify-between overflow-y-auto px-6 py-6`}
          style={paddingVal !== '0px' ? { paddingBottom: paddingVal } : {}}
        >
          <ul className="mb-8 flex flex-col gap-6" role="menu">
            {menuItems.map((i) => {
              return renderMenuItem(i);
            })}
          </ul>
          <div ref={ctaWrapper}>{ctaList}</div>
        </div>
        <div>
          <div
            className="bg-deep-blue p-6 max-md:fixed max-md:bottom-0 max-md:w-full"
            ref={utilityRef}
          >
            {utilityList}
          </div>
        </div>
        <NavDrawerSubMenu
          show={toggleSubMenu}
          menuItem={selectedMenuItem}
          onClick={handleSubMenuItemClick}
          onBack={handleSubMenuBackClick}
        />
        {utilityData && utilityData.length > 0 && (
          <NavUtilityPanel
            rendering={utilityData[0] as NavRenderingType}
            show={toggleUtilityPanel}
            onClose={handleUtilityPanelClose}
          />
        )}
      </div>
    </div>
  );
};

export default NavDrawer;
