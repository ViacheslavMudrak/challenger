import { ErrorPage } from '@sitecore-content-sdk/nextjs';
import { SitecorePageProps } from 'lib/page-props';
import NotFound from 'src/NotFound';
import Layout from 'src/Layout';
import { GetStaticProps } from 'next';
import { sitecoreClient } from 'lib/sitecore-client';
import config from 'sitecore.config';

const Custom404 = (props: SitecorePageProps): React.JSX.Element => {
  if (!(props && props.layoutData)) {
    return <NotFound />;
  }
  return <Layout layoutData={props.layoutData} headLinks={props.headLinks} />;
};

export const getStaticProps: GetStaticProps = async (context) => {
  let layoutData = null;

  if (!process.env.DISABLE_SSG_FETCH) {
    try {
      const page = await sitecoreClient.getErrorPage(ErrorPage.NotFound, {
        site: config.sitecoreSiteName,
        locale: context.locale || config.defaultLanguage,
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

export default Custom404;
