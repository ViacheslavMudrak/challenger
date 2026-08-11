import {
  ComponentParams,
  ComponentRendering,
  Field,
  LinkField,
  LinkFieldValue,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';

export type JsonLink = {
  jsonValue: {
    value: LinkFieldValue;
  };
};

export type NavFilterItemType = {
  id: string;
  url: string;
  name: string;
  displayName: string;
};

export type NavFilter = {
  jsonValue?: NavFilterItemType[];
};

export type NavItemChild = {
  NavigationTitle: TextField;
  Href: JsonLink;
  Persona?: TextField; //individual | adviser | institutional  | generic
  ShowInNavigation: TextField;
  CampaignTitle?: TextField;
  CampaignDescription?: TextField;
  CampaignLink?: JsonLink;
  Children?: {
    results: NavItemChild[];
  };
};

export type NavFields = {
  data: {
    dataSource: {
      name: string;
      Children: {
        results: NavItemChild[];
      };
    };
  };
};

export type ArticleType = {
  heading: string;
  content: string;
  link?: LinkFieldValue;
};

export type Item = {
  name: string;
  displayName: string;
  fields: {
    Link: LinkField;
    Icon?: {
      name: string;
      fields: {
        IconType: Field<string>;
      };
    };
    SupportedDevice?: {
      name: string;
      fields: {
        Device: Field<string>;
      };
    };
  };
};

export type PersonaItem = {
  name: string;
  displayName: string;
  fields: {
    Link: LinkField;
    IsDefault: Field<boolean>;
    CookieValue?: Field<string>;
    UtilityBarLinkText?: Field<string>;
    UtilitySliderLinkText?: Field<string>;
    UtilitySliderWelcomeText?: Field<string>;
    UtilitySliderPersonaMismatchedText?: Field<string>;
    MobilePersonaText?: Field<string>;
  };
};

export type UtilityListFields = {
  items: Item[];
};

export type NavRenderingType = ComponentRendering & { params: ComponentParams };

export interface NavProps {
  params?: { [key: string]: string };
  fields: NavFields;
  handleClick?: (event?: React.MouseEvent<HTMLElement>) => void;
  relativeLevel?: number;
  rendering?: NavRenderingType;
}

export type UserType = 'individual' | 'adviser' | 'institutional';

export type SupportedDeviceType = 'Mobile' | 'Desktop' | 'All';
