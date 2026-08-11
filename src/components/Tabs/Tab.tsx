import TabVariant1, { TabVariant1Props } from './Tab.variant1';
import TabVariant2, { TabVariant2Props } from './Tab.variant2';

export const Default = (props: TabVariant1Props) => {
  return <TabVariant1 {...props} />;
};

export const HorizontalTab = (props: TabVariant1Props) => {
  return <TabVariant1 {...props} />;
};

export const VerticalTab = (props: TabVariant2Props) => {
  return <TabVariant2 {...props} />;
};
