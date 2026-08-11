import { SitecoreClient } from '@sitecore-content-sdk/core/client';
import { defineConfig } from '@sitecore-content-sdk/core';
import rawConfig from 'sitecore.config';

export const sitecoreConfig = defineConfig({
  api: {
    edge: {
      contextId: rawConfig.api.edge.contextId,
      clientContextId: process.env.NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID || '',
      edgeUrl: rawConfig.api.edge.edgeUrl,
    },
  },
  defaultSite: rawConfig.sitecoreSiteName,
  defaultLanguage: rawConfig.defaultLanguage,
  editingSecret: rawConfig.editingSecret,
});

export const sitecoreClient = new SitecoreClient(sitecoreConfig);
