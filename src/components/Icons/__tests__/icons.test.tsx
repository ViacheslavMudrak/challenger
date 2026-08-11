import { render, screen } from '@testing-library/react';
import * as Icons from '../index';
import { iconList } from '../content';
import { IconProps, IconSize } from '../icon.types';
import { FC } from 'react';

describe('Icons', () => {
  const icons = iconList
    .filter((f) => f.name !== 'Social')
    .map((i) => i.icons)
    .flat();

  test.each(icons)('should render %p correctly', (arg: string) => {
    const CustomIcon = (Icons as never)[arg] as FC<IconProps>;

    render(<CustomIcon size={IconSize.Lg} />);

    const title = arg.replace(/([a-z](?=[A-Z]))/g, '$1 ');
    const icon = screen.getAllByTitle(title);

    expect(icon[0]).toBeTruthy();
  });

  const socialIcons = [
    ['FacebookIcon', 'Facebook Icon'],
    ['XIcon', 'X Icon'],
    ['InstagramIcon', 'Instagram Icon'],
    ['TwitterIcon', 'Twitter Icon'],
    ['LinkedInIcon', 'LinkedIn Icon'],
  ];
  test.each(socialIcons)('should render social %p correctly', (arg1: string, arg2: string) => {
    const CustomIcon = (Icons as never)[arg1] as FC<IconProps>;

    render(<CustomIcon />);

    const icon = screen.getAllByTitle(arg2)?.[0];

    expect(icon).toBeTruthy();
  });
});
