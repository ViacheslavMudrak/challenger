import classNames from 'classnames';
import { CardFields, CardProps, CardSize, HeadingType, ShardType } from './Card.types';
import {
  Field,
  ImageField,
  RichText,
  Text,
  Link as JssLink,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import CardBaseImage from './Card.base.image';
import { getShardColor, isValidLink } from './Card.helpers';
import ButtonLink from 'components/Button/Button.link';
import { Variant } from 'components/Button/Button.types';
import { useAnalytics, useSitecore } from 'lib/challenger/hooks';
import { useState } from 'react';
import CardInfo4Modal from './Card.info4.modal';
import { useFixedTermRates } from 'lib/challenger/useFixedTermRates';
import {
  getFixedTermValue,
  getUpdatedContentReplacedWithRate,
} from 'lib/challenger/fixedTerm.helper';

export type CardInfo4Fields = CardFields & {
  CardImage?: ImageField;
  ShardColor?: {
    fields: {
      Color: Field<string>;
    };
  };
  ShardType?: {
    fields: {
      ShardType: Field<string>;
    };
  };
  UseModal?: Field<boolean>;
  Bio?: Field<string>;
  Role?: Field<string>;
  FullName?: Field<string>;
};

const CardInfo4 = (props: CardProps<CardInfo4Fields>): React.JSX.Element => {
  const {
    HeadingLevel,
    WithShadow,
    Size,
    Alignment,
    CardImage = {},
    ShardColor,
    ShardType,
    UseModal,
    Bio,
    Role,
    FullName,
    Link,
  } = props.rendering.fields;

  const { isEditMode } = useSitecore();
  let heading = props?.rendering?.fields?.Heading?.value || '';
  const headingTerms = getFixedTermValue(heading, isEditMode);
  let content = props?.rendering?.fields?.Content?.value || '';
  const contentTerms = getFixedTermValue(content, isEditMode);
  const rates = useFixedTermRates([...new Set([...headingTerms, ...contentTerms])]);

  const alignment = (Alignment?.fields?.Alignment?.value || '').toLowerCase() || 'center';
  const customSize = (Size?.fields?.Size?.value || 'md') as CardSize;
  const shardType = ((ShardType?.fields.ShardType.value || '').toLowerCase() ||
    'article') as ShardType;
  const showCardShadow = !!WithShadow?.value;
  const shardColour = getShardColor(ShardColor?.fields.Color.value || '');
  const hasValidLink = isValidLink(Link);
  const useModal = !!UseModal?.value;
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const { linkComponent } = useAnalytics(props.rendering);

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

  const handleToggleModal = () => {
    document.body.className = 'disable-scroll';
    setToggleModal(true);
  };

  const handleModalClose = () => {
    document.body.className = '';
    setToggleModal(false);
  };

  const renderHeading = () => {
    const CustomHeading = (HeadingLevel?.fields?.Level?.value as HeadingType) || 'h3';
    if (!isEditMode && headingTerms?.length > 0) {
      heading = getUpdatedContentReplacedWithRate(heading, rates);
    }

    return (
      <CustomHeading
        className={classNames(
          'min-h-[32px] font-roboto-700 text-bright-navy',
          { 'text-left': alignment === 'left' },
          { 'text-center': alignment === 'center' },
          { 'text-[32px]': shardType === 'article' },
          { 'text-2xl': shardType === 'profile' }
        )}
      >
        <Text field={isEditMode ? props?.rendering?.fields?.Heading : { value: heading }} />
      </CustomHeading>
    );
  };

  const renderContent = () => {
    if (!isEditMode && contentTerms?.length > 0) {
      content = getUpdatedContentReplacedWithRate(content, rates);
    }

    return (
      <RichText
        className={classNames(
          'custom-content',
          'text-base',
          { 'text-left': alignment === 'left' },
          { 'text-center': alignment === 'center' },
          { 'text-blue': shardType === 'profile' }
        )}
        field={isEditMode ? props?.rendering?.fields?.Content : { value: content }}
      />
    );
  };

  return (
    <>
      <div
        link_component={linkComponent}
        className={classNames(
          'flex min-h-[300px] flex-col gap-4',
          'items-start bg-white',
          'rounded-sm border-white',
          { 'items-start': alignment === 'left' },
          { 'items-center': alignment === 'center' },
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
            image={CardImage}
            className={classNames('absolute z-10 h-full w-full', {
              'clip-path-polygon-[0_0,100%_0,100%_100%,19%_78%]': shardType === 'article',
            })}
          />
        </div>
        <div
          className={classNames('relative flex w-full flex-col justify-between p-6 pt-4', {
            'h-[calc(100%-177px)]': shardType === 'article',
            'h-[calc(100%-185px)]': shardType === 'profile',
          })}
        >
          <div
            className={classNames(
              'relative flex flex-col justify-start gap-2',
              { 'items-start': alignment === 'left' },
              { 'items-center': alignment === 'center' }
            )}
          >
            {(isEditMode || heading) && renderHeading()}
            {(isEditMode || content) && renderContent()}
          </div>
          {isEditMode && (
            <div className={classNames('mt-5 flex')}>
              <JssLink field={Link as LinkField} className="py-4 text-lg" />
            </div>
          )}
          {!isEditMode && hasValidLink && Link && (
            <div
              className={classNames(
                'mt-2 flex [&_a]:text-lg',
                { 'justify-start': alignment === 'left' },
                { 'justify-center': alignment === 'center' }
              )}
            >
              <ButtonLink
                LinkValue={
                  useModal
                    ? { value: { target: '_self', href: '#modal', text: Link.value.text } }
                    : Link
                }
                Color={{ fields: { Type: { value: 'primary' } } }}
                HasArrow={{ value: true }}
                className="py-4 text-lg"
                onClick={useModal ? handleToggleModal : undefined}
                variant={Variant.Link}
              />
            </div>
          )}
        </div>
      </div>
      {toggleModal && (
        <CardInfo4Modal
          bio={Bio?.value || ''}
          fullName={FullName?.value || ''}
          role={Role?.value || ''}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default CardInfo4;
