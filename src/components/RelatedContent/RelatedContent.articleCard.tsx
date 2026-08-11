import classNames from 'classnames';
import { CardSize, ShardColorType, ShardType } from '../Card/Card.types';
import CardBaseImage from '../Card/Card.base.image';
import { isValidLink } from '../Card/Card.helpers';
import ButtonLink from 'components/Button/Button.link';
import { Variant } from 'components/Button/Button.types';
import { RelatedContentCardProps } from './RelatedContent.type';
import { getFormattedDateInUTC, isValidDate } from 'lib/challenger/helpers';

const RelatedContentCard = (props: RelatedContentCardProps): React.JSX.Element => {
  const {
    image_url,
    article_description,
    article_link = '',
    article_title,
    published_date,
    read_in_mins = '',
  } = props.article;

  const alignment = 'left';
  const customSize = 'md' as CardSize;
  const shardType = props.shardType as ShardType;
  const showCardShadow = true;
  const shardColour = ShardColorType.Green;

  const cardImage = {
    value: {
      src: image_url,
      alt: '',
      width: '',
      height: '',
    },
  };

  const Link = {
    value: {
      href: article_link,
      text: shardType === 'article' ? 'Read article' : 'Learn more',
      linktype: 'internal',
      url: article_link,
      anchor: '',
    },
  };

  const hasValidLink = isValidLink(Link);

  const renderShards = () => {
    if (shardType === 'article') {
      return (
        <>
          <div
            className={classNames(
              'absolute z-30 h-full w-full',
              'bg-white clip-path-polygon-[0_0,21%_77%,100%_100%,0%_100%]'
            )}
          ></div>
          <div
            className={classNames(
              'absolute z-20 h-full w-full',
              'clip-path-polygon-[0_0,26%_99%,42%_100%]',
              shardColour.toString()
            )}
          ></div>
        </>
      );
    }

    return (
      <>
        <div
          className={classNames(
            'absolute z-30 h-full w-full',
            'clip-path-polygon-[0_91%,0%_100%,70%_100%]',
            'from-deep-green to-challenger-green bg-gradient-270'
          )}
        ></div>
        <div
          className={classNames(
            'absolute z-30 h-full w-full',
            'clip-path-polygon-[100%_93%,100%_100%,70%_100%]',
            'from-bright-navy via-blue to-blue bg-gradient-240'
          )}
        ></div>
      </>
    );
  };

  const renderPublishedDate = () => {
    if (isValidDate(published_date || '')) {
      return (
        <div className="text-sm leading-5">
          {getFormattedDateInUTC(published_date)}
          {read_in_mins?.length > 0 && <span>&nbsp;{'|'}&nbsp;</span>}
        </div>
      );
    }

    return;
  };

  return (
    <div
      className={classNames(
        'flex min-h-[300px] flex-col gap-4',
        'items-start bg-white',
        'rounded-sm border-white md:self-stretch',
        { 'items-start': alignment === 'left' },
        { 'w-full md:w-[260px]': customSize === 'sm' },
        { 'w-full md:w-[294px]': customSize === 'md' },
        { 'w-full md:w-[325px]': customSize === 'lg' },
        { 'shadow-lg': showCardShadow }
      )}
    >
      <div
        className={classNames(
          'relative flex w-full',
          { 'h-[172px]': shardType === 'article' },
          { 'h-[245px]': shardType === 'profile' }
        )}
      >
        {renderShards()}
        <CardBaseImage
          image={cardImage}
          className={classNames('absolute z-10 h-full w-full', {
            'clip-path-polygon-[0_0,100%_0,100%_100%,19%_78%]': shardType === 'article',
          })}
        />
      </div>
      <div
        className={classNames(
          'relative flex w-full flex-col justify-between p-6 pt-4 md:flex-grow-[1]',
          {
            'h-[calc(100%-177px)]': shardType === 'article',
            'h-[calc(100%-185px)]': shardType === 'profile',
          }
        )}
      >
        <div
          className={classNames('relative flex flex-col justify-start gap-2', {
            'items-start': alignment === 'left',
          })}
        >
          <h3
            className={classNames(
              'min-h-[32px] font-roboto-700 text-bright-navy',
              { 'text-left': alignment === 'left' },
              { 'text-[32px]': shardType === 'article' },
              { 'text-2xl': shardType === 'profile' }
            )}
          >
            {article_title}
          </h3>

          <div className="flex text-deep-blue">
            {renderPublishedDate()}
            {read_in_mins?.length > 0 && <div className="text-sm leading-5">{read_in_mins}</div>}
          </div>

          <div
            className={'custom-content text-left text-base'} //{ 'text-blue': shardType === 'profile',}
          >
            {article_description}
          </div>
        </div>
        {hasValidLink && Link && (
          <div className={classNames('mt-2 flex justify-start [&_a]:text-lg')}>
            <ButtonLink
              LinkValue={Link}
              Color={{ fields: { Type: { value: 'primary' } } }}
              HasArrow={{ value: true }}
              className="py-4 text-lg"
              variant={Variant.Link}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedContentCard;
