import {
  ComponentParams,
  ComponentRendering,
  Field,
  Placeholder,
  Text,
} from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import { useAnalytics, useSitecore } from 'lib/challenger/hooks';

export type CardWizardItemMainFields = {
  Heading?: Field<string>;
  Key?: Field<string>;
};

export interface CardWizardItemMainProps {
  rendering: ComponentRendering & { params: ComponentParams } & {
    fields: CardWizardItemMainFields;
  };
}

const CardWizardItemMain = (props: CardWizardItemMainProps) => {
  const phKey = 'card-wizard-item-main';
  const { Heading, Key } = props.rendering.fields;
  const { isEditMode } = useSitecore();
  const { linkComponent } = useAnalytics(props.rendering);
  const containerStyles = props?.rendering?.params?.Styles || '';

  return (
    <div
      id={Key?.value || props.rendering.uid}
      link_component={linkComponent}
      className={classNames(
        'relative flex w-full flex-col items-center gap-5 px-5 py-10 xl:py-12',
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
      <div className="w-full text-center lg:max-w-[800px]">
        <h3 className="text-3xl leading-normal text-bright-navy xl:text-[40px]">
          <Text field={Heading} />
        </h3>
      </div>
      <div className="flex items-stretch justify-center">
        <Placeholder name={phKey} rendering={props.rendering} />
      </div>
    </div>
  );
};

export default CardWizardItemMain;
