import classNames from 'classnames';
import { getFormattedDateInUTC, isValidDate } from 'lib/challenger/helpers';
import { LatestArticleProps } from './LatestArticles.type';
import ButtonLink from 'components/Button/Button.link';
import { Variant } from 'components/Button/Button.types';
import { getFullLink } from 'components/Blog/Blog.helpers';

const BlogArticleStandard = (props: LatestArticleProps): React.JSX.Element => {
  const {
    article_link = '',
    article_title,
    category = [],
    published_date,
    read_in_mins = '',
  } = props.article;
  const { parentLink } = props;

  const categoryList = category && category.length > 0 ? category[0].split(',') : [];

  const renderPublishedDate = () => {
    if (isValidDate(published_date || '')) {
      return <li>{getFormattedDateInUTC(published_date)}</li>;
    }

    return;
  };

  return (
    <div
      className={classNames(
        'flex gap-2',
        'items-start bg-white',
        'rounded-sm border-white',
        'flex-1 flex-col justify-start',
        'w-full shadow-lg lg:min-h-[192px] lg:w-[400px] 2xl:max-h-[204px] 2xl:justify-center'
      )}
    >
      <div className={classNames('relative flex h-full w-full flex-col justify-between p-6')}>
        <div
          className={classNames('relative flex flex-col items-start justify-start gap-2 xl:gap-0')}
        >
          {categoryList?.length > 0 && (
            <div className="flex flex-wrap gap-3">
              <ul className="custom-list mt-0 flex-wrap">
                <li className="w-full lg:w-auto [&::after]:!hidden lg:[&::after]:!inline-flex">
                  <a
                    href={getFullLink(parentLink, categoryList[0])}
                    title={categoryList[0]}
                    key={categoryList[0]}
                  >
                    <span
                      key={categoryList[0]}
                      className="block rounded-sm border-2 border-challenger-green p-[2px] !px-2 text-left font-roboto-700 text-bright-navy"
                    >
                      {categoryList[0]}
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          )}
          <h3
            className={classNames(
              'min-h-[32px] text-left text-bright-navy',
              'line-clamp-2 font-roboto-700 text-[24px]  xl:text-[24px] xl:leading-normal',
              { 'mt-4': categoryList && categoryList?.length > 0 }
            )}
          >
            {article_title}
          </h3>
        </div>
        <div className="flex flex-col">
          <ul
            className={classNames('article-custom-list flex-wrap  gap-2 [&_li::after]:!ml-2', {
              'has-divider': read_in_mins?.length > 0,
            })}
          >
            {renderPublishedDate()}
            {read_in_mins?.length > 0 && <li>{read_in_mins}</li>}
            {article_link?.length > 0 && (
              <li>
                <div className={classNames('flex justify-start [&_a]:py-0 [&_a]:text-lg')}>
                  <ButtonLink
                    LinkValue={{
                      value: {
                        href: article_link,
                        text: 'Read more',
                      },
                    }}
                    Color={{ fields: { Type: { value: 'primary' } } }}
                    HasArrow={{ value: true }}
                    className="text-lg"
                    variant={Variant.Link}
                  />
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogArticleStandard;
