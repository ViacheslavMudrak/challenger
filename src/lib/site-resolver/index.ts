import { SiteInfo, SiteResolver } from '@sitecore-content-sdk/nextjs/site';
import { defaultPlugin } from './plugins/default';
import { multisitePlugin } from './plugins/multisite';

export interface SiteResolverPlugin {
  exec(sites: SiteInfo[]): SiteInfo[];
}

const sites = ([defaultPlugin, multisitePlugin] as SiteResolverPlugin[]).reduce<SiteInfo[]>(
  (acc, plugin) => plugin.exec(acc),
  []
);

export const siteResolver = new SiteResolver(sites);
