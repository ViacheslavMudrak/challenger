import { Image } from '@sitecore-content-sdk/nextjs';
import { FooterLogoProps } from './Footer.imagelogo.types';

const FooterLogo = (props: FooterLogoProps): React.JSX.Element => {
  return (
    <Image
      field={props.rendering.fields?.Image}
      className="h-16 w-52"
      height={0}
      width={0}
      priority
    />
  );
};

export default FooterLogo;
