import type { NextRequest, NextFetchEvent } from 'next/server';
import {
  defineMiddleware,
  MultisiteMiddleware,
  RedirectsMiddleware,
  PersonalizeMiddleware,
} from '@sitecore-content-sdk/nextjs/middleware';
import { defineConfig } from '@sitecore-content-sdk/core';
import { siteResolver } from 'lib/site-resolver';

const sdkConfig = defineConfig({
  api: {
    edge: {
      contextId:
        process.env.SITECORE_EDGE_CONTEXT_ID ||
        process.env.NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID ||
        '',
      clientContextId: process.env.NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID || '',
      edgeUrl:
        process.env.SITECORE_EDGE_URL ||
        process.env.NEXT_PUBLIC_SITECORE_EDGE_URL ||
        'https://edge.sitecorecloud.io',
    },
  },
  multisite: {
    useCookieResolution: () => process.env.VERCEL_ENV === 'preview',
  },
  redirects: {
    enabled: process.env.NODE_ENV !== 'development',
    locales: ['en'],
  },
  personalize: {
    enabled: process.env.NODE_ENV !== 'development',
    edgeTimeout:
      (process.env.PERSONALIZE_MIDDLEWARE_EDGE_TIMEOUT &&
        parseInt(process.env.PERSONALIZE_MIDDLEWARE_EDGE_TIMEOUT)) ||
      400,
    cdpTimeout:
      (process.env.PERSONALIZE_MIDDLEWARE_CDP_TIMEOUT &&
        parseInt(process.env.PERSONALIZE_MIDDLEWARE_CDP_TIMEOUT)) ||
      400,
    scope: process.env.NEXT_PUBLIC_PERSONALIZE_SCOPE || '',
  },
});

const sites = siteResolver.sites;

const mw = defineMiddleware(
  new MultisiteMiddleware({ ...sdkConfig.multisite, sites }),
  new RedirectsMiddleware({ ...sdkConfig.api.edge, ...sdkConfig.redirects, sites }),
  new PersonalizeMiddleware({ ...sdkConfig.api.edge, ...sdkConfig.personalize, sites })
);

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  return mw.exec(req, ev);
}

export const config = {
  /*
   * Match all paths except for:
   * 1. /api routes
   * 2. /_next (Next.js internals)
   * 3. /sitecore/api (Sitecore API routes)
   * 4. /- (Sitecore media)
   * 5. /healthz (Health check)
   * 6. all root files inside /public (e.g. /favicon.ico)
   */
  matcher: ['/', '/((?!api/|_next/|healthz|sitecore/api/|[\\w-]+\\.\\w+).*)'],
};
