import { BannerComponentProps, TemplateMapping } from './Banner.types';
import { getBgBannerColor } from './banner.helpers';
import BannerLoader from './Banner.loader';
import dynamic from 'next/dynamic';
import * as Banner from './Banner.index';
import { ComponentType, FC } from 'react';
import { useSitecore } from '@sitecore-content-sdk/nextjs';

const RenderBannerForEditor = (props: BannerComponentProps, variantName: string) => {
  const TemplateBanner = (Banner as any)[variantName] as FC<BannerComponentProps>; // eslint-disable-line @typescript-eslint/no-explicit-any
  if (TemplateBanner) {
    return <TemplateBanner {...props} />;
  }
  return <></>;
};

export const Default = (props: BannerComponentProps) => {
  const { page: sitecoreContext } = useSitecore();
  const variantName = TemplateMapping.IND_T1_Header_Banner;

  if (props?.rendering?.fields) {
    const { BannerBgColor } = props.rendering?.fields;
    const bannerBgColor = getBgBannerColor(BannerBgColor?.fields?.Color?.value);
    props.rendering.fields.bgColorClass = bannerBgColor;
  }

  if (sitecoreContext && sitecoreContext.mode?.isEditing) {
    return RenderBannerForEditor(props, variantName);
  } else {
    const DynamicBanner1 = dynamic(() => import('components/Banner/Banner.template1'), {
      loading: () => <BannerLoader size="xl" />,
    }) as ComponentType<BannerComponentProps>;
    return <DynamicBanner1 {...props} />;
  }
};
Default.displayName = 'Banner';

export const IND_T1_Header_Banner = (props: BannerComponentProps) => {
  const { page: sitecoreContext } = useSitecore();
  const variantName = TemplateMapping.IND_T1_Header_Banner;

  if (props?.rendering?.fields) {
    const { BannerBgColor } = props.rendering?.fields;
    const bannerBgColor = getBgBannerColor(BannerBgColor?.fields?.Color?.value);
    props.rendering.fields.bgColorClass = bannerBgColor;
  }

  if (sitecoreContext && sitecoreContext.mode?.isEditing) {
    return RenderBannerForEditor(props, variantName);
  } else {
    const DynamicBanner1 = dynamic(() => import('components/Banner/Banner.template1'), {
      loading: () => <BannerLoader size="xl" />,
    }) as ComponentType<BannerComponentProps>;
    return <DynamicBanner1 {...props} />;
  }
};
IND_T1_Header_Banner.displayName = 'Banner';

export const CTA_Middle_Banner_Large = (props: BannerComponentProps) => {
  const { page: sitecoreContext } = useSitecore();
  const variantName = TemplateMapping.CTA_Middle_Banner_Large;

  if (props?.rendering?.fields) {
    const { BannerBgColor } = props.rendering?.fields;
    const bannerBgColor = getBgBannerColor(BannerBgColor?.fields?.Color?.value);
    props.rendering.fields.bgColorClass = bannerBgColor;
  }

  if (sitecoreContext && sitecoreContext.mode?.isEditing) {
    return RenderBannerForEditor(props, variantName);
  } else {
    const DynamicBanner1 = dynamic(() => import('components/Banner/Banner.template2'), {
      loading: () => <BannerLoader size="xl" />,
    }) as ComponentType<BannerComponentProps>;
    return <DynamicBanner1 {...props} />;
  }
};
CTA_Middle_Banner_Large.displayName = 'Banner';

export const ADV_T1_Header_Banner = (props: BannerComponentProps) => {
  const { page: sitecoreContext } = useSitecore();
  const variantName = TemplateMapping.ADV_T1_Header_Banner;

  if (props?.rendering?.fields) {
    const { BannerBgColor } = props.rendering?.fields;
    const bannerBgColor = getBgBannerColor(BannerBgColor?.fields?.Color?.value);
    props.rendering.fields.bgColorClass = bannerBgColor;
  }

  if (sitecoreContext && sitecoreContext.mode?.isEditing) {
    return RenderBannerForEditor(props, variantName);
  } else {
    const DynamicBanner1 = dynamic(() => import('components/Banner/Banner.template3'), {
      loading: () => <BannerLoader size="xl" />,
    }) as ComponentType<BannerComponentProps>;
    return <DynamicBanner1 {...props} />;
  }
};
ADV_T1_Header_Banner.displayName = 'Banner';

