export const getDividerColor = (bgColor: string | undefined): string => {
  if (bgColor) {
    if (bgColor.toLowerCase() === 'navy') {
      return 'bg-bright-navy';
    }

    if (bgColor.toLowerCase() === 'green') {
      return 'bg-challenger-green';
    }

    if (bgColor.toLowerCase() === 'teal') {
      return 'bg-deep-teal';
    }

    if (bgColor.toLowerCase() === 'blue') {
      return 'bg-blue';
    }

    if (bgColor.toLowerCase() === 'lightblue') {
      return 'bg-light-blue';
    }

    if (bgColor.toLowerCase() === 'deepblue') {
      return 'bg-deep-blue';
    }

    if (bgColor.toLowerCase() === 'white') {
      return 'bg-white';
    }

    if (bgColor.toLowerCase() === 'grey') {
      return 'bg-grey-light';
    }
  }

  return '';
};

export const getBodyBgColor = (bgColor: string | undefined): string => {
  return getDividerColor(bgColor);
};
