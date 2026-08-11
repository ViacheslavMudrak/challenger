import type { AppProps } from 'next/app';
import { I18nProvider } from 'next-localization';
import { SitecorePageProps } from 'lib/page-props';
import Bootstrap from 'src/Bootstrap';
import 'assets/main.css';
import { SEARCH_CONFIG, IsSearchEnabled } from 'lib/config';
import { WidgetsProvider } from '@sitecore-search/react';
import { ErrorBoundary } from 'components/ErrorBoundary/ErrorBoundary';
import { SitecoreProvider, Page } from '@sitecore-content-sdk/nextjs';
import { componentMap } from 'lib/component-map';
import config from 'sitecore.config';

const App = ({ Component, pageProps }: AppProps<SitecorePageProps>): React.JSX.Element => {
  const { dictionary, ...rest } = pageProps;
  const { layoutData, site, locale } = pageProps;

  const buildPage = (): Page | null => {
    if (!layoutData) return null;
    const pageState = (layoutData.sitecore?.context?.pageState as string) || 'Normal';
    return {
      layout: layoutData,
      siteName: site?.name || config.sitecoreSiteName,
      locale: locale || config.defaultLanguage,
      mode: {
        name: pageState,
        designLibrary: { isVariantGeneration: false },
        isNormal: pageState === 'Normal',
        isPreview: pageState === 'Preview',
        isEditing: pageState === 'Edit',
        isDesignLibrary: false,
      } as Page['mode'],
    };
  };

  const page = buildPage();

  const inner: React.JSX.Element = (
    <>
      <Bootstrap {...pageProps} />
      <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
        <Component {...rest} />
      </I18nProvider>
    </>
  );

  const content: React.JSX.Element = page ? (
    <SitecoreProvider
      /*eslint-disable @typescript-eslint/no-explicit-any*/
      api={config.api as any}
      componentMap={componentMap}
      page={page}
    >
      {' '}
      {inner}
    </SitecoreProvider>
  ) : (
    inner
  );

  if (IsSearchEnabled()) {
    return (
      <>
        <ErrorBoundary>
          <WidgetsProvider
            env={SEARCH_CONFIG.env}
            customerKey={SEARCH_CONFIG.customerKey}
            apiKey={SEARCH_CONFIG.apiKey}
            publicSuffix={true}
          >
            {content}
          </WidgetsProvider>
        </ErrorBoundary>
      </>
    );
  }

  return (
    <>
      <ErrorBoundary>{content}</ErrorBoundary>
    </>
  );
};

export default App;
