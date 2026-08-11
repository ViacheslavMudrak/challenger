import { ImageField } from '@sitecore-content-sdk/nextjs';
import { getNestedProperty } from '../../../src/lib/challenger/object.helper';

const ImageSCFieldsAttribute = ['value.alt', 'value.src', 'value.width', 'value.height'];

export const ImageSCFieldsToRemove = ['value.alt'];

export function isImageField(obj: ImageField): obj is ImageField {
  let result = true;
  ImageSCFieldsAttribute.forEach((element) => {
    if (!getNestedProperty(obj, element)) {
      result = false;
    }
  });
  return result;
}
