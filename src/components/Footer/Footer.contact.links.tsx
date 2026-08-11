import { Link, useSitecore } from '@sitecore-content-sdk/nextjs';
import { IconSize, IconColor } from '../Icons/icon.types';
import { IconDisplay } from 'components/Icons/Sitecore/IconDisplay';
import { FooterContactLinksProps } from './Footer.contact.links.types';
import classNames from 'classnames';

const SiteFooterContactLinks = (props: FooterContactLinksProps): React.JSX.Element => {
  const { page: sitecoreContext } = useSitecore();

  if (
    (props.rendering.fields?.items && props.rendering.fields?.items?.length > 0) ||
    (sitecoreContext && sitecoreContext.mode?.isEditing)
  ) {
    return (
      <ul className="flex flex-col gap-2 xl:gap-4">
        {props.rendering.fields?.items?.map((item) => {
          let textClassName = 'text-sm';

          // Issue in SC where tel in link field get replace by HTTP on href... in that case use URL property
          if (
            item.fields?.Link &&
            item.fields?.Link?.value?.url &&
            item.fields?.Link?.value?.href
          ) {
            const urlDetails = item.fields?.Link?.value?.url as string;
            if (urlDetails.startsWith('tel:')) {
              item.fields.Link.value.href = urlDetails;
              textClassName = 'font-roboto-700 text-lg';
            }
          }

          return (
            <li key={item.fields?.Link?.value?.text} className="flex items-center gap-4">
              <IconDisplay
                size={IconSize.Md}
                color={IconColor.White}
                type={item.fields?.Icon?.fields?.IconType?.value}
              />
              <Link
                field={item.fields?.Link}
                link_name={item.fields.Link.value.text}
                editable={false}
                className={classNames('hover:text-bright-teal', textClassName)}
              ></Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return <></>;
};

export default SiteFooterContactLinks;
