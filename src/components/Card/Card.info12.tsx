import classNames from 'classnames';
import { CardFields, CardProps, HeadingType } from './Card.types';
import { LinkField, RichText, Text, Link as JssLink } from '@sitecore-content-sdk/nextjs';
import { isValidLink } from './Card.helpers';
import ButtonLink from 'components/Button/Button.link';
import { Variant } from 'components/Button/Button.types';
import ButtonSolid from 'components/Button/Button.solid';
import { useAnalytics, useSitecore } from 'lib/challenger/hooks';
import {
  getFixedTermValue,
  getUpdatedContentReplacedWithRate,
} from 'lib/challenger/fixedTerm.helper';
import { useFixedTermRates } from 'lib/challenger/useFixedTermRates';

export type CardInfo12Fields = CardFields & {
  Link2?: LinkField;
};

const CardInfo12 = (props: CardProps<CardInfo12Fields>) => {
  const { HeadingLevel, WithShadow, Link, Link2 } = props.rendering.fields;
  const showCardShadow = !!WithShadow?.value;
  const hasValidLink1 = isValidLink(Link);
  const hasValidLink2 = isValidLink(Link2);
  const { isEditMode } = useSitecore();
  const { linkComponent } = useAnalytics(props.rendering);
  let heading = props?.rendering?.fields?.Heading?.value || '';
  const headingTerms = getFixedTermValue(heading, isEditMode);
  let content = props?.rendering?.fields?.Content?.value || '';
  const contentTerms = getFixedTermValue(content, isEditMode);
  const rates = useFixedTermRates([...new Set([...headingTerms, ...contentTerms])]);

  const renderHeading = () => {
    const CustomHeading = (HeadingLevel?.fields?.Level?.value as HeadingType) || 'h3';
    if (!isEditMode && headingTerms?.length > 0) {
      heading = getUpdatedContentReplacedWithRate(heading, rates);
    }

    return (
      <CustomHeading
        className={'mb-2 min-h-[32px] pr-5 text-left font-roboto-700 text-3xl text-bright-navy'}
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
        className={'custom-content text-left text-base'}
        field={isEditMode ? props?.rendering?.fields?.Content : { value: content }}
      />
    );
  };

  return (
    <div
      link_component={linkComponent}
      className={classNames(
        'relative flex h-fit gap-4 md:h-[344px]',
        'items-start bg-white',
        'rounded-sm border-white',
        'flex-col lg:flex-row',
        'w-full items-start lg:w-[820px]',
        { 'shadow-lg': showCardShadow }
      )}
    >
      <div
        className={classNames(
          'absolute right-0 flex h-[345px] w-full overflow-hidden sm:w-[345px]'
        )}
      >
        <div className={classNames('z-1 absolute -top-3 left-20 h-full w-full md:left-0 md:top-0')}>
          <div
            className={classNames(
              'clip-path-polygon-[0_0,100%_0,100%_24%,64%_29%]',
              'from-challenger-green via-green to-challenger-green bg-gradient-300',
              'absolute z-20 h-full w-full'
            )}
          ></div>
          <div
            className={classNames(
              'clip-path-polygon-[49%_0,100%_0,100%_11%,64%_29%]',
              'from-blue via-blue to-bright-navy bg-gradient-30',
              'absolute z-30 h-full w-full'
            )}
          ></div>
          <div
            className={classNames(
              'clip-path-polygon-[100%_90%,100%_0,47%_0%]',
              'from-blue via-blue to-bright-navy bg-gradient-120',
              'absolute z-10 h-full w-full'
            )}
          ></div>
        </div>
      </div>
      <div
        className={classNames(
          'relative',
          'z-2 mt-20 h-fit w-full !px-6 md:mt-20 md:w-[80%] md:!px-8'
        )}
      >
        <div
          className={classNames(
            'relative flex flex-col justify-start gap-2',
            'md:[&_div]:line-clamp-3 md:[&_p]:line-clamp-3',
            'md:[&_h1]:line-clamp-2 md:[&_h2]:line-clamp-2 md:[&_h3]:line-clamp-2',
            'items-start'
          )}
        >
          {renderHeading()}
          {renderContent()}
        </div>

        <div
          className={classNames(
            'my-6 flex w-full flex-col items-center justify-center gap-4 md:mt-6 md:gap-10',
            'md:flex-row md:justify-start [&_a]:text-lg md:[&_a]:w-fit'
          )}
        >
          {isEditMode && (
            <div className={classNames('mt-5 flex')}>
              <JssLink field={Link as LinkField} className="py-4 text-lg" />
            </div>
          )}
          {!isEditMode && hasValidLink1 && Link && (
            <ButtonSolid
              LinkValue={Link}
              Color={{ fields: { Type: { value: 'secondary' } } }}
              HasArrow={{ value: true }}
              className="py-4 text-lg"
              variant={Variant.Solid}
            />
          )}
          {isEditMode && (
            <div className={classNames('mt-5 flex')}>
              <JssLink field={Link2 as LinkField} className="py-4 text-lg" />
            </div>
          )}
          {!isEditMode && hasValidLink2 && Link2 && (
            <ButtonLink
              LinkValue={Link2}
              Color={{ fields: { Type: { value: 'primary' } } }}
              HasArrow={{ value: true }}
              className="py-4 text-lg"
              variant={Variant.Link}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardInfo12;
