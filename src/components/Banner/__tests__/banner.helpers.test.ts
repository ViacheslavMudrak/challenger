import { getBgBannerColor, getInitialsFromFullName } from '../banner.helpers';
import { BannerBgColor } from '../Banner.types';

describe('Banner | Helpers', () => {
  describe('getBgBannerColor', () => {
    const cases = [
      ['grey', BannerBgColor.Grey],
      ['green', BannerBgColor.Green],
      ['white', BannerBgColor.White],
      ['navy', BannerBgColor.Navy],
      ['', BannerBgColor.None],
      ['random', BannerBgColor.None],
      ['GREY', BannerBgColor.Grey],
      ['gReY', BannerBgColor.Grey],
    ];

    test.each(cases)('should convert %p and returns %p', (firstArg, expected) => {
      const bannerBgColor = getBgBannerColor(firstArg);

      expect(bannerBgColor).toEqual(expected);
    });
  });

  describe('getInitialsFromFullName', () => {
    const cases = [
      ['john doe', 'JD'],
      ['James', 'J'],
      ['', ''],
      ['John Edward Jim', 'JJ'],
    ];
    test.each(cases)(
      'converts full name from %p to %p initials correctly',
      (firstArg, expected) => {
        const initials = getInitialsFromFullName(firstArg);

        expect(initials).toEqual(expected);
      }
    );
  });
});