export const INSTO_T1_Header_Banner = (props: BannerComponentProps) => {
  const { page: sitecoreContext } = useSitecore();
  const variantName = TemplateMapping.INSTO_T1_Header_Banner;

  if (props?.rendering?.fields) {
    const { BannerBgColor } = props.rendering?.fields;
    const bannerBgColor = getBgBannerColor(BannerBgColor?.fields?.Color?.value);
    props.rendering.fields.bgColorClass = bannerBgColor;
  }

  if (sitecoreContext && sitecoreContext.mode?.isEditing) {
    return RenderBannerForEditor(props, variantName);
  } else {
    const DynamicBanner1 = dynamic(() => import('components/Banner/Banner.template4'), {
      loading: () => <BannerLoader size="xl" />,
    }) as ComponentType<BannerComponentProps>;
    return <DynamicBanner1 {...props} />;
  }
};
INSTO_T1_Header_Banner.displayName = 'Banner';

export const CTA_Footer_Banner_No_Image = (props: BannerComponentProps) => {
  const { page: sitecoreContext } = useSitecore();
  const variantName = TemplateMapping.CTA_Footer_Banner_No_Image;

  if (props?.rendering?.fields) {
    const { BannerBgColor } = props.rendering?.fields;
    const bannerBgColor = getBgBannerColor(BannerBgColor?.fields?.Color?.value);
    props.rendering.fields.bgColorClass = bannerBgColor;
  }

  if (sitecoreContext && sitecoreContext.mode?.isEditing) {
    return RenderBannerForEditor(props, variantName);
  } else {
    const DynamicBanner1 = dynamic(() => import('components/Banner/Banner.template5'), {
      loading: () => <BannerLoader size="xl" />,
    }) as ComponentType<BannerComponentProps>;
    return <DynamicBanner1 {...props} />;
  }
};
CTA_Footer_Banner_No_Image.displayName = 'Banner';

export const IND_T2_Header_Banner = (props: BannerComponentProps) => {
  const { page: sitecoreContext } = useSitecore();
  const variantName = TemplateMapping.IND_T2_Header_Banner;

  if (props?.rendering?.fields) {
    const { BannerBgColor } = props.rendering?.fields;
    const bannerBgColor = getBgBannerColor(BannerBgColor?.fields?.Color?.value);
    props.rendering.fields.bgColorClass = bannerBgColor;
  }

  if (sitecoreContext && sitecoreContext.mode?.isEditing) {
    return RenderBannerForEditor(props, variantName);
  } else {
    const DynamicBanner1 = dynamic(() => import('components/Banner/Banner.template6'), {
      loading: () => <BannerLoader size="xl" />,
    }) as ComponentType<BannerComponentProps>;
    return <DynamicBanner1 {...props} />;
  }
};
IND_T2_Header_Banner.displayName = 'Banner';

export const ADV_T2_Header_Banner = (props: BannerComponentProps) => {
  const { page: sitecoreContext } = useSitecore();
  const variantName = TemplateMapping.ADV_T2_Header_Banner;

  if (props?.rendering?.fields) {
    const { BannerBgColor } = props.rendering?.fields;
    const bannerBgColor = getBgBannerColor(BannerBgColor?.fields?.Color?.value);
    props.rendering.fields.bgColorClass = bannerBgColor;
  }

  if (sitecoreContext && sitecoreContext.mode?.isEditing) {
    return RenderBannerForEditor(props, variantName);
  } else {
    const DynamicBanner1 = dynamic(() => import('components/Banner/Banner.template7'), {
      loading: () => <BannerLoader size="xl" />,
    }) as ComponentType<BannerComponentProps>;
    return <DynamicBanner1 {...props} />;
  }
};
ADV_T2_Header_Banner.displayName = 'Banner';

