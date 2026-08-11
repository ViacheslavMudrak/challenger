export const getTabBgColour = (key: string | undefined, variant: number) => {
  enum TabBodyBgColor {
    Grey = 'bg-grey-light',
    White = 'bg-white',
    None = '',
  }

  if (key && Object.keys(TabBodyBgColor).includes(key as TabBodyBgColor))
    return TabBodyBgColor[key as keyof typeof TabBodyBgColor];

  return variant === 2 ? TabBodyBgColor.Grey : TabBodyBgColor.White;
};
