import { BannerBgColor } from './ArticleBanner.types';

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

export const getBannerBgColour = (key: string) => {
  if (Object.keys(BannerBgColor).includes(key as BannerBgColor))
    return BannerBgColor[key as keyof typeof BannerBgColor];
  return BannerBgColor.DeepBlue;
};
