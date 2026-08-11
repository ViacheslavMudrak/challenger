import classNames from 'classnames';
import { getFormattedDateInUTC, isValidDate } from 'lib/challenger/helpers';
import ButtonLink from 'components/Button/Button.link';
import { Variant } from 'components/Button/Button.types';
import { LatestArticleProps } from './LatestArticles.type';
import CardBaseImage from 'components/Card/Card.base.image';
import { getFullLink } from 'components/Blog/Blog.helpers';

const BlogArticleFeature = (props: LatestArticleProps): React.JSX.Element => {
  const {
    image_url,
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
        'flex h-fit gap-2 xl:max-h-[408px]',
        'items-start bg-white',
        'rounded-sm border-white',
        'flex-col xl:flex-row',
        'w-full items-start shadow-lg lg:w-[825px]'
      )}
    >
      <div
        className={
          'relative flex h-[235px] w-full md:h-[408px] xl:h-full xl:min-h-[408px] xl:w-[435px] xl:flex-row'
        }
      >
        <div
          className={classNames(
            'absolute z-20 h-full w-full',
            'xl:clip-path-polygon-[92%_0,77%_99%,100%_0]',
            'clip-path-polygon-[100%_72%,0%_100%,100%_86%]',
            'from-deep-green to-challenger-green bg-gradient-180 xl:bg-gradient-90'
          )}
        ></div>
        <CardBaseImage
          image={{ value: { src: image_url } }}
          className={classNames(
            'absolute z-10 h-full w-full',
            'xl:clip-path-polygon-[0_0,92%_0,77%_100%,0%_100%]',
            'clip-path-polygon-[0_0,100%_0,100%_81%,0%_100%]'
          )}
        />
      </div>
      <div
        className={
          'relative flex min-h-[300px] w-full flex-col justify-between p-6 py-4 xl:h-full xl:min-h-[408px] xl:w-[445px] xl:px-10 xl:py-8'
        }
      >
        <div className={'relative flex flex-col items-start justify-start gap-2 xl:gap-0'}>
          <div className="flex w-full flex-wrap gap-3">
            {categoryList?.length > 0 &&
              categoryList.slice(0, 2).map((item) => {
                return (
                  <a href={getFullLink(parentLink, item)} title={item} key={item}>
                    <span
                      key={item}
                      className="mb-4 block rounded-sm border-2 border-challenger-green !px-2 py-[2px] text-center font-roboto-700 text-bright-navy"
                    >
                      {item}
                    </span>
                  </a>
                );
              })}
          </div>
          <h3
            className={
              'line-clamp-3 min-h-[32px] text-left font-roboto-700 text-[24px] leading-normal text-bright-navy xl:text-[24px]'
            }
          >
            {article_title}
          </h3>
          <span className={'custom-content mt-4 line-clamp-4 text-left text-base'}>
            {article_description}
          </span>
        </div>
        <div className="flex flex-col gap-2 xl:gap-8">
          <ul
            className={classNames('article-custom-list flex-wrap  gap-2 [&_li::after]:!ml-2', {
              'has-divider': read_in_mins?.length > 0,
            })}
          >
            {renderPublishedDate()}
            {read_in_mins?.length > 0 && <li>{read_in_mins}</li>}
            {article_link?.length > 0 && (
              <li>
                <span className={'flex justify-start [&_a]:text-lg'}>
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

export default BlogArticleFeature;
