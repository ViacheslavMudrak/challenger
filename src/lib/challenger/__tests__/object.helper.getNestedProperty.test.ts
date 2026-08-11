import { getNestedProperty } from '../object.helper';

describe('Challenger | ObjectHelper', () => {
  describe('getNestedProperty', () => {
    test('Path to the property exists - value is retrieved', () => {
      const objectToUpdate = {
        main: {
          nested: {
            property: {
              value: 'test',
            },
          },
        },
      };

      const path = 'main.nested.property.value';

      // get the nested prop
      const value = getNestedProperty(objectToUpdate, path);

      expect(value).toEqual('test');
    });
    test('Part of the Path to the property does not exists - value retrieved is undefined', () => {
      const objectToUpdate = {
        main: {
          nested: {
            property: {
              value: 'test',
            },
          },
        },
      };

      const path = 'main.nested.nonexisting.property.value';

      // get the nested prop
      const value = getNestedProperty(objectToUpdate, path);

      expect(value).toEqual(undefined);
    });
    test('Last Part of the Path to the property does not exists - value retrieved is undefined', () => {
      const objectToUpdate = {
        main: {
          nested: {
            property: {
              value: 'test',
            },
          },
        },
      };

      const path = 'main.nested.property.val';

      // get the nested prop
      const value = getNestedProperty(objectToUpdate, path);

      expect(value).toEqual(undefined);
    });
    test('Array - get the value from a correct path from array position 1', () => {
      const objectToUpdate = {
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

      // get the nested prop
      const value = getNestedProperty(objectToUpdate, path);

      expect(value).toEqual('secondobject');
    });
    test('Array - get out of bound from array position 3', () => {
      const objectToUpdate = {
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

      // get the nested prop
      const value = getNestedProperty(objectToUpdate, path);

      expect(value).toEqual(undefined);
    });
    test('Array - get item from a correct position in array but the property does not exists', () => {
      const objectToUpdate = {
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

      const path = 'main.nested.myarray[1].property.val';

      // get the nested prop
      const value = getNestedProperty(objectToUpdate, path);

      expect(value).toEqual(undefined);
    });
  });
});
