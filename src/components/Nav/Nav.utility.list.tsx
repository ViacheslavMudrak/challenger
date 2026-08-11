import { useMediaQuery } from 'usehooks-ts';
import classNames from 'classnames';
import IconButton from 'components/IconButton/IconButton';
import { IconColor, IconSize } from 'components/Icons/icon.types';
import { DESKTOP_MEDIA_QUERY } from 'components/constants';
import { SupportedDeviceType, UtilityListFields } from './Nav.types';
import ButtonLink from 'components/Button/Button.link';
import { Variant } from 'components/Button/Button.types';
import { IconType } from 'components/IconButton/IconButton.types';
import { Link as JssLink } from '@sitecore-content-sdk/nextjs';

export interface NavUtilityListProps {
  params: { [key: string]: string };
  fields: UtilityListFields;
}

const NavUtilityList = (props: NavUtilityListProps): React.JSX.Element => {
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const isMobile = !isDesktop;

  if (!props.fields?.items) {
    return <></>;
  }

  const { items } = props.fields;

  const renderLinks = () => {
    if (items && items.length > 0) {
      return items.map((item, idx) => {
        const { Link, SupportedDevice } = item.fields;
        const isValidLink = Link && Link.value.href && Link.value.text;
        const device = SupportedDevice?.fields.Device.value as SupportedDeviceType;

        if (
          item.fields.Icon &&
          item.fields.Icon.fields.IconType.value &&
          isValidLink &&
          (device === 'Desktop' || device === 'All') &&
          !isMobile
        ) {
          return (
            <li key={idx} className="xl:border-l xl:border-light-blue xl:pl-6">
              <IconButton
                type={item.fields.Icon.fields.IconType.value as IconType}
                iconSize={isMobile ? IconSize.Md : IconSize.Sm}
                iconColor={IconColor.White}
                className="hover:text-white hover:underline hover:underline-offset-[6px]"
              >
                <JssLink field={item.fields.Link} link_name={item.fields.Link.value.text} />
              </IconButton>
            </li>
          );
        }

        const renderLinkItem = () => {
          return (
            <li key={idx} className="[&_a]:font-roboto-400 [&_a]:text-lg xl:[&_a]:text-base">
              <ButtonLink
                variant={Variant.Link}
                className="font-roboto-400 hover:text-white hover:underline hover:underline-offset-[6px]"
                as="link"
                linkUrl={item.fields.Link.value.href}
                Color={{ fields: { Type: { value: 'Primary' } } }}
                LinkValue={item.fields.Link}
              />
            </li>
          );
        };

        if (isValidLink && isDesktop && (device === 'Desktop' || device === 'All')) {
          return renderLinkItem();
        }

        if (isValidLink && isMobile && (device === 'Mobile' || device === 'All')) {
          return renderLinkItem();
        }

        return null;
      });
    }

    return null;
  };

  return (
    <ul
      className={classNames(
        'flex items-start justify-start gap-8 xl:w-full',
        'text-white xl:flex-row',
        '[&_li]:flex [&_li]:items-center',
        'max-xl:flex-wrap max-xl:[&_li]:basis-[calc(50%-1rem)]'
      )}
    >
      {renderLinks()}
    </ul>
  );
};

export default NavUtilityList;
