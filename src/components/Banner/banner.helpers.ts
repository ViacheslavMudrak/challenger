import { BannerBgColor } from './Banner.types';

/**
 * Maps bgColour to Banner background colour
 * @param bgColor string
 * @returns BannerBgColor
 */
export const getBgBannerColor = (bgColor: string | undefined): BannerBgColor => {
  if (bgColor) {
    if (bgColor.toLowerCase() === 'grey') {
      return BannerBgColor.Grey;
    }

    if (bgColor.toLowerCase() === 'navy') {
      return BannerBgColor.Navy;
    }

    if (bgColor.toLowerCase() === 'green') {
      return BannerBgColor.Green;
    }

    if (bgColor.toLowerCase() === 'white') {
      return BannerBgColor.White;
    }

    if (bgColor.toLowerCase() === 'teal') {
      return BannerBgColor.Teal;
    }

    if (bgColor.toLowerCase() === 'blue') {
      return BannerBgColor.Blue;
    }

    if (bgColor.toLowerCase() === 'deepblue') {
      return BannerBgColor.DeepBlue;
    }

    if (bgColor.toLowerCase() === 'lightblue') {
      return BannerBgColor.LightBlue;
    }
  }

  return BannerBgColor.None;
};

/**
 * Get user initials from full name
 * @param fullName
 * @returns string
 */
export const getInitialsFromFullName = (fullName: string): string => {
  if (fullName.length === 0) {
    return '';
  }

  const nameParts = fullName.toUpperCase().split(' ');

  if (nameParts.length > 1) {
    const firstInitial = nameParts[0].charAt(0);
    const lastInitial = nameParts[nameParts.length - 1].charAt(0);

    return `${firstInitial}${lastInitial}`;
  }

  return nameParts[0].charAt(0);
};

/**
 * Determines whether background colour is from dark palette
 * @param bannerBgColor string
 * @returns boolean
 */
export const isDarkBackground = (bannerBgColor: string): boolean => {
  if (!bannerBgColor || bannerBgColor.length === 0) {
    return false;
  }

  const darkBackgroundColours = [
    BannerBgColor.Blue,
    BannerBgColor.Navy,
    BannerBgColor.Teal,
    BannerBgColor.DeepBlue,
  ];

  return darkBackgroundColours.includes(bannerBgColor as BannerBgColor);
};
