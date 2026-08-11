import dynamic from 'next/dynamic';
import { ButtonComponentProps, ButtonTypeField, ColorType, Variant } from './Button.types';

export const Default = (props: ButtonComponentProps) => {
  if (props?.rendering?.fields) {
    props.rendering.fields.variant = Variant.Solid;

    const buttonColor: ButtonTypeField = {
      fields: {
        Type: {
          value: ColorType.Secondary,
        },
      },
    };

    props.rendering.fields.Color = buttonColor;
  }
  const ButtonSolid = dynamic(() => import('components/Button/Button.solid'), {});
  return <ButtonSolid {...props?.rendering?.fields} />;
};

export const SolidGreen = (props: ButtonComponentProps) => {
  if (props?.rendering?.fields) {
    props.rendering.fields.variant = Variant.Solid;

    if (!props.rendering.fields.Color) {
      const buttonColor: ButtonTypeField = {
        fields: {
          Type: {
            value: ColorType.Primary,
          },
        },
      };

      props.rendering.fields.Color = buttonColor;
    }
  }
  const ButtonSolid = dynamic(() => import('components/Button/Button.solid'), {});
  return <ButtonSolid {...props?.rendering?.fields} />;
};

export const OutlineBlue = (props: ButtonComponentProps) => {
  if (props?.rendering?.fields) {
    props.rendering.fields.variant = Variant.Outline;

    if (!props.rendering.fields.Color) {
      const buttonColor: ButtonTypeField = {
        fields: {
          Type: {
            value: ColorType.Primary,
          },
        },
      };

      props.rendering.fields.Color = buttonColor;
    }
  }

  const ButtonOutlined = dynamic(() => import('components/Button/Button.outline'), {});
  return <ButtonOutlined {...props?.rendering?.fields} />;
};

export const OutlineWhite = (props: ButtonComponentProps) => {
  if (props?.rendering?.fields) {
    props.rendering.fields.variant = Variant.Outline;

    if (!props.rendering.fields.Color) {
      const buttonColor: ButtonTypeField = {
        fields: {
          Type: {
            value: ColorType.Secondary,
          },
        },
      };

      props.rendering.fields.Color = buttonColor;
    }
  }

  const ButtonOutlined = dynamic(() => import('components/Button/Button.outline'), {});
  return <ButtonOutlined {...props?.rendering?.fields} />;
};

export const LinkWhite = (props: ButtonComponentProps) => {
  if (props?.rendering?.fields) {
    props.rendering.fields.variant = Variant.Outline;

    if (!props.rendering.fields.Color) {
      const buttonColor: ButtonTypeField = {
        fields: {
          Type: {
            value: ColorType.Secondary,
          },
        },
      };

      props.rendering.fields.Color = buttonColor;
    }

    if (props.rendering.fields.HasArrow?.value) {
      props.rendering.fields.HasArrow.value = true;
    }
  }

  const ButtonLink = dynamic(() => import('components/Button/Button.link'), {});
  return <ButtonLink {...props?.rendering?.fields} />;
};

export const LinkGreen = (props: ButtonComponentProps) => {
  if (props?.rendering?.fields) {
    props.rendering.fields.variant = Variant.Outline;

    if (!props.rendering.fields.Color) {
      const buttonColor: ButtonTypeField = {
        fields: {
          Type: {
            value: ColorType.Tertiary,
          },
        },
      };

      props.rendering.fields.Color = buttonColor;
    }

    if (props.rendering.fields.HasArrow?.value) {
      props.rendering.fields.HasArrow.value = true;
    }
  }

  const ButtonLink = dynamic(() => import('components/Button/Button.link'), {});
  return <ButtonLink {...props?.rendering?.fields} />;
};

export const LinkBlue = (props: ButtonComponentProps) => {
  if (props?.rendering?.fields) {
    props.rendering.fields.variant = Variant.Outline;

    if (!props.rendering.fields.Color) {
      const buttonColor: ButtonTypeField = {
        fields: {
          Type: {
            value: ColorType.Primary,
          },
        },
      };

      props.rendering.fields.Color = buttonColor;
    }

    if (props.rendering.fields.HasArrow?.value) {
      props.rendering.fields.HasArrow.value = true;
    }
  }

  const ButtonLink = dynamic(() => import('components/Button/Button.link'), {});
  return <ButtonLink {...props?.rendering?.fields} />;
};
