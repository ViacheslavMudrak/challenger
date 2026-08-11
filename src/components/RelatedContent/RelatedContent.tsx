import { useAnalytics } from 'lib/challenger/useAnalytics';
import { useSitecore } from 'lib/challenger/useSitecore';
import { useMemo } from 'react';
import classNames from 'classnames';
import { COOKIE_USER_TYPE_NAME } from 'src/constants';
import { getCookie } from 'cookies-next';
import { DEFAULT_USER_TYPE } from 'components/Nav/Nav.constants';
import RelatedContentResultsWidgetWithoutCategory from './RelatedContent.resultsWithoutCategory';
import RelatedContentCategoryResultsWidget from './RelatedContent.resultsWithCategory';
import { RelatedContentProps } from './RelatedContent.type';

const RelatedContent = (props: RelatedContentProps) => {
  const containerStyles = props?.rendering?.params?.Styles || '';
  const { linkComponent } = useAnalytics(props.rendering);
  const { getPagePersona } = useSitecore();
  const selectedPersona = getCookie(COOKIE_USER_TYPE_NAME);
  const searchLimit =
    props.rendering?.fields?.SearchLimit?.value &&
    props.rendering?.fields?.SearchLimit?.value !== ''
      ? parseInt(props.rendering.fields.SearchLimit.value)
      : 50;
  const shardType = (props.rendering?.fields?.ShardType?.value ?? 'article').toLowerCase();
  const delimiter = ' ';
  const alignment =
    containerStyles.split(delimiter).find((s: string) => s.startsWith('position')) || '';

  const persona = useMemo(() => {
    const pagePersona = getPagePersona() || selectedPersona || DEFAULT_USER_TYPE;

    const modifiedPagePersona =
      pagePersona.length > 0
        ? pagePersona[0].toUpperCase() + pagePersona.slice(1)
        : DEFAULT_USER_TYPE;

    return modifiedPagePersona;
  }, [getPagePersona, selectedPersona]);

  const getCategoriesList = () => {
    if (props.rendering?.fields?.Categories && props.rendering.fields.Categories?.length > 0) {
      return props.rendering.fields.Categories.map((cat) => cat.fields.Category.value);
    }
    return [];
  };

  const categories = getCategoriesList();

  return (
    <div
      link_component={linkComponent}
      className={classNames('related-content flex w-full gap-3', containerStyles)}
    >
      {categories?.length == 0 && (
        <RelatedContentResultsWidgetWithoutCategory
          rfkId="rfkid_7"
          defaultPersona={persona}
          defaultArticleType={`${persona}Article`}
          defaultPage={1}
          category="*"
          shardType={shardType}
          alignment={alignment}
        />
      )}
      {categories?.length >= 1 && (
        <RelatedContentCategoryResultsWidget
          rfkId="rfkid_7"
          defaultPersona={persona}
          defaultArticleType={`${persona}Article`}
          defaultPage={1}
          category={categories}
          defaultItemsPerPage={searchLimit}
          shardType={shardType}
          alignment={alignment}
        />
      )}
    </div>
  );
};

export default RelatedContent;
