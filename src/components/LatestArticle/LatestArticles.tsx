import {
  ComponentParams,
  ComponentRendering,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import LatestArticleResultsWidget from './LatestArticles.results';
import { useAnalytics } from 'lib/challenger/useAnalytics';
import { useSitecore } from 'lib/challenger/useSitecore';
import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { COOKIE_USER_TYPE_NAME } from 'src/constants';
import { getCookie } from 'cookies-next';
import { DEFAULT_USER_TYPE } from 'components/Nav/Nav.constants';
import Spinner from './LatestArticles.spinner';

type LatestArticleField = {
  SearchTitle?: Field<string>;
  ShowResultsCount?: Field<number>;
  FilterByCategoryText?: Field<string>;
  ArticleParent: LinkField;
};

export interface LatestArticleProps {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: LatestArticleField };
}

const LatestArticles = (props: LatestArticleProps) => {
  const containerStyles = props?.rendering?.params?.Styles || '';
  const { linkComponent } = useAnalytics(props.rendering);
  const { getPagePersona } = useSitecore();
  const selectedPersona = getCookie(COOKIE_USER_TYPE_NAME);
  const [delayedCall, setDelayedCall] = useState(false);
  const parentLink = props?.rendering?.fields?.ArticleParent?.value?.href;

  const persona = useMemo(() => {
    const pagePersona = getPagePersona() || selectedPersona || DEFAULT_USER_TYPE;

    const modifiedPagePersona =
      pagePersona.length > 0
        ? pagePersona[0].toUpperCase() + pagePersona.slice(1)
        : DEFAULT_USER_TYPE;

    return modifiedPagePersona;
  }, [getPagePersona, selectedPersona]);

  useEffect(() => {
    setDelayedCall(true);
  }, []);

  return (
    <div
      link_component={linkComponent}
      className={classNames('my-6 flex w-full flex-col items-center gap-3 py-4', containerStyles)}
    >
      {delayedCall ? (
        <LatestArticleResultsWidget
          rfkId="rfkid_7"
          defaultPersona={persona}
          defaultArticleType={`${persona}Article`}
          defaultPage={1}
          parentLink={parentLink ? parentLink + '/' : '/'}
        />
      ) : (
        <div className="flex h-screen w-full items-center justify-center">
          <Spinner loading />
        </div>
      )}
    </div>
  );
};

export default LatestArticles;
