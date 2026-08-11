import {
  ComponentParams,
  ComponentRendering,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import { SyntheticEvent } from 'react';

export enum ColorType {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
}

export enum Variant {
  Solid = 'solid',
  Outline = 'outline',
  Link = 'link',
}

export type ButtonElement = React.ElementRef<'button'>;

export interface ButtonProps {
  id?: string;
  Color?: ButtonTypeField;
  variant: Variant;
  className?: string;
  HasArrow?: Field<boolean>;
  isDisabled?: boolean;
  ariaLabel?: string;
  as?: 'button' | 'link';
  useChevron?: boolean;
  onClick?: (e: SyntheticEvent) => void;
  linkUrl?: string;
  LinkValue: LinkField;
  isExternalLink?: boolean;
  disableHoverState?: boolean;
  UseModal?: Field<boolean>;
}

export interface ButtonTypeField {
  fields: {
    Type: Field<string>;
  };
}

export interface ButtonComponentProps {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: ButtonProps };
}
