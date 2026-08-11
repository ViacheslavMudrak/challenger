/**
 * Central Sitecore Content SDK configuration.
 * Replaces the generated temp/config.js from the legacy JSS bootstrap process.
 */
const config = {
  // Content SDK API shape — used by SitecoreProvider and SitecoreClient
  api: {
    edge: {
      contextId:
        process.env.SITECORE_EDGE_CONTEXT_ID ||
        process.env.NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID ||
        '',
      edgeUrl:
        process.env.SITECORE_EDGE_URL ||
        process.env.NEXT_PUBLIC_SITECORE_EDGE_URL ||
        'https://edge-platform.sitecorecloud.io',
    },
  },

  // Legacy-compatible properties — kept for lib files not yet fully migrated
  sitecoreApiKey: process.env.SITECORE_API_KEY || process.env.NEXT_PUBLIC_SITECORE_API_KEY || '',
  sitecoreApiHost: process.env.SITECORE_API_HOST || process.env.NEXT_PUBLIC_SITECORE_API_HOST || '',
  sitecoreMediaHost: process.env.SITECORE_MEDIA_HOST || '',
  sitecoreSiteName:
    process.env.SITECORE_SITE_NAME || process.env.NEXT_PUBLIC_DEFAULT_SITE_NAME || 'challenger',
  defaultLanguage: process.env.DEFAULT_LANGUAGE || process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE || 'en',
  sitecoreEdgeContextId:
    process.env.SITECORE_EDGE_CONTEXT_ID || process.env.NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID || '',
  sitecoreEdgeUrl:
    process.env.SITECORE_EDGE_URL ||
    process.env.NEXT_PUBLIC_SITECORE_EDGE_URL ||
    'https://edge-platform.sitecorecloud.io',
  graphQLEndpoint: process.env.GRAPH_QL_ENDPOINT || '',
  graphQLEndpointPath: '/sitecore/api/graph/edge',
  layoutServiceConfigurationName: 'default',
  editingSecret: process.env.JSS_EDITING_SECRET || process.env.SITECORE_EDITING_SECRET || '',
  publicUrl: process.env.PUBLIC_URL || 'http://localhost:3000',
};

export default config;
