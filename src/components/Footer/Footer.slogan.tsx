import { Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { SloganProps } from './Footer.slogan.types';

const FooterSlogan = (props: SloganProps): React.JSX.Element => {
  const { page: sitecoreContext } = useSitecore();

  if (
    (props.rendering.fields?.Text?.value &&
      props.rendering.fields?.Text?.value?.trim()?.length > 0) ||
    (sitecoreContext && sitecoreContext.mode?.isEditing)
  ) {
    return (
      <Text
        tag="span"
        className="text-sm lg:pr-4 xl:max-w-[330px]"
        field={props.rendering.fields?.Text}
      />
    );
  }

  return <></>;
};

export default FooterSlogan;