export const INSTO_T2_Header_Banner = (props: BannerComponentProps) => {
  const { page: sitecoreContext } = useSitecore();
  const variantName = TemplateMapping.INSTO_T2_Header_Banner;

  if (props?.rendering?.fields) {
    const { BannerBgColor } = props.rendering?.fields;
    const bannerBgColor = getBgBannerColor(BannerBgColor?.fields?.Color?.value);
    props.rendering.fields.bgColorClass = bannerBgColor;
  }

  if (sitecoreContext && sitecoreContext.mode?.isEditing) {
    return RenderBannerForEditor(props, variantName);
  } else {
    const DynamicBanner1 = dynamic(() => import('components/Banner/Banner.template8'), {
      loading: () => <BannerLoader size="xl" />,
    }) as ComponentType<BannerComponentProps>;
    return <DynamicBanner1 {...props} />;
  }
};
INSTO_T2_Header_Banner.displayName = 'Banner';

export const GEN_T3_Header_Banner = (props: BannerComponentProps) => {
  const { page: sitecoreContext } = useSitecore();
  const variantName = TemplateMapping.GEN_T3_Header_Banner;

  if (props?.rendering?.fields) {
    const { BannerBgColor } = props.rendering?.fields;
    const bannerBgColor = getBgBannerColor(BannerBgColor?.fields?.Color?.value);
    props.rendering.fields.bgColorClass = bannerBgColor;
  }

  if (sitecoreContext && sitecoreContext.mode?.isEditing) {
    return RenderBannerForEditor(props, variantName);
  } else {
    const DynamicBanner1 = dynamic(() => import('components/Banner/Banner.template9'), {
      loading: () => <BannerLoader size="xl" />,
    }) as ComponentType<BannerComponentProps>;

    return <DynamicBanner1 {...props} />;
  }
};
GEN_T3_Header_Banner.displayName = 'Banner';

export const GEN_T3_Product_Banner = (props: BannerComponentProps) => {
  const { page: sitecoreContext } = useSitecore();
  const variantName = TemplateMapping.GEN_T3_Product_Banner;

  if (props?.rendering?.fields) {
    const { BannerBgColor } = props.rendering?.fields;
    const bannerBgColor = getBgBannerColor(BannerBgColor?.fields?.Color?.value);
    props.rendering.fields.bgColorClass = bannerBgColor;
  }

  if (sitecoreContext && sitecoreContext.mode?.isEditing) {
    return RenderBannerForEditor(props, variantName);
  } else {
    const DynamicBanner1 = dynamic(() => import('components/Banner/Banner.template10'), {
      loading: () => <BannerLoader size="xl" />,
    }) as ComponentType<BannerComponentProps>;
    return <DynamicBanner1 {...props} />;
  }
};
GEN_T3_Product_Banner.displayName = 'Banner';

export const ADV_T3_Header_Banner = (props: BannerComponentProps) => {
  const { page: sitecoreContext } = useSitecore();
  const variantName = TemplateMapping.ADV_T3_Header_Banner;

  if (props?.rendering?.fields) {
    const { BannerBgColor } = props.rendering?.fields;
    const bannerBgColor = getBgBannerColor(BannerBgColor?.fields?.Color?.value);
    props.rendering.fields.bgColorClass = bannerBgColor;
  }

  if (sitecoreContext && sitecoreContext.mode?.isEditing) {
    return RenderBannerForEditor(props, variantName);
  } else {
    const DynamicBanner1 = dynamic(() => import('components/Banner/Banner.template11'), {
      loading: () => <BannerLoader size="xl" />,
    }) as ComponentType<BannerComponentProps>;
    return <DynamicBanner1 {...props} />;
  }
};
ADV_T3_Header_Banner.displayName = 'Banner';

export const GEN_T4_Header_Banner = (props: BannerComponentProps) => {
  const { page: sitecoreContext } = useSitecore();
  const variantName = TemplateMapping.GEN_T4_Header_Banner;

  if (props?.rendering?.fields) {
    const { BannerBgColor } = props.rendering?.fields;
    const bannerBgColor = getBgBannerColor(BannerBgColor?.fields?.Color?.value);
    props.rendering.fields.bgColorClass = bannerBgColor;
  }

  if (sitecoreContext && sitecoreContext.mode?.isEditing) {
    return RenderBannerForEditor(props, variantName);
  } else {
    const DynamicBanner1 = dynamic(() => import('components/Banner/Banner.template12'), {
      loading: () => <BannerLoader size="xl" />,
    }) as ComponentType<BannerComponentProps>;
    return <DynamicBanner1 {...props} />;
  }
};
GEN_T4_Header_Banner.displayName = 'Banner';

