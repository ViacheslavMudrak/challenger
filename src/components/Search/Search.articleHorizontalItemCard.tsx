/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ActionProp, ItemClickedAction } from '@sitecore-search/react';
import { ArticleCard } from '@sitecore-search/ui';
import classNames from 'classnames';
import ButtonLink from 'components/Button/Button.link';
import { Variant } from 'components/Button/Button.types';
import { useRouter } from 'next/router';

interface ArticleCardItemCardProps {
  className?: string;
  displayText?: boolean;
  article: any;
  onItemClick: ActionProp<ItemClickedAction>;
  index: number;
}

const ArticleHorizontalItemCard = ({
  className = '',
  article,
  onItemClick,
  index,
}: ArticleCardItemCardProps) => {
  const router = useRouter();

  return (
    <ArticleCard.Root
      key={article.id}
      className={classNames(
        'relative my-5 flex min-h-40 w-full flex-row flex-nowrap p-6',
        'rounded-md border border-grey-dark bg-white',
        className
      )}
    >
      <div className="flex w-full grow flex-col">
        <div className="flex h-full flex-col content-between gap-4 lg:flex-row">
          <div className="flex h-full w-full flex-col lg:w-10/12">
            <div className="mb-4 w-fit rounded-sm border-2 border-challenger-green !px-2 py-1 text-left font-roboto-700 text-base text-bright-navy">
              {article.type}
            </div>
            <a
              href={article.url}
              onClick={(event) => {
                event.preventDefault();
                onItemClick({
                  id: article.id,
                  index,
                  sourceId: article.source_id,
                });

                router.push(article.url);
              }}
            >
              <h4 className="text-left font-roboto-700 text-2xl text-bright-navy">
                {article.name || article.title}
              </h4>
            </a>
            <span className="line-clamp-2 max-w-4xl text-ellipsis text-left font-roboto-400 text-base lg:line-clamp-1 lg:overflow-hidden">
              {article.description}
            </span>
          </div>
          <div className="flex w-full grow items-center justify-start text-right lg:w-2/12 lg:justify-end lg:px-0">
            <ButtonLink
              LinkValue={{ value: { target: '_self', href: article.url, text: 'Read more' } }}
              Color={{ fields: { Type: { value: 'primary' } } }}
              HasArrow={{ value: true }}
              className="py-4 text-lg"
              variant={Variant.Link}
            />
          </div>
        </div>
      </div>
    </ArticleCard.Root>
  );
};
export default ArticleHorizontalItemCard;
