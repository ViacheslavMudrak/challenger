import { LinkFieldValue } from '@sitecore-content-sdk/nextjs';
import {
  ArticleType,
  Item,
  NavFilter,
  NavItemChild,
  NavRenderingType,
  PersonaItem,
} from './Nav.types';
import { FILTER_MAIN_NAVIGATION } from 'components/constants';

export const hasArticle = (article?: ArticleType): boolean => {
  if (article) {
    const { content, heading, link } = article;

    if (
      (content || '').length > 0 &&
      (heading || '').length > 0 &&
      (link?.text || '').length > 0 &&
      (link?.href || '').length > 0
    ) {
      return true;
    }
  }

  return false;
};

export const mapMenuItem = (item: NavItemChild) => {
  const {
    Children: items,
    CampaignDescription: campaignDescription,
    CampaignLink: campaignLink,
    CampaignTitle: campaignTitle,
    Href: href,
    NavigationTitle: navigationTitle = { value: '' },
  } = item;

  const article = {
    heading: campaignTitle?.value?.toString() || '',
    content: campaignDescription?.value?.toString() || '',
    link: campaignLink?.jsonValue.value,
  };

  const hasLinks = items && items.results.length > 0;
  const hasChildren = !!(hasArticle(article) || hasLinks);

  const link: LinkFieldValue = {
    href: href.jsonValue.value.href,
    text: navigationTitle?.value?.toString() || '',
  };

  const id = href.jsonValue.value.id as string;

  return { items, href, navigationTitle, article, id, hasChildren, link, hasLinks };
};

export const getUserTypeText = (
  data: NavRenderingType[],
  userType: string,
  defaultUserType: string
): string => {
  const utilityData = data.find((u: NavRenderingType) => u.componentName === 'Nav.utility');
  const defaultText = `Not an ${defaultUserType} investor?`;

  if (utilityData) {
    const personaData = utilityData.placeholders?.['utility-top-left'].find(
      (u: NavRenderingType) => u.componentName === 'Nav.persona'
    );

    if (personaData) {
      const personaItems = (personaData as NavRenderingType)?.fields?.items as Item[];

      if (!personaItems || personaItems.length === 0) {
        return defaultText;
      }

      const defaultPersona = personaItems.find(
        (p: PersonaItem) => p.fields.IsDefault.value
      ) as PersonaItem;

      const pagePersonaItem = personaItems.find(
        (p: PersonaItem) => p.fields.CookieValue?.value === userType
      ) as PersonaItem;

      if (pagePersonaItem) {
        return pagePersonaItem.fields.MobilePersonaText?.value || defaultText;
      }

      return defaultPersona.fields.MobilePersonaText?.value || defaultText;
    }
  }

  return defaultText;
};

export const hideMenuItem = (filter?: NavFilter): boolean => {
  if (filter?.jsonValue && filter?.jsonValue.length > 0) {
    const menuItem = filter.jsonValue.find(
      (m) => m.displayName.toLowerCase() === FILTER_MAIN_NAVIGATION
    );

    if (menuItem) {
      return true;
    }
  }

  return false;
};
