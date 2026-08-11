import { GalleryCardBgColor } from './GalleryContainer.types';

export const getGalleryCardBgColor = (bgColor: string | undefined): GalleryCardBgColor => {
  if (bgColor) {
    switch (bgColor.toLowerCase()) {
      case 'grey':
        return GalleryCardBgColor.Gray;
      case 'gray':
        return GalleryCardBgColor.Gray;
      case 'navy':
        return GalleryCardBgColor.Navy;
      case 'green':
        return GalleryCardBgColor.Green;
      case 'white':
        return GalleryCardBgColor.White;
      case 'teal':
        return GalleryCardBgColor.Teal;
      case 'blue':
        return GalleryCardBgColor.Blue;
      case 'lighblue':
        return GalleryCardBgColor.LightBlue;
      case 'deepblue':
        return GalleryCardBgColor.DeepBlue;

      default:
        return GalleryCardBgColor.White;
    }
  }
  return GalleryCardBgColor.None;
};
