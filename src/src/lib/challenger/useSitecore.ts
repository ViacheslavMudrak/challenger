import { Field, useSitecore as useSDKSitecore } from '@sitecore-content-sdk/nextjs';
import { useRouter } from 'next/router';

export const useSitecore = () => {
  const { page } = useSDKSitecore();
  const router = useRouter();

  const isEditing = (): boolean => page.mode?.isEditing ?? false;
  const isPreviewMode = (): boolean => page.mode?.isPreview ?? false;

  const getUrlRelativePath = (): string => {
    const asPath = router?.asPath || '/';
    const idx = asPath.indexOf('?');
    const path = idx >= 0 ? asPath.substring(0, idx) : asPath;
    return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  };

  const isHomePage = (): boolean => {
    const path = getUrlRelativePath();
    return path === '/' || path === '';
  };

  type PersonaLink = { key: string; url: string; isDefault?: boolean };

  const getPagePersona = (): string => {
    const fields = page?.layout?.sitecore?.route?.fields as
      | Record<string, Field<string>>
      | undefined;
    return fields?.CookieValue?.value || '';
  };

  const getPersona = (personaJson: string, cookieValue: string) => {
    try {
      const personaLinks = JSON.parse(personaJson) as PersonaLink[];
      return (
        personaLinks.find((p) => p.key === cookieValue) ?? personaLinks.find((p) => p.isDefault)
      );
    } catch {
      return;
    }
  };

  const isPersonaMatched = (cookieValue: string): boolean => getPagePersona() === cookieValue;

  return {
    isEditMode: isEditing(),
    isPreviewMode: isPreviewMode(),
    getUrlRelativePath,
    isHomePage,
    getPersona,
    getPagePersona,
    isPersonaMatched,
  };
};