export const ADV_T4_Header_Banner = (props: BannerComponentProps) => {
  const { page: sitecoreContext } = useSitecore();
  const variantName = TemplateMapping.ADV_T4_Header_Banner;

  if (props?.rendering?.fields) {
    const { BannerBgColor } = props.rendering?.fields;
    const bannerBgColor = getBgBannerColor(BannerBgColor?.fields?.Color?.value);
    props.rendering.fields.bgColorClass = bannerBgColor;
  }

  if (sitecoreContext && sitecoreContext.mode?.isEditing) {
    return RenderBannerForEditor(props, variantName);
  } else {
    const DynamicBanner1 = dynamic(() => import('components/Banner/Banner.template13'), {
      loading: () => <BannerLoader size="xl" />,
    }) as ComponentType<BannerComponentProps>;
    return <DynamicBanner1 {...props} />;
  }
};
ADV_T4_Header_Banner.displayName = 'Banner';

export const IND_T4_Header_Banner = (props: BannerComponentProps) => {
  const { page: sitecoreContext } = useSitecore();
  const variantName = TemplateMapping.IND_T4_Header_Banner;

  if (props?.rendering?.fields) {
    const { BannerBgColor } = props.rendering?.fields;
    const bannerBgColor = getBgBannerColor(BannerBgColor?.fields?.Color?.value);
    props.rendering.fields.bgColorClass = bannerBgColor;
  }

  if (sitecoreContext && sitecoreContext.mode?.isEditing) {
    return RenderBannerForEditor(props, variantName);
  } else {
    const DynamicBanner1 = dynamic(() => import('components/Banner/Banner.template14'), {
      loading: () => <BannerLoader size="xl" />,
    }) as ComponentType<BannerComponentProps>;
    return <DynamicBanner1 {...props} />;
  }
};
IND_T4_Header_Banner.displayName = 'Banner';

export const INSTO_T4_Header_Banner = (props: BannerComponentProps) => {
  const { page: sitecoreContext } = useSitecore();
  const variantName = TemplateMapping.INSTO_T4_Header_Banner;

  if (props?.rendering?.fields) {
    const { BannerBgColor } = props.rendering?.fields;
    const bannerBgColor = getBgBannerColor(BannerBgColor?.fields?.Color?.value);
    props.rendering.fields.bgColorClass = bannerBgColor;
  }

  if (sitecoreContext && sitecoreContext.mode?.isEditing) {
    return RenderBannerForEditor(props, variantName);
  } else {
    const DynamicBanner1 = dynamic(() => import('components/Banner/Banner.template15'), {
      loading: () => <BannerLoader size="xl" />,
    }) as ComponentType<BannerComponentProps>;
    return <DynamicBanner1 {...props} />;
  }
};
INSTO_T4_Header_Banner.displayName = 'Banner';

export const GEN_T4_Header_Banner_Blue = (props: BannerComponentProps) => {
  const { page: sitecoreContext } = useSitecore();
  const variantName = TemplateMapping.GEN_T4_Header_Banner_Blue;

  if (props?.rendering?.fields) {
    const { BannerBgColor } = props.rendering?.fields;
    const bannerBgColor = getBgBannerColor(BannerBgColor?.fields?.Color?.value);
    props.rendering.fields.bgColorClass = bannerBgColor;
  }

  if (sitecoreContext && sitecoreContext.mode?.isEditing) {
    return RenderBannerForEditor(props, variantName);
  } else {
    const DynamicBanner1 = dynamic(() => import('components/Banner/Banner.template16'), {
      loading: () => <BannerLoader size="xl" />,
    }) as ComponentType<BannerComponentProps>;
    return <DynamicBanner1 {...props} />;
  }
};
GEN_T4_Header_Banner_Blue.displayName = 'Banner';

export const GEN_T4_Header_Banner_Small = (props: BannerComponentProps) => {
  const { page: sitecoreContext } = useSitecore();
  const variantName = TemplateMapping.GEN_T4_Header_Banner_Small;

  if (props?.rendering?.fields) {
    const { BannerBgColor } = props.rendering?.fields;
    const bannerBgColor = getBgBannerColor(BannerBgColor?.fields?.Color?.value);
    props.rendering.fields.bgColorClass = bannerBgColor;
  }

  if (sitecoreContext && sitecoreContext.mode?.isEditing) {
    return RenderBannerForEditor(props, variantName);
  } else {
    const DynamicBanner1 = dynamic(() => import('components/Banner/Banner.template17'), {
      loading: () => <BannerLoader size="xl" />,
    }) as ComponentType<BannerComponentProps>;
    return <DynamicBanner1 {...props} />;
  }
};
GEN_T4_Header_Banner_Small.displayName = 'Banner';

