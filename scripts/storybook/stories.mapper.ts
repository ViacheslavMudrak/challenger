import {
  getNestedProperty,
  removeKeys,
  setNestedProperty,
} from '../../src/lib/challenger/object.helper';
import { LinkSCFieldsToRemove, isLinkField } from './ScFields/LinkField';
import { SbArgsType, StorybookType, mappedObjects } from './storybook.sitecore.types';
import { ImageSCFieldsToRemove, isImageField } from './ScFields/ImageField';
import { globalSCFieldsToRemove } from './ScFields/RenderingField';

/**
 * This is a Converter class used to map a Sitecore Props Interface with Type that are used for storybook.
 * The Sitecore Interface will be the Props used to pass to the Component Rendering.
 * The sitecore fields are usually really complex object nested down. For story book we would want some fields not to be displayed at all in storybook editor and some fields to be simplier:
 * ie. ImageField.Value.src in sitecore should be SbImageFIeld:string in storybook
 * The Storybook type will be a Partial of the one above but will also have the new somplified fields for storybook.
 * @class StorybookToSitecore
 * @typedef {StorybookToSitecore}
 * @template T (Sitecore Interface)
 * @template V (Storybook type)
 */
export class StorybookToSitecore<T, V> {
  sbItem: V;
  scItem: T;
  map: mappedObjects[];

  constructor(fields: T, map: mappedObjects[], propertiesToRemove: string[]) {
    this.scItem = fields;
    this.sbItem = JSON.parse(JSON.stringify(fields)) as V;
    this.map = map;
    this.removeUnwantedProperties([...globalSCFieldsToRemove, ...propertiesToRemove]);
  }

  /**
   * Retrieve a Storybook object passing the Sitecore object from the Sitecore Props Interface
   * This will simplified the Sitecore fields into the Storybook fields through the mapping defined
   *
   * @param {T} args
   * @returns {V}
   */
  getSBFields(args: T): V {
    this.scItem = args;
    this.map.forEach((elt) => {
      this.sbItem = setNestedProperty(
        this.sbItem,
        elt.fieldName,
        getNestedProperty(this.scItem, elt.originalPath)
      );
    });
    return this.sbItem;
  }

  /**
   * Retrieve the Sitecore Props object passing the corresponding Storybook object with the simplified fields
   * This will convert the simplified fields into the sitecore complexed through the mapping defined
   *
   * @param {V} args
   * @returns {T}
   */
  getSCFields(args: V): T {
    this.sbItem = args;
    this.map.forEach((elt) => {
      this.scItem = setNestedProperty(
        this.scItem,
        elt.originalPath,
        getNestedProperty(this.sbItem, elt.fieldName)
      );
    });
    return this.scItem;
  }

  /**
   * Return the ArgsType based on the Mapping defined from Storybook simplified object.
   * By default all sitecore fields from the props will be assigned the text control.
   *
   * @returns {*}
   */
  getTypes() {
    const returnedObject: SbArgsType = {};

    try {
      for (let i = 0; i < this.map.length; i++) {
        const key = this.map[i].fieldName;
        returnedObject[key] = this.map[i] as StorybookType;
      }
    } catch (ex) {
      console.log(ex);
    }
    return returnedObject;
  }

  /**
   * Remove all the nested properties that we do not want to be displayed on the Storybook for editor.
   * By default all fields from Sitecore Props are editable and the control used is text.
   * Using this function will remove the properties you want to exclude from SB editor but leaves the others editable
   * This has 2 parts:
   *    Remove unwanted fields based on sitecore fields: Linkfield (href, class, target, GUID,...), ImageField (id, alt text,... )
   *    Remove the specific user defined fields passed in the array in the constructor propertiesToRemove.
   *
   * @param {string[]} propertiesToRemove
   */
  private removeUnwantedProperties(propertiesToRemove: string[]) {
    // Remove known specific properties if fields is of type Image or Link
    this.removeScPropertyFromKnownFields(this.sbItem);

    // remove specific user defined fields - defined in array propertiesToRemove
    propertiesToRemove.forEach((element) => {
      removeKeys(this.sbItem, element);
    });
  }

  /**
   * Remove known specific properties if fields is of type Image or Link
   *
   * @param {*} obj
   */
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  private removeScPropertyFromKnownFields(obj: any) {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        if (Array.isArray(obj[key])) {
          // loop through array
          const objAsArray = obj[key] as Array<object>;
          for (let i = 0; i < objAsArray.length; i++) {
            this.removeScPropertyFromKnownFields(objAsArray[i]);
          }
        } else {
          // check the type of fields and remove the correct props...
          // if the field is a link the remove attributes like: href, anchor...
          if (isLinkField(obj[key] as any)) {
            // remove all the predefined attributes
            LinkSCFieldsToRemove.forEach((element) => {
              removeKeys(obj[key], element);
            });
          }
          // if the field is an image - remove the attributes like alt text...
          if (isImageField(obj[key] as any)) {
            // remove all the predefined attributes
            ImageSCFieldsToRemove.forEach((element) => {
              removeKeys(obj[key], element);
            });
          } else {
            // recurse to get children
            this.removeScPropertyFromKnownFields(obj[key]);
          }
        }
      }
    }
    /* eslint-enable  @typescript-eslint/no-explicit-any */
  }
}
