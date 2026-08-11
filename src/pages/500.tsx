import Head from 'next/head';
import { ErrorPage } from '@sitecore-content-sdk/nextjs';
import { SitecorePageProps } from 'lib/page-props';
import Layout from 'src/Layout';
import { GetStaticProps } from 'next';
import { sitecoreClient } from 'lib/sitecore-client';
import config from 'sitecore.config';

const ServerError = (): React.JSX.Element => {
  const errorMessage =
    'There is a problem with the resource you are looking for, and it cannot be displayed.';
  return (
    <>
      <Head>
        <title>Server Error</title>
      </Head>
      <div style={{ padding: 10 }}>
        <h1>Internal Server Error</h1>
        <p>{errorMessage}</p>
        <a href="/">Go to the Home page</a>
      </div>
    </>
  );
};

const Custom500 = (props: SitecorePageProps): React.JSX.Element => {
  if (!(props && props.layoutData)) {
    return <ServerError />;
  }
  return <Layout layoutData={props.layoutData} headLinks={props.headLinks} />;
};

export const getStaticProps: GetStaticProps = async (context) => {
  let layoutData = null;

  if (!process.env.DISABLE_SSG_FETCH) {
    try {
      const page = await sitecoreClient.getErrorPage(ErrorPage.InternalServerError, {
        site: config.sitecoreSiteName,
        locale: context.locale || context.defaultLocale || config.defaultLanguage,
      });
      layoutData = page?.layout ?? null;
    } catch (error) {
      console.log('Error occurred while fetching error pages');
      console.log(error);
    }
  }

  return {
    props: {
      headLinks: [],
      layoutData,
    },
  };
};

export default Custom500;
