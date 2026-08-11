import { ComponentParams, ComponentRendering } from '@sitecore-content-sdk/nextjs';
import { useAnalytics } from 'lib/challenger/useAnalytics';
import { useSitecore } from 'lib/challenger/useSitecore';
import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { COOKIE_USER_TYPE_NAME } from 'src/constants';
import { getCookie } from 'cookies-next';
import { DEFAULT_USER_TYPE } from 'components/Nav/Nav.constants';
import { useRouter } from 'next/router';
import { CATEGORY_PAGE_PREFIX_IN_URL } from '../Blog/Blog.constants';
import CategoryListWidget from './ArticleCategoryList.results';
import { CategoryListField } from './ArticleCategoryList.types';

export interface ArticleCategoryListProps {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: CategoryListField };
}

const CategoyList = (props: ArticleCategoryListProps) => {
  const containerStyles = props?.rendering?.params?.Styles || '';
  const { linkComponent } = useAnalytics(props.rendering);
  const { getPagePersona, isEditMode, isPreviewMode } = useSitecore();
  const selectedPersona = getCookie(COOKIE_USER_TYPE_NAME);
  const [category, setCategory] = useState(isEditMode || isPreviewMode ? 'All' : '');
  const fields = props?.rendering?.fields;
  const itemsAlignment = props?.rendering?.params?.Alignment?.toLowerCase() ?? 'left';

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
      <CategoryListWidget
        rfkId="rfkid_7"
        defaultPersona={persona}
        defaultArticleType={`${persona}Article`}
        categoryFromUrl={category}
        fields={fields}
        itemsAlignment={itemsAlignment}
      />
    </div>
  );
};

export default CategoyList;
