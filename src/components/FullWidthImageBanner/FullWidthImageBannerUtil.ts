export const buttonAlignmentMapper = (type: string) => {
  switch (type) {
    case 'left':
      return 'start';
    case 'right':
      return 'end';
    default:
      return 'center';
  }
};

export const verticalAlignmentMapper = (type: string) => {
  switch (type) {
    case 'Top':
      return 'start';
    case 'Bottom':
      return 'end';
    default:
      return 'center';
  }
};

export const overlayColorMapper = (color: string) => {
  switch (color) {
    case 'green':
      return '#006341';
    default:
      return '#003b5c';
  }
};

export const contentColorMapper = (color: string) => {
  switch (color) {
    case 'blue':
      return 'text-[#00205b]';
    case 'green':
      return 'text-[#b5bd00]';
    default:
      return 'text-[#ffffff]';
  }
};