export const CTA_Footer_Banner_Image = (props: BannerComponentProps) => {
  const { page: sitecoreContext } = useSitecore();
  const variantName = TemplateMapping.CTA_Footer_Banner_Image;

  if (props?.rendering?.fields) {
    const { BannerBgColor } = props.rendering?.fields;
    const bannerBgColor = getBgBannerColor(BannerBgColor?.fields?.Color?.value);
    props.rendering.fields.bgColorClass = bannerBgColor;
  }

  if (sitecoreContext && sitecoreContext.mode?.isEditing) {
    return RenderBannerForEditor(props, variantName);
  } else {
    const DynamicBanner1 = dynamic(() => import('components/Banner/Banner.template18'), {
      loading: () => <BannerLoader size="xl" />,
    }) as ComponentType<BannerComponentProps>;
    return <DynamicBanner1 {...props} />;
  }
};

CTA_Footer_Banner_Image.displayName = 'Banner';

export const CTA_Middle_Banner_Small = (props: BannerComponentProps) => {
  const { page: sitecoreContext } = useSitecore();
  const variantName = TemplateMapping.CTA_Middle_Banner_Small;

  if (props?.rendering?.fields) {
    const { BannerBgColor } = props.rendering?.fields;
    const bannerBgColor = getBgBannerColor(BannerBgColor?.fields?.Color?.value);
    props.rendering.fields.bgColorClass = bannerBgColor;
  }

  if (sitecoreContext && sitecoreContext.mode?.isEditing) {
    return RenderBannerForEditor(props, variantName);
  } else {
    const DynamicBanner1 = dynamic(() => import('components/Banner/Banner.template19'), {
      loading: () => <BannerLoader size="xl" />,
    }) as ComponentType<BannerComponentProps>;
    return <DynamicBanner1 {...props} />;
  }
};
CTA_Middle_Banner_Small.displayName = 'Banner';

export const GEN_T2_Header_Icon_Banner = (props: BannerComponentProps) => {
  const { page: sitecoreContext } = useSitecore();
  const variantName = TemplateMapping.GEN_T2_Header_Icon_Banner;

  if (props?.rendering?.fields) {
    const { BannerBgColor } = props.rendering?.fields;
    const bannerBgColor = getBgBannerColor(BannerBgColor?.fields?.Color?.value);
    props.rendering.fields.bgColorClass = bannerBgColor;
  }

  if (sitecoreContext && sitecoreContext.mode?.isEditing) {
    return RenderBannerForEditor(props, variantName);
  } else {
    const DynamicBanner1 = dynamic(() => import('components/Banner/Banner.template20'), {
      loading: () => <BannerLoader size="xl" />,
    }) as ComponentType<BannerComponentProps>;
    return <DynamicBanner1 {...props} />;
  }
};
GEN_T2_Header_Icon_Banner.displayName = 'Banner';

export const GEN_T2_FTD_Rates_Banner = (props: BannerComponentProps) => {
  const { page: sitecoreContext } = useSitecore();
  const variantName = TemplateMapping.GEN_T2_FTD_Rates_Banner;

  if (props?.rendering?.fields) {
    const { BannerBgColor } = props.rendering?.fields;
    const bannerBgColor = getBgBannerColor(BannerBgColor?.fields?.Color?.value);
    props.rendering.fields.bgColorClass = bannerBgColor;
  }

  if (sitecoreContext && sitecoreContext.mode?.isEditing) {
    return RenderBannerForEditor(props, variantName);
  } else {
    const DynamicBanner1 = dynamic(() => import('components/Banner/Banner.template21'), {
      loading: () => <BannerLoader size="xl" />,
    }) as ComponentType<BannerComponentProps>;
    return <DynamicBanner1 {...props} />;
  }
};
GEN_T2_FTD_Rates_Banner.displayName = 'Banner';
