/* eslint-disable  @typescript-eslint/no-explicit-any */

function recursionSet(obj: any, keysList: string[], value: any): any {
  const key = keysList[0];
  if (keysList.length === 1) return { ...obj, [key]: value };

  if (key.includes('[')) {
    const splitKeys = key.split('[');
    const mainKey = splitKeys[0];
    const position = parseInt(splitKeys[1].replace(']', ''));

    // set the array value based on position
    const arrayObjectForMainKey = obj?.[mainKey];
    arrayObjectForMainKey[position] = recursionSet(
      obj?.[mainKey][position] || {},
      keysList.slice(1),
      value
    );
    return { ...obj, [mainKey]: arrayObjectForMainKey };
  } else {
    return { ...obj, [key]: recursionSet(obj?.[key] || {}, keysList.slice(1), value) };
  }
}

/**
 * Set an object nested properties on an object
 * This will create the path if it does not exists
 **/
export function setNestedProperty(obj: any, keysString: string, value: any) {
  const result = recursionSet(obj, keysString.split('.'), value);
  return result;
}

function recursionGet(obj: any, keysList: string[]): any {
  const key = keysList[0];

  if (keysList.length === 1) return obj?.[key];

  // check if the property is an array
  if (key.includes('[')) {
    const splitKeys = key.split('[');
    const mainKey = splitKeys[0];
    const position = splitKeys[1].replace(']', '');

    return recursionGet(obj?.[mainKey][position] || {}, keysList.slice(1));
  } else {
    return recursionGet(obj?.[key] || {}, keysList.slice(1));
  }
}

/**
 * Get the value of a nested properties from an object
 **/
export function getNestedProperty(obj: any, keysString: string) {
  const result = recursionGet(obj, keysString.split('.'));
  return result;
}

function recursionRemove(obj: any, keysList: string[]): any {
  const key = keysList[0];
  if (keysList.length === 1) return delete obj[key];
  return { ...obj, [key]: recursionRemove(obj?.[key] || {}, keysList.slice(1)) };
}

/**
 * Remove a nested Key from an object.
 * It will only remove the key - not all the parent path
 **/
export function removeKeys(obj: any, keysString: string) {
  recursionRemove(obj, keysString.split('.'));
  return obj;
}
