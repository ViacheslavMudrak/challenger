import { Link, useSitecore } from '@sitecore-content-sdk/nextjs';
import { IconSize, IconColor } from '../Icons/icon.types';
import { IconDisplay, HasValidIcon } from 'components/Icons/Sitecore/IconDisplay';
import { FooterSocialLinksProps } from './Footer.social.links.types';

const FooterSocialLinks = (props: FooterSocialLinksProps): React.JSX.Element => {
  const { page: sitecoreContext } = useSitecore();

  if (
    props.rendering.fields?.items?.length > 0 ||
    (sitecoreContext && sitecoreContext.mode?.isEditing)
  ) {
    return (
      <div className="mt-5 flex w-fit flex-wrap items-center gap-4">
        {props.rendering.fields?.items?.map((item) => {
          const propsType = item.fields?.Icon?.fields?.IconType?.value;
          if (
            HasValidIcon(propsType) &&
            ((item.fields.Link?.value?.text &&
              item.fields.Link?.value?.href &&
              item.fields.Link?.value?.href != 'http://') ||
              (sitecoreContext && sitecoreContext.mode?.isEditing))
          ) {
            return (
              <Link
                key={item.fields.Link?.value?.text}
                link_name={item.fields.Link?.value?.text}
                field={item.fields?.Link}
                social_platform={item.fields.Link?.value?.text}
                editable={false}
              >
                <IconDisplay size={IconSize.Lg} color={IconColor.White} type={propsType} />
              </Link>
            );
          }
          return <></>;
        })}
      </div>
    );
  }

  return <></>;
};

export default FooterSocialLinks;
