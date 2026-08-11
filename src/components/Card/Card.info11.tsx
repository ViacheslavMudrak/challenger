import classNames from 'classnames';
import { CardFields, CardProps, HeadingType } from './Card.types';
import { LinkField, RichText, Text, Link as JssLink } from '@sitecore-content-sdk/nextjs';
import { isValidLink } from './Card.helpers';
import ButtonLink from 'components/Button/Button.link';
import { Variant } from 'components/Button/Button.types';
import { useAnalytics, useSitecore } from 'lib/challenger/hooks';
import {
  getFixedTermValue,
  getUpdatedContentReplacedWithRate,
} from 'lib/challenger/fixedTerm.helper';
import { useFixedTermRates } from 'lib/challenger/useFixedTermRates';

const CardInfo11 = (props: CardProps<CardFields>): React.JSX.Element => {
  const { HeadingLevel, WithShadow, Link } = props.rendering.fields;
  const showCardShadow = !!WithShadow?.value;
  const hasValidLink = isValidLink(Link);
  const { isEditMode } = useSitecore();
  let heading = props?.rendering?.fields?.Heading?.value || '';
  const headingTerms = getFixedTermValue(heading, isEditMode);
  let content = props?.rendering?.fields?.Content?.value || '';
  const contentTerms = getFixedTermValue(content, isEditMode);
  const rates = useFixedTermRates([...new Set([...headingTerms, ...contentTerms])]);
  const { linkComponent } = useAnalytics(props.rendering);

  const renderHeading = () => {
    const CustomHeading = (HeadingLevel?.fields?.Level?.value as HeadingType) || 'h3';
    if (!isEditMode && headingTerms?.length > 0) {
      heading = getUpdatedContentReplacedWithRate(heading, rates);
    }

    return (
      <CustomHeading
        className={classNames('min-h-[32px] text-left font-roboto-700 text-2xl text-bright-navy')}
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
        className={classNames('custom-content text-left', 'text-base')}
        field={isEditMode ? props?.rendering?.fields?.Content : { value: content }}
      />
    );
  };

  return (
    <div
      link_component={linkComponent}
      className={classNames(
        'flex h-fit gap-4 xl:h-[416px]',
        'items-start bg-white',
        'rounded-sm border-white',
        'flex-col xl:flex-row',
        'w-full items-start lg:w-[820px]',
        { 'shadow-lg': showCardShadow }
      )}
    >
      <div
        className={classNames('relative flex h-[48px] w-full xl:h-full xl:w-[48px] xl:flex-row')}
      >
        <div
          className={classNames(
            'absolute z-30 h-full w-full',
            'xl:clip-path-polygon-[0_0,0_69%,100%_0]',
            'clip-path-polygon-[100%_97%,100%_0,28%_0]',
            'from-deep-green to-challenger-green bg-gradient-70'
          )}
        ></div>
        <div
          className={classNames(
            'absolute z-20 h-full w-full',
            'xl:clip-path-polygon-[0_100%,0_69%,100%_100%]',
            'clip-path-polygon-[0_96%,0_0,31%_0]',
            'from-bright-navy via-blue to-blue bg-gradient-120 xl:bg-gradient-240'
          )}
        ></div>
      </div>
      <div
        className={classNames(
          'relative flex min-h-[300px] w-full flex-col justify-between !px-6 py-6 pt-2 xl:h-full xl:py-10'
        )}
      >
        <div
          className={classNames(
            'relative flex w-[90%] flex-col justify-start gap-2',
            'items-start'
          )}
        >
          {renderHeading()}
          {renderContent()}
        </div>
        {isEditMode && (
          <div className={classNames('mt-2 flex justify-start [&_a]:text-lg')}>
            <JssLink field={Link as LinkField} className="py-4 text-lg" />
          </div>
        )}
        {!isEditMode && hasValidLink && Link && (
          <div className={classNames('mt-6 flex justify-start [&_a]:text-lg')}>
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

export default CardInfo11;
