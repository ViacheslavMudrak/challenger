import { Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { AcknowledgementProps } from './Footer.acknowledgement.types';

const FooterAcknowledgement = (props: AcknowledgementProps): React.JSX.Element => {
  const { page: sitecoreContext } = useSitecore();

  if (
    (props.rendering.fields?.Text?.value &&
      props.rendering.fields?.Text?.value?.trim()?.length > 0) ||
    (sitecoreContext && sitecoreContext.mode?.isEditing)
  ) {
    return (
      <Text
        tag="div"
        className="w-full border border-light-blue p-6 text-sm"
        field={props.rendering.fields?.Text}
      />
    );
  }

  return <></>;
};

export default FooterAcknowledgement;
