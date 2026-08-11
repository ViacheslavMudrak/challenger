import classNames from 'classnames';
import { CardFields, CardProps, CardSize, HeadingType } from './Card.types';
import {
  Field,
  ImageField,
  LinkField,
  Text,
  RichText,
  RichTextField,
} from '@sitecore-content-sdk/nextjs';
import CardBaseImage from './Card.base.image';
import { useState } from 'react';
import ButtonLink from 'components/Button/Button.link';
import { Variant } from 'components/Button/Button.types';
import CardInfo14Profile from './Card.info14.profile';
import CardInfo14Tags from './Card.info14.tags';
import { useAnalytics, useSitecore } from 'lib/challenger/hooks';
import {
  getFixedTermValue,
  getUpdatedContentReplacedWithRate,
} from 'lib/challenger/fixedTerm.helper';
import { useFixedTermRates } from 'lib/challenger/useFixedTermRates';

export type CardInfo14Fields = CardFields & {
  Title?: Field<string>;
  ProductImage?: ImageField;
  Overview?: RichTextField;
  Strategy?: RichTextField;
  Result?: RichTextField;
  Goal?: Field<string>;
  ProductHeading?: Field<string>;
  ProductContent?: Field<string>;
  ProductLink?: LinkField;
  Tag1?: Field<string>;
  Tag2?: Field<string>;
  Tag3?: Field<string>;
};

const CardInfo4 = (props: CardProps<CardInfo14Fields>): React.JSX.Element => {
  const {
    Heading,
    HeadingLevel,
    WithShadow,
    Size,
    CardImage = {},
    Link,
    ProductImage,
    Overview,
    Goal,
    ProductHeading,
    ProductContent,
    ProductLink,
    Strategy,
    Result,
    Title,
    Tag1,
    Tag2,
    Tag3,
  } = props.rendering.fields;
  const CustomHeading = (HeadingLevel?.fields?.Level?.value as HeadingType) || 'h3';
  const customSize = (Size?.fields?.Size?.value || 'md') as CardSize;
  const showCardShadow = !!WithShadow?.value;
  const [showMore, setShowMore] = useState<boolean>();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const { isEditMode } = useSitecore();

  let content = props?.rendering?.fields?.Content?.value || '';
  const contentTerms = getFixedTermValue(content, isEditMode);
  const rates = useFixedTermRates(contentTerms);

  const { linkComponent } = useAnalytics(props.rendering);

  const handleMouseEnter = () => {
    setIsReady(true);
    setShowMore(true);
  };

  const handleMouseLeave = () => {
    setShowMore(false);
  };

  const handleClick = () => {
    document.body.className = 'disable-scroll';
    setShowProfile(true);
  };

  const handleClose = () => {
    document.body.className = '';
    setShowProfile(false);
  };

  const renderContent = () => {
    if (!isEditMode && contentTerms?.length > 0) {
      content = getUpdatedContentReplacedWithRate(content, rates);
    }
    return (
      <RichText
        className={classNames(
          'persona-content text-black [&_p]:m-0 [&_p]:text-xs [&_span]:block [&_span]:text-xs'
        )}
        field={isEditMode ? props?.rendering?.fields?.Content : { value: content }}
      />
    );
  };

  return (
    <>
      <div
        link_component={linkComponent}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={classNames(
          'h-[424px] cursor-pointer flex-col items-start gap-1 overflow-hidden md:h-[930px] xl:h-[424px]',
          'items-start bg-white',
          { '!block': isEditMode },
          'w-full rounded-sm border-white xl:w-[294px]',
          { 'w-full xl:w-[260px]': customSize === 'sm' },
          { 'w-full xl:w-[294px]': customSize === 'md' },
          { 'w-full xl:w-[325px]': customSize === 'lg' },
          { 'shadow-lg': showCardShadow }
        )}
      >
        <div
          className={classNames(
            'case-study-card relative w-full',
            { 'slide-up-animation': isReady && showMore },
            { 'slide-down-animation': isReady && !showMore }
          )}
        >
          <div className={classNames('relative flex h-[230px] w-full md:h-[700px] xl:h-[230px]')}>
            <div
              className={classNames(
                'absolute z-30 h-full w-full',
                'clip-path-polygon-[0_82%,0_95%,29%_92%]',
                'from-deep-green via-deep-green to-challenger-green bg-gradient-250'
              )}
            ></div>
            <div
              className={classNames(
                'absolute z-30 h-full w-full',
                'clip-path-polygon-[0_82%,0_71%,29%_92%]',
                'from-blue via-bright-navy to-bright-navy bg-gradient-100'
              )}
            ></div>
            <div
              className={classNames(
                'absolute z-30 h-full w-full',
                'clip-path-polygon-[100%_100%,100%_78%,29%_92%]',
                'from-deep-green to-challenger-green bg-gradient-100'
              )}
            ></div>
            <CardBaseImage
              image={CardImage}
              className={classNames(
                'absolute z-10 h-full w-full',
                'clip-path-polygon-[0_0,100%_0,100%_79%,29%_92%,0_72%]'
              )}
            />
          </div>
          <div
            className={classNames(
              'relative flex h-[420px] w-full flex-col justify-between p-6 pt-2',
              showMore ? 'top-5' : 'top-0'
            )}
          >
            <div className={classNames('relative flex flex-col items-start justify-start gap-2')}>
              <CustomHeading
                className={classNames('min-h-[32px] font-roboto-700 text-2xl text-bright-navy')}
              >
                <Text field={Heading} />
              </CustomHeading>
              <div className="mb-2 flex flex-wrap gap-2 text-sm">
                <CardInfo14Tags tag1={Tag1?.value} tag2={Tag2?.value} tag3={Tag3?.value} />
              </div>
              <span className=" text-sm">
                <Text field={Goal} />
              </span>
              {renderContent()}
            </div>
            {Link && (
              <div className={classNames('mt-2 flex justify-start')}>
                <ButtonLink
                  LinkValue={Link}
                  Color={{ fields: { Type: { value: 'primary' } } }}
                  HasArrow={{ value: true }}
                  as="button"
                  onClick={handleClick}
                  variant={Variant.Link}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {showProfile && (
        <CardInfo14Profile
          title={Title?.value}
          profileImage={CardImage}
          productImage={ProductImage}
          heading={Heading?.value || ''}
          content={content || ''}
          overview={Overview?.value}
          strategy={Strategy?.value}
          result={Result?.value}
          goal={Goal?.value}
          productContent={ProductContent?.value}
          productHeading={ProductHeading?.value}
          productLink={ProductLink}
          tag1={Tag1?.value}
          tag2={Tag2?.value}
          tag3={Tag3?.value}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default CardInfo4;
