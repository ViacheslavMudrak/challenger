import { ComponentParams, ComponentRendering, Link, LinkField } from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import IconButton from 'components/IconButton/IconButton';
import { ArrowRightIcon } from 'components/Icons';
import { IconColor, IconSize } from 'components/Icons/icon.types';
import { DESKTOP_MAX_WIDTH, MOBILE_MEDIA_QUERY } from 'components/constants';
import { useEffect, useState } from 'react';
import { Item, NavRenderingType, PersonaItem, UserType } from './Nav.types';
import { DEFAULT_USER_TYPE, WELCOME_TEXT } from './Nav.constants';
import { setCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'usehooks-ts';
import { COOKIE_USER_TYPE_NAME, DEFAULT_URL } from 'src/constants';
import { useSitecore } from 'lib/challenger/hooks';

interface NavUtilityPanelProps {
  show?: boolean;
  onClose?: () => void;
  rendering?: ComponentRendering & { params: ComponentParams };
}

const NavUtilityPanel = (props: NavUtilityPanelProps) => {
  const { show = false, onClose, rendering } = props;
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCloseButtonClicked, setIsCloseButtonClicked] = useState<boolean>(false);
  const userCookie = getCookie(COOKIE_USER_TYPE_NAME);
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY);
  const router = useRouter();
  const { isPersonaMatched, isEditMode, isPreviewMode, isHomePage, getPagePersona } = useSitecore();

  useEffect(() => {
    if (show && isMobile) {
      setIsReady(true);
    } else {
      setIsOpen(false);
    }
  }, [isMobile, show]);

  useEffect(() => {
    if (userCookie) {
      setIsOpen(show);
    } else {
      setIsOpen(true);
    }
  }, [isOpen, show, userCookie]);

  useEffect(() => {
    const isMatched = isPersonaMatched(userCookie || '');
    const pagePersona = getPagePersona();
    const isCommonPage = pagePersona === '';

    if (!isCloseButtonClicked && !isMatched && !isHomePage() && !isCommonPage) {
      setIsOpen(true);
    }
  }, [
    isCloseButtonClicked,
    isEditMode,
    isPreviewMode,
    userCookie,
    isHomePage,
    isPersonaMatched,
    getPagePersona,
  ]);

  if (!rendering || !rendering.placeholders) {
    return null;
  }

  const utilityLinks = rendering.placeholders['utility-top-left'];

  if (!utilityLinks || utilityLinks.length === 0) {
    return null;
  }

  const persona = utilityLinks.find((u: NavRenderingType) => u.componentName === 'Nav.persona');

  if (!persona) {
    return null;
  }

  const personaItems = (persona as NavRenderingType)?.fields?.items as Item[];

  if (!personaItems || personaItems.length === 0) {
    return null;
  }

  const handleClose = () => {
    if (!userCookie) {
      const defaultPersona = personaItems.find(
        (p: PersonaItem) => p.fields.IsDefault.value
      ) as PersonaItem;

      const pagePersonaItem = personaItems.find(
        (p: PersonaItem) => p.fields.CookieValue?.value === getPagePersona()
      ) as PersonaItem;

      if (pagePersonaItem && pagePersonaItem.fields.CookieValue) {
        setCookie(COOKIE_USER_TYPE_NAME, pagePersonaItem.fields.CookieValue.value, {
          secure: true,
        });
      } else if (defaultPersona && defaultPersona.fields.CookieValue) {
        setCookie(COOKIE_USER_TYPE_NAME, defaultPersona?.fields?.CookieValue.value, {
          secure: true,
        });
      }
    }

    setIsOpen(false);
    setIsCloseButtonClicked(true);

    if (onClose) {
      onClose();
    }
  };

  const handleChangeUser = (userLink: LinkField, user: UserType) => {
    setCookie(COOKIE_USER_TYPE_NAME, user, { secure: true });
    setIsOpen(false);
    setIsCloseButtonClicked(true);

    if (!isEditMode && !isPreviewMode) {
      router.push(userLink.value.href || DEFAULT_URL);
    }

    if (onClose) {
      onClose();
    }
  };

  const renderLinkItem = (item: PersonaItem) => {
    const userType = (item.fields.CookieValue?.value || DEFAULT_USER_TYPE) as UserType;
    const userLink: LinkField = {
      value: {
        ...item.fields.Link.value,
        href: isEditMode || isPreviewMode ? '' : item.fields.Link.value.href,
        text: item.fields.UtilitySliderLinkText?.value,
      },
    };

    return (
      <li
        key={userType}
        className={classNames(
          'pb-1',
          'flex items-center justify-between gap-3 text-xl lg:justify-start',
          'xl:border-b-2 xl:border-b-challenger-green',
          { 'border-b-2 border-b-challenger-green': userType === userCookie }
        )}
      >
        <Link field={userLink} onClick={() => handleChangeUser(userLink, userType)} />
        <ArrowRightIcon color={IconColor.White} size={IconSize.Lg} />
      </li>
    );
  };

  if (!isReady && isMobile) {
    return null;
  }

  if (!isOpen && !isMobile) {
    return null;
  }

  const getWelcomeText = (): string => {
    const defaultPersona = personaItems.find(
      (p: PersonaItem) => p.fields.IsDefault.value
    ) as PersonaItem;

    const pagePersona = getPagePersona();

    const selectedPersona = personaItems.find(
      (p: PersonaItem) => p.fields.CookieValue?.value === pagePersona
    ) as PersonaItem;

    if (selectedPersona) {
      if (userCookie) {
        return selectedPersona.fields.UtilitySliderPersonaMismatchedText?.value || WELCOME_TEXT;
      }

      return selectedPersona.fields.UtilitySliderWelcomeText?.value || WELCOME_TEXT;
    }

    if (defaultPersona) {
      return defaultPersona.fields.UtilitySliderWelcomeText?.value || WELCOME_TEXT;
    }

    return WELCOME_TEXT;
  };

  return (
    <div
      className={classNames(
        'absolute h-full w-full bg-blue px-0 py-0 xl:relative xl:flex xl:px-24 xl:py-8',
        { 'nav-drawer': isMobile },
        { 'slide-out-animation': show && isMobile },
        { 'slide-in-animation': !show && isMobile },
        DESKTOP_MAX_WIDTH
      )}
    >
      <div className="flex items-center justify-start bg-white px-6 py-8 xl:hidden [&_button]:w-fit">
        <IconButton
          type="ChevronLeftIcon"
          iconSize={IconSize.Md}
          className="font-roboto-700 text-xl text-deep-blue"
          onClick={handleClose}
        >
          Back
        </IconButton>
      </div>
      <div className="absolute right-8 top-5 hidden lg:right-24 lg:top-9 lg:flex">
        <IconButton
          type="CloseIcon"
          onClick={handleClose}
          iconColor={IconColor.White}
          iconSize={IconSize.Md}
        />
      </div>
      <div className="flex h-full flex-col justify-between px-8 py-8 xl:flex-row xl:px-0 xl:py-0">
        <div className="flex w-full flex-col gap-6">
          <div className="hidden w-full lg:flex xl:w-4/5">
            <span className="font-roboto-700 text-2xl text-white">{getWelcomeText()}</span>
          </div>

          <ul className="flex flex-col gap-6 text-lg text-white xl:flex-row xl:gap-10">
            {personaItems.map((item: PersonaItem) => {
              return renderLinkItem(item);
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavUtilityPanel;
