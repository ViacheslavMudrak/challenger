import { ComponentParams, ComponentRendering } from '@sitecore-content-sdk/nextjs';
import BlogResultsWidget from './Blog.results';
import { useAnalytics } from 'lib/challenger/useAnalytics';
import { useSitecore } from 'lib/challenger/useSitecore';
import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { COOKIE_USER_TYPE_NAME } from 'src/constants';
import { getCookie } from 'cookies-next';
import { DEFAULT_USER_TYPE } from 'components/Nav/Nav.constants';
import { useRouter } from 'next/router';
import { CATEGORY_PAGE_PREFIX_IN_URL } from './Blog.constants';
import { BlogField } from './Blog.type';

export interface BlogProps {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: BlogField };
}

const Blog = (props: BlogProps) => {
  const { ShowResultsCount: ItemsPerPage = { value: 8 } } = props.rendering?.fields;
  const containerStyles = props?.rendering?.params?.Styles || '';
  const { linkComponent } = useAnalytics(props.rendering);
  const { getPagePersona, isEditMode, isPreviewMode } = useSitecore();
  const selectedPersona = getCookie(COOKIE_USER_TYPE_NAME);
  const [pageNumberFromUrl, setPageNumberFromUrl] = useState(isEditMode || isPreviewMode ? 1 : 0);
  const [category, setCategory] = useState(isEditMode || isPreviewMode ? 'All' : '');
  const fields = props?.rendering?.fields;

  const router = useRouter();
  const persona = useMemo(() => {
    const pagePersona = getPagePersona() || selectedPersona || DEFAULT_USER_TYPE;

    const modifiedPagePersona =
      pagePersona.length > 0
        ? pagePersona[0].toUpperCase() + pagePersona.slice(1)
        : DEFAULT_USER_TYPE;

    return modifiedPagePersona;
  }, [getPagePersona, selectedPersona]);

  useEffect(() => {
    if (!router.isReady || isEditMode || isPreviewMode) return;
    if (
      !(
        router?.query?.blogPage &&
        typeof router?.query?.blogPage == 'string' &&
        parseInt(router?.query?.blogPage) > 0
      )
    ) {
      setPageNumberFromUrl(1);
      return;
    }
    setPageNumberFromUrl(parseInt(router?.query?.blogPage));
  }, [router.isReady, router.query?.blogPage]);

  useEffect(() => {
    if (!router.isReady || isEditMode || isPreviewMode) return;
    const pathNamesArr = router.asPath?.split('?')[0]?.split('/');
    const pageName = pathNamesArr[pathNamesArr?.length - 1]?.split('#')[0];
    if (pageName?.toLowerCase()?.startsWith(CATEGORY_PAGE_PREFIX_IN_URL)) {
      setCategory(
        decodeURIComponent(
          pageName?.toLowerCase()?.replace(CATEGORY_PAGE_PREFIX_IN_URL, '')?.replaceAll('-', ' ')
        )
      );
      return;
    } else {
      setCategory('All');
    }
  }, [router.isReady]);

  return (
    <div
      link_component={linkComponent}
      className={classNames('my-6 flex w-full flex-col items-center gap-3 py-4', containerStyles)}
    >
      {pageNumberFromUrl > 0 && (
        <BlogResultsWidget
          rfkId="rfkid_7"
          defaultPersona={persona}
          defaultArticleType={`${persona}Article`}
          defaultPage={pageNumberFromUrl}
          defaultItemsPerPage={ItemsPerPage.value}
          categoryFromUrl={category}
          fields={fields}
        />
      )}
    </div>
  );
};

export default Blog;
