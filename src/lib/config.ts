import { Environment } from '@sitecore-search/react';

/*
 * Represents the type of config object available within the generated temp/config.js
 */
export interface JssConfig extends Record<string, string | undefined> {
  sitecoreApiKey?: string;
  sitecoreApiHost?: string;
  sitecoreMediaHost?: string;
  sitecoreSiteName?: string;
  graphQLEndpointPath?: string;
  defaultLanguage?: string;
  graphQLEndpoint?: string;
  layoutServiceConfigurationName?: string;
  publicUrl?: string;
}

export const SEARCH_CONFIG = {
  env: process.env.NEXT_PUBLIC_SEARCH_APP_ENV as Environment,
  customerKey: process.env.NEXT_PUBLIC_SEARCH_APP_CUSTOMER_KEY,
  apiKey: process.env.NEXT_PUBLIC_SEARCH_APP_API_KEY,
  source: process.env.NEXT_PUBLIC_SEARCH_SOURCE || '',
};

export const SOCIAL_CARD_CONFIG = {
  facebook: process.env.NEXT_PUBLIC_SHARABLE_FACEBOOK_LINK || '',
  linkedin: process.env.NEXT_PUBLIC_SHARABLE_LINKEDIN_LINK || '',
  email: process.env.NEXT_PUBLIC_SHARABLE_EMAIL_LINK || '',
};

export const IsSearchEnabled = () =>
  SEARCH_CONFIG.env && SEARCH_CONFIG.customerKey && SEARCH_CONFIG.apiKey ? true : false;
