export const getCommonSearches = (value: string): string[] => {
  if (value.length === 0) {
    return [];
  }

  const decodedStr = decodeURIComponent(value);
  const list = decodedStr.split('&');

  const processedList = list.map((s) => {
    const itemArr = s.split('=');
    return itemArr[0];
  });

  return processedList;
};
