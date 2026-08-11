import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import NotFound from 'src/NotFound';
import Layout from 'src/Layout';
import {
  ComponentPropsContext,
  ComponentPropsService,
  StaticPath,
  getSiteRewriteData,
  getPersonalizedRewriteData,
  normalizeSiteRewrite,
  normalizePersonalizedRewrite,
} from '@sitecore-content-sdk/nextjs';
import { handleEditorFastRefresh } from '@sitecore-content-sdk/nextjs/utils';
import { EditingPreviewData } from '@sitecore-content-sdk/core/editing';
import { SitecorePageProps } from 'lib/page-props';
import { sitecoreClient, sitecoreConfig } from 'lib/sitecore-client';
import { siteResolver } from 'lib/site-resolver';
import { componentMap } from 'lib/component-map';

const componentPropsService = new ComponentPropsService();

const SitecorePage = ({
  notFound,
  componentProps,
  layoutData,
  headLinks,
}: SitecorePageProps): React.JSX.Element => {
  useEffect(() => {
    // Since Sitecore editors do not support Fast Refresh, need to refresh editor chromes after Fast Refresh finished
    handleEditorFastRefresh();
  }, []);

  if (notFound || !layoutData.sitecore.route) {
    // Shouldn't hit this (as long as 'notFound' is being returned below), but just to be safe
    return <NotFound />;
  }

  return (
    <ComponentPropsContext value={componentProps}>
      <Layout layoutData={layoutData} headLinks={headLinks} />
    </ComponentPropsContext>
  );
};

// This function gets called at build and export time to determine
// pages for SSG ("paths", as tokenized array).
export const getStaticPaths: GetStaticPaths = async (context) => {
  let paths: StaticPath[] = [];
  let fallback: boolean | 'blocking' = 'blocking';

  // Fix - bypass the fetching pages for Azure - this is to be able to trigger a build without connecting to SC
  if (process.env.AZUREDEVOPS === 'azurebuild') {
    return { paths, fallback };
  }

  if (process.env.NODE_ENV !== 'development' && !process.env.DISABLE_SSG_FETCH) {
    try {
      // Note: Next.js runs export in production mode
      const siteNames = siteResolver.sites.map((s) => s.name);
      const languages = process.env.EXPORT_MODE
        ? [sitecoreConfig.defaultLanguage]
        : context.locales || [sitecoreConfig.defaultLanguage];
      paths = await sitecoreClient.getPagePaths(siteNames, languages);
    } catch (error) {
      console.log('Error occurred while fetching static paths');
      console.log(error);
    }
    fallback = process.env.EXPORT_MODE ? false : fallback;
  }

  return { paths, fallback };
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation (or fallback) is enabled and a new request comes in.
export const getStaticProps: GetStaticProps = async (context) => {
  // Preview / editing mode
  if (context.preview) {
    const page = await sitecoreClient.getPreview(
      context.previewData as EditingPreviewData | undefined
    );
    if (!page) {
      throw new Error(
        `Unable to get editing data for preview ${JSON.stringify(context.previewData)}`
      );
    }
    const siteName = page.siteName || sitecoreConfig.defaultSite;
    const [dictionary, componentProps] = await Promise.all([
      sitecoreClient.getDictionary({ site: siteName, locale: page.locale }),
      componentPropsService.fetchComponentProps({
        layoutData: page.layout,
        context,
        components: componentMap,
      }),
    ]);
    return {
      props: {
        site: siteResolver.getByName(siteName) ?? {
          name: siteName,
          language: page.locale,
          hostName: '*',
        },
        locale: page.locale,
        layoutData: page.layout,
        dictionary,
        componentProps,
        headLinks: [],
        notFound: false,
      } as SitecorePageProps,
    };
  }

  // Normal mode - extract and normalise path
  const rawPath =
    context.params === undefined
      ? '/'
      : Array.isArray(context.params.path)
        ? '/' + context.params.path.join('/')
        : '/' + ((context.params.path as string) || '');

  const siteData = getSiteRewriteData(rawPath, sitecoreConfig.defaultSite);
  const personalizeData = getPersonalizedRewriteData(rawPath);
  const path = normalizeSiteRewrite(normalizePersonalizedRewrite(rawPath));

  const page = await sitecoreClient.getPage(path, {
    site: siteData.siteName,
    locale: context.locale || sitecoreConfig.defaultLanguage,
    personalize: personalizeData,
  });

  if (!page || !page.layout.sitecore.route) {
    return { notFound: true };
  }

  const [dictionary, componentProps] = await Promise.all([
    sitecoreClient.getDictionary({ site: siteData.siteName, locale: page.locale }),
    componentPropsService.fetchComponentProps({
      layoutData: page.layout,
      context,
      components: componentMap,
    }),
  ]);
  const headLinks = sitecoreClient.getHeadLinks(page.layout);
  const site = siteResolver.getByName(siteData.siteName) ?? {
    name: siteData.siteName,
    language: sitecoreConfig.defaultLanguage,
    hostName: '*',
  };

  return {
    props: {
      site,
      locale: page.locale,
      layoutData: page.layout,
      dictionary,
      componentProps,
      headLinks,
      notFound: false,
    } as SitecorePageProps,
    revalidate: 5,
  };
};

export default SitecorePage;
