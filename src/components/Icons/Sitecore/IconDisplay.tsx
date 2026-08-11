import { IconProps, IconSize, IconColor, IconGroup } from '../icon.types';
import { iconList } from '../content';
import { IconType } from '../icon.types';
import * as Icon from '..';
import { FC } from 'react';

export interface FieldProps {
  size: IconSize;
  color: IconColor;
  type: string | undefined;
}

export const IconDisplay = (props: FieldProps): React.JSX.Element => {
  if (props.type) {
    const CustomIcon = Icon[props.type as IconType] as FC<IconProps>;
    if (CustomIcon) {
      return <CustomIcon size={props.size} color={props.color} />;
    }
  }

  return <></>;
};

export const HasValidIcon = (iconType: string | undefined): boolean => {
  if (iconType) {
    for (let i = 0; i < iconList.length; i++) {
      const icons = (iconList[i] as IconGroup).icons as string[]; // eslint-disable-line @typescript-eslint/no-explicit-any
      if (icons?.includes(iconType)) {
        return true;
      }
    }
  }

  return false;
};
