import { removeKeys } from '../object.helper';

describe('Challenger | ObjectHelper', () => {
  describe('removeKeys', () => {
    test('Path to the property exists - Key is removed from object', () => {
      let objectToUpdate = {
        main: {
          nested: {
            property: {
              value: 'test',
            },
          },
        },
      };

      const path = 'main.nested.property';

      // remove prop
      objectToUpdate = removeKeys(objectToUpdate, path);
      expect(objectToUpdate.main.nested.property).toEqual(undefined);
    });

    test('Part of the Path to the property does not exists - Key is not removed', () => {
      let objectToUpdate = {
        main: {
          nested: {
            property: {
              value: 'test',
            },
          },
        },
      };

      const path = 'main.nested.nonexisting.property';

      // remove prop
      objectToUpdate = removeKeys(objectToUpdate, path);
      expect(objectToUpdate.main.nested.property.value).toEqual('test');
    });
  });
});
