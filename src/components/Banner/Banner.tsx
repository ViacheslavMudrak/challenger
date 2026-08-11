import { FC } from 'react';
import { BannerComponentProps, TemplateMapping } from './Banner.types';
import * as InternalBanner from './Banner.sitecore';

const Banner = (props: BannerComponentProps) => {
  const bannerTemplate = props.rendering?.params?.FieldNames || 'Default';
  const selectedBannerTemplate = Object.entries(TemplateMapping).find(
    ([key]) => key === bannerTemplate
  );

  if (!selectedBannerTemplate || (selectedBannerTemplate && selectedBannerTemplate?.length < 2)) {
    return null;
  }

  const bannerName = selectedBannerTemplate[0] as keyof typeof InternalBanner;
  const CustomBanner = InternalBanner[bannerName] as FC<BannerComponentProps>;

  if (CustomBanner) {
    return <CustomBanner {...props} />;
  }

  return null;
};

export default Banner;

Banner.displayName = 'Banner';
