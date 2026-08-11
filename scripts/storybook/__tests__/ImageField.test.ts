/* eslint-disable  @typescript-eslint/no-explicit-any */

import { isImageField } from '../ScFields/ImageField';
import TestDataSample from './Mocks/TestDataSample.json';

describe('ScFields | ImageField', () => {
  describe('IsImageField', () => {
    test('Should be true IF Sitecore field is an Image Field', () => {
      const jsonForSCControl = TestDataSample;

      const field = jsonForSCControl.rendering.fields.CardImage;

      expect(isImageField(field)).toEqual(true);
    });
    test('Should be false IF Sitecore field is not an Image Field', () => {
      const jsonForSCControl = TestDataSample;

      const field = jsonForSCControl.rendering.fields.CardLink;

      expect(isImageField(field)).toEqual(false);
    });
  });
});
