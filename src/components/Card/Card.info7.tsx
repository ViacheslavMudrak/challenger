import classNames from 'classnames';
import { CardFields, CardProps, HeadingType } from './Card.types';
import { RichText, Text, Link as JssLink, LinkField } from '@sitecore-content-sdk/nextjs';
import CardBaseImage from './Card.base.image';
import ButtonLink from 'components/Button/Button.link';
import { Variant } from 'components/Button/Button.types';
import { isValidLink } from './Card.helpers';
import { useAnalytics, useSitecore } from 'lib/challenger/hooks';

const CardInfo7 = (props: CardProps<CardFields>): React.JSX.Element => {
  const {
    Content,
    Heading,
    HeadingLevel,
    WithShadow,
    CardImage = {},
    Link,
  } = props.rendering.fields;
  const CustomHeading = (HeadingLevel?.fields?.Level?.value as HeadingType) || 'h3';
  const showCardShadow = !!WithShadow?.value;
  const hasValidLink = isValidLink(Link);
  const { isEditMode } = useSitecore();
  const { linkComponent } = useAnalytics(props.rendering);

  const renderShards = () => {
    return (
      <>
        <div
          className={classNames(
            'absolute z-30 h-full w-full',
            'xl:clip-path-polygon-[79%_0,88%_70%,100%_0]',
            'clip-path-polygon-[0%_42%,0%_78%,30%_83%]',
            'from-deep-green to-challenger-green bg-gradient-180 xl:bg-gradient-70'
          )}
        ></div>
        <div
          className={classNames(
            'absolute z-20 h-full w-full',
            'xl:clip-path-polygon-[55%_100%,88%_70%,84%_100%]',
            'clip-path-polygon-[100%_100%,100%_72%,30%_83%]',
            'from-deep-green to-challenger-green bg-gradient-180 xl:bg-gradient-90'
          )}
        ></div>
        <div
          className={classNames(
            'absolute z-20 h-full w-full',
            'xl:clip-path-polygon-[84%_100%,88%_70%,100%_100%]',
            'clip-path-polygon-[0%_77%,0%_100%,30%_83%]',
            'from-bright-navy via-blue to-blue bg-gradient-120 xl:bg-gradient-240'
          )}
        ></div>
      </>
    );
  };

  return (
    <div
      link_component={linkComponent}
      className={classNames(
        'flex h-fit gap-4',
        'items-start bg-white',
        'rounded-sm border-white',
        'flex-col',
        'w-full items-start md:w-[820px] xl:w-[1020px] xl:gap-5',
        { 'shadow-lg': showCardShadow },
        isEditMode
          ? 'xl:h-[416px] xl:flex-row'
          : 'xl:grid xl:h-full xl:min-h-[320px] xl:grid-cols-[455px_545px]'
      )}
    >
      <div className="relative flex h-[290px] w-full md:h-[550px] xl:h-full xl:w-[455px] xl:flex-row">
        {renderShards()}
        <CardBaseImage
          image={CardImage}
          className={classNames(
            'absolute z-10 h-full w-full',
            'xl:clip-path-polygon-[80%_0,88%_70%,55%_100%,0_100%,0_0]',
            'clip-path-polygon-[0_0,100%_0,100%_73%,30%_83%,0%_43%]'
          )}
        />
      </div>
      <div className="relative flex min-h-[300px] w-full flex-col justify-between p-6 xl:h-full xl:w-[545px] xl:p-10">
        <div
          className={classNames(
            'relative flex flex-col items-start justify-start gap-6',
            'xl:[&_h1]:line-clamp-2 xl:[&_h2]:line-clamp-2 xl:[&_h3]:line-clamp-2 xl:[&_h4]:line-clamp-2',
            'xl:[&_div]:line-clamp-[7] xl:[&_p]:line-clamp-[7]'
          )}
        >
          <CustomHeading className="min-h-[32px] text-left font-roboto-700 text-2xl text-bright-navy">
            <Text field={Heading} />
          </CustomHeading>
          <RichText
            className="custom-content text-left text-base [&_p]:mb-5 [&_p]:pb-0"
            field={Content}
          />
        </div>
        {isEditMode && (
          <div className="mt-5 flex">
            <JssLink field={Link as LinkField} className="py-4 text-lg" />
          </div>
        )}
        {!isEditMode && hasValidLink && Link && (
          <div className="flex justify-start [&_a]:text-lg">
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

export default CardInfo7;
