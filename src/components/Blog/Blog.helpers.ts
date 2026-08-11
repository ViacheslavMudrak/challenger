import { CATEGORY_PAGE_PREFIX_IN_URL, CATEGORY_VALUE_SEPARATOR } from './Blog.constants';
import { BlogField } from './Blog.type';

export const getParentLinkFromPersona = (persona: string, fields: BlogField) => {
  switch (persona?.toLowerCase()) {
    case 'individual':
      return fields?.IndividualArticlesPath?.value?.href + '/';
    case 'adviser':
      return fields?.AdviserArticlesPath?.value?.href + '/';
    case 'institutional':
      return fields?.InstitutionalArticlesPath?.value?.href + '/';
  }
  return '/';
};

export const getFullLink = (parentPath: string | undefined, pageName: string): string => {
  const pageUrl =
    CATEGORY_PAGE_PREFIX_IN_URL + pageName?.trim()?.replaceAll(' ', CATEGORY_VALUE_SEPARATOR);

  if (parentPath) {
    return parentPath + pageUrl;
  } else return '/' + pageUrl;
};
