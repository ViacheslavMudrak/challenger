/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import config from 'sitecore.config';
import * as Events from '@sitecore-cloudsdk/events/browser';

let eventsInitPromise = null;

const initEvents = (siteName) => {
  if (eventsInitPromise) return eventsInitPromise;
  eventsInitPromise = Events.init({
    siteName,
    sitecoreEdgeUrl: config.sitecoreEdgeUrl,
    sitecoreEdgeContextId: config.sitecoreEdgeContextId,
    cookieDomain: window.location.hostname.replace(/^www\./, ''),
    enableBrowserCookie: true,
  });
  return eventsInitPromise;
};

export const context = {
  sitecoreEdgeContextId: config.sitecoreEdgeContextId,
  sitecoreEdgeUrl: config.sitecoreEdgeUrl,
  sdks: { Events },

  init({ siteName, pageState } = {}) {
    if (typeof window === 'undefined') return;
    if (process.env.NODE_ENV === 'development') return;
    if (pageState && pageState !== 'normal') return;
    initEvents(siteName || config.sitecoreSiteName);
  },

  /* eslint-disable @typescript-eslint/no-unused-vars */
  getSDK(_name) {
    return eventsInitPromise
      ? eventsInitPromise.then(() => Events)
      : Promise.reject(new Error('Events SDK not initialized'));
  },
};
