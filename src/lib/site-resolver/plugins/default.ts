import { SiteInfo } from '@sitecore-content-sdk/nextjs/site';
import { tryParseEnvValue } from '@sitecore-content-sdk/nextjs/utils';
import config from 'sitecore.config';
import { SiteResolverPlugin } from '..';

// Resolving from env variable, but it can be expanded or change in future if needed.
const pointOfSale = tryParseEnvValue<Record<string, string>>(
  process.env.NEXT_PUBLIC_CDP_POINTOFSALE,
  { [config.defaultLanguage]: process.env.NEXT_PUBLIC_CDP_POINTOFSALE || '' }
);

class DefaultPlugin implements SiteResolverPlugin {
  exec(sites: SiteInfo[]): SiteInfo[] {
    // Add default/configured site
    sites.unshift({
      name: config.sitecoreSiteName,
      language: config.defaultLanguage,
      hostName: '*',
      pointOfSale,
    });

    return sites;
  }
}

export const defaultPlugin = new DefaultPlugin();
