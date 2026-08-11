import { Link, LinkFieldValue } from '@sitecore-content-sdk/nextjs';
import { IconColor, IconSize } from 'components/Icons/icon.types';
import { IconDisplay } from 'components/Icons/Sitecore/IconDisplay';

export interface CardBaseIconProps {
  icon: string;
  withBackgroundColor?: boolean;
  color?: string;
  cta?: LinkFieldValue;
}

const CardBaseIcon = (props: CardBaseIconProps): React.JSX.Element => {
  const { icon, withBackgroundColor, color, cta } = props;
  let iconColor = (color || IconColor.Navy) as IconColor;

  if (color === 'white') {
    iconColor = IconColor.White;
  }

  if (withBackgroundColor) {
    return (
      <div className="bg-bright-navy">
        <IconDisplay color={IconColor.White} size={IconSize.Xl} type={icon} />
      </div>
    );
  }

  if (cta) {
    return (
      <Link field={cta}>
        <IconDisplay color={iconColor} size={IconSize.Xl} type={icon} />
      </Link>
    );
  }

  return <IconDisplay color={iconColor} size={IconSize.Xl} type={icon} />;
};

export default CardBaseIcon;
