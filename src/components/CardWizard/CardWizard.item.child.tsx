import {
  ComponentParams,
  ComponentRendering,
  Field,
  Placeholder,
  Text,
  LinkField,
  Link as JssLink,
} from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import ButtonLink from 'components/Button/Button.link';
import { Variant } from 'components/Button/Button.types';
import { isValidLink } from 'components/Card/Card.helpers';
import IconButton from 'components/IconButton/IconButton';
import { IconBgColor } from 'components/IconButton/IconButton.types';
import { IconSize } from 'components/Icons/icon.types';
import { useAnalytics, useSitecore } from 'lib/challenger/hooks';

export type CardWizardItemChildFields = {
  Heading?: Field<string>;
  Key?: Field<string>;
  BackKey?: Field<string>;
  ButtonLabel?: Field<string>;
  Content?: Field<string>;
  FooterText?: Field<string>;
  FooterLink1?: LinkField;
  FooterLink2?: LinkField;
};

export interface CardWizardItemChildProps {
  rendering: ComponentRendering & { params: ComponentParams } & {
    fields: CardWizardItemChildFields;
  };
}

const CardWizardItemChild = (props: CardWizardItemChildProps) => {
  const phKey = 'card-wizard-item-child';
  const { Heading, Key, BackKey, ButtonLabel, Content, FooterText, FooterLink1, FooterLink2 } =
    props.rendering.fields;
  const hasValidLink1 = isValidLink(FooterLink1);
  const hasValidLink2 = isValidLink(FooterLink2);
  const { isEditMode } = useSitecore();
  const { linkComponent } = useAnalytics(props.rendering);
  const containerStyles = props?.rendering?.params?.Styles || '';

  const handleBack = () => {
    window.location.hash = `#${BackKey?.value}`;
  };

  return (
    <div
      id={Key?.value || props.rendering.uid}
      link_component={linkComponent}
      className={classNames(
        'relative flex w-full flex-col items-center gap-5 px-5 py-9',
        'card-wizard slide-out-animation',
        containerStyles
      )}
    >
      {isEditMode && (
        <div className="flex gap-2 border border-blue p-3">
          <label>key:</label>
          <Text field={Key} />
        </div>
      )}
      <div className="relative flex w-full flex-col items-center justify-center border-b-[1px] border-b-grey py-2 xl:flex-row ">
        <div className="xl:absolute xl:left-0">
          <IconButton
            type="ArrowLeftIcon"
            onClick={handleBack}
            bgColor={IconBgColor.Primary}
            iconSize={IconSize.Sm}
          >
            {ButtonLabel?.value || 'Back'}
          </IconButton>
        </div>
        <h3 className="max-w-2xl text-center text-lg text-bright-navy">
          <Text field={Heading} />
        </h3>
      </div>
      <div className="max-w-3xl text-center">
        <Text field={Content} />
      </div>
      <div className="flex items-stretch justify-center">
        <Placeholder name={phKey} rendering={props.rendering} />
      </div>
      <div className="flex flex-col gap-2 lg:flex-row">
        <Text field={FooterText} />
        {isEditMode && (
          <>
            <JssLink field={FooterLink1 as LinkField} />
            <JssLink field={FooterLink2 as LinkField} />
          </>
        )}
        {!isEditMode && hasValidLink1 && FooterLink1 && (
          <ButtonLink
            LinkValue={FooterLink1}
            Color={{ fields: { Type: { value: 'primary' } } }}
            HasArrow={{ value: true }}
            variant={Variant.Link}
          />
        )}
        {!isEditMode && hasValidLink2 && FooterLink2 && (
          <ButtonLink
            LinkValue={FooterLink2}
            Color={{ fields: { Type: { value: 'primary' } } }}
            className='relative lg:pl-3 lg:before:absolute lg:before:left-0 lg:before:text-grey lg:before:content-["|"]'
            HasArrow={{ value: true }}
            variant={Variant.Link}
          />
        )}
      </div>
    </div>
  );
};

export default CardWizardItemChild;
