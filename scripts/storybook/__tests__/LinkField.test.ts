/* eslint-disable  @typescript-eslint/no-explicit-any */

import { isLinkField } from '../ScFields/LinkField';
import TestDataSample from './Mocks/TestDataSample.json';

describe('ScFields | LinkField', () => {
  describe('IsLinkField', () => {
    test('Should be true IF Sitecore field is a link Field', () => {
      const jsonForSCControl = TestDataSample;

      const field = jsonForSCControl.rendering.fields.CardLink;

      expect(isLinkField(field)).toEqual(true);
    });
    test('Should be false IF Sitecore field is not a link Field', () => {
      const jsonForSCControl = TestDataSample;

      const field = jsonForSCControl.rendering.fields.CardImage;

      expect(isLinkField(field)).toEqual(false);
    });
  });
});
