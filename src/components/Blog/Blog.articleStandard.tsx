import classNames from 'classnames';
import { getFormattedDateInUTC, isValidDate } from 'lib/challenger/helpers';
import ButtonLink from 'components/Button/Button.link';
import { Variant } from 'components/Button/Button.types';
import { BlogArticleProps } from './Blog.type';
import { getFullLink } from './Blog.helpers';

const BlogArticleStandard = (props: BlogArticleProps): React.JSX.Element => {
  const {
    article_description,
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
        'flex-col',
        'w-full shadow-lg lg:w-[400px] xl:h-[395px]'
      )}
    >
      <div className={classNames('relative flex h-full w-full flex-col justify-between !p-6 py-8')}>
        <div
          className={classNames('relative flex flex-col items-start justify-start gap-2 xl:gap-0')}
        >
          <div className="flex flex-wrap gap-3">
            {categoryList?.length > 0 &&
              categoryList.slice(0, 2).map((item) => {
                return (
                  <a href={getFullLink(parentLink, item)} title={item} key={item}>
                    <span className="block rounded-sm border-2 border-challenger-green p-1 !px-2 text-left font-roboto-700 text-bright-navy">
                      {item}
                    </span>
                  </a>
                );
              })}
          </div>
          <h3
            className={classNames(
              'mt-4 min-h-[32px] text-left text-bright-navy',
              'mb-4 line-clamp-3 font-roboto-700 text-[24px] leading-normal xl:text-[24px]'
            )}
          >
            {article_title}
          </h3>
          <span className={'custom-content line-clamp-4 text-left text-base'}>
            {article_description}
          </span>
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
                <span className={classNames('flex justify-start [&_a]:text-lg')}>
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
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogArticleStandard;
