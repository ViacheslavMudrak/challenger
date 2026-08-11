/* eslint-disable  @typescript-eslint/no-explicit-any */

import { setNestedProperty } from '../object.helper';

describe('Challenger | ObjectHelper', () => {
  describe('setNestedProperty', () => {
    test('Path to the property exists - value is updated', () => {
      let objectToUpdate = {
        main: {
          nested: {
            property: {
              value: 'test',
            },
          },
        },
      };

      const path = 'main.nested.property.value';

      // update the nested prop
      objectToUpdate = setNestedProperty(objectToUpdate, path, 'newValue');

      expect(objectToUpdate.main.nested.property.value).toEqual('newValue');
    });
    test('part of the Path to the property does not exists - path is created and value is updated', () => {
      let objectToUpdate: any = {
        main: {
          nested: {
            property: {
              value: 'test',
            },
          },
        },
      };

      const path = 'main.nested.nonexisting.property.value';

      // update the nested prop
      objectToUpdate = setNestedProperty(objectToUpdate, path, 'newValue');

      expect(objectToUpdate.main.nested.property.value).toEqual('test');
      expect(objectToUpdate.main.nested.nonexisting.property.value).toEqual('newValue');
    });
    test('Last part of Path to the property does not exists - Variable is created and value is updated', () => {
      let objectToUpdate: any = {
        main: {
          nested: {
            property: {
              value: 'test',
            },
          },
        },
      };

      const path = 'main.nested.property.val';

      // update the nested prop
      objectToUpdate = setNestedProperty(objectToUpdate, path, 'newValue');

      expect(objectToUpdate.main.nested.property.value).toEqual('test');
      expect(objectToUpdate.main.nested.property.val).toEqual('newValue');
    });
    test('Array - update a property in an array - value is updated correctly', () => {
      let objectToUpdate: any = {
        main: {
          nested: {
            myarray: [
              {
                property: {
                  value: 'firstobject',
                },
              },
              {
                property: {
                  value: 'secondobject',
                },
              },
              {
                property: {
                  value: 'thirdobject',
                },
              },
            ],
          },
        },
      };

      const path = 'main.nested.myarray[1].property.value';

      // update the nested prop
      objectToUpdate = setNestedProperty(objectToUpdate, path, 'newValue');

      expect(objectToUpdate.main.nested.myarray[1].property.value).toEqual('newValue');
    });
    test('Array - update an out of bound property in an array - new array position is created and value is updated correctly', () => {
      let objectToUpdate: any = {
        main: {
          nested: {
            myarray: [
              {
                property: {
                  value: 'firstobject',
                },
              },
              {
                property: {
                  value: 'secondobject',
                },
              },
              {
                property: {
                  value: 'thirdobject',
                },
              },
            ],
          },
        },
      };

      const path = 'main.nested.myarray[3].property.value';

      // update the nested prop
      objectToUpdate = setNestedProperty(objectToUpdate, path, 'newValue');

      expect(objectToUpdate.main.nested.myarray.length).toEqual(4);
      expect(objectToUpdate.main.nested.myarray[3].property.value).toEqual('newValue');
    });
  });
});
