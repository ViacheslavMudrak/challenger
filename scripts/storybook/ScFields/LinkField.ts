import { LinkField } from '@sitecore-content-sdk/nextjs';
import { getNestedProperty } from '../../../src/lib/challenger/object.helper';

const LinkSCFieldsAttribute = [
  'value.text',
  'value.anchor',
  'value.linktype',
  'value.title',
  'value.class',
  'value.target',
  'value.querystring',
  'value.id',
  'value.href',
];

export const LinkSCFieldsToRemove = [
  'value.anchor',
  'value.linktype',
  'value.title',
  'value.class',
  'value.target',
  'value.querystring',
  'value.id',
  'value.href',
];

export function isLinkField(obj: LinkField): obj is LinkField {
  let result = true;
  LinkSCFieldsAttribute.forEach((element) => {
    if (getNestedProperty(obj, element) === undefined) {
      result = false;
    }
  });
  return result;
}
