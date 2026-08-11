import { type Meta } from '@storybook/react';
import Nav from '../Nav';
import { NavFields, NavRenderingType } from '../Nav.types';
import NavData from '../mocks/nav.datasource.json';
import { NavCtaProps } from '../Nav.cta';
import { deleteCookie } from 'cookies-next';
import { COOKIE_USER_TYPE_NAME } from 'src/constants';

type ArticleType = {
  heading: string;
  content: string;
  url: string;
  buttonLabel: string;
};

type SubMenuType = {
  text: string;
  url: string;
};

interface ArgTypes {
  menuItem1: string;
  menuItem2: string;
  menuItem3: string;
  menuItem4: string;
  registerButtonLabel: string;
  applyNowButtonLabel: string;
  article1: ArticleType;
  subMenu1: SubMenuType[];
  toggleUtilityPanel: boolean;
}

const meta = {
  title: 'Components/Nav',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    menuItem1: {
      name: 'Menu item 1',
      control: { type: 'text' },
      description: 'Menu Item',
      table: {
        category: 'Main menu',
      },
    },
    menuItem2: {
      name: 'Menu item 2',
      control: { type: 'text' },
      description: 'Menu Item',
      table: {
        category: 'Main menu',
      },
    },
    menuItem3: {
      name: 'Menu item 3',
      control: { type: 'text' },
      description: 'Menu Item',
      table: {
        category: 'Main menu',
      },
    },
    menuItem4: {
      name: 'Menu item 4',
      control: { type: 'text' },
      description: 'Menu Item',
      table: {
        category: 'Main menu',
      },
    },
    registerButtonLabel: {
      name: 'Register button',
      control: { type: 'text' },
      table: {
        category: 'Main menu',
      },
    },
    applyNowButtonLabel: {
      name: 'Apply Now button',
      control: { type: 'text' },
      table: {
        category: 'Main menu',
      },
    },
    article1: {
      name: 'Article 1',
      control: { type: 'object' },
      description: 'Campaign article',
      table: {
        category: 'Sub menu',
      },
    },
    subMenu1: {
      name: 'Sub menu 1',
      control: { type: 'object' },
      description: 'Sub menu links',
      table: {
        category: 'Sub menu',
      },
    },
    toggleUtilityPanel: {
      name: 'Show/Hide utility panel',
      control: { type: 'boolean' },
      table: {
        category: 'Utility',
      },
    },
  },
  args: {
    menuItem1: "I'm interested in...",
    menuItem2: 'What we offer',
    menuItem3: 'Why challenger',
    menuItem4: 'Help and support',
    registerButtonLabel: 'Register',
    applyNowButtonLabel: 'Apply Now',
    toggleUtilityPanel: false,
    article1: {
      heading: 'Campaign heading 1',
      content:
        'Use this section to introduce the content within this mega menu. Alternatively, this section could be used to advertise a campaign.',
      url: '/article1',
      buttonLabel: 'Read more',
    },
    subMenu1: [
      {
        text: 'Getting ready for retirement',
        url: '/',
      },
      {
        text: 'Protecting my retirement income',
        url: '/',
      },
      {
        text: 'Planning for aged care',
        url: '/',
      },
      {
        text: 'Building my wealth',
        url: '/',
      },
    ],
  },
} satisfies Meta<ArgTypes>;

export default meta;

export const Default = (args: ArgTypes) => {
  const {
    menuItem1,
    menuItem2,
    menuItem3,
    menuItem4,
    applyNowButtonLabel,
    registerButtonLabel,
    article1,
    subMenu1,
    toggleUtilityPanel,
  } = args;

  const header = NavData.placeholders['headless-header'][0];
  const navData = header.placeholders['sxa-main-navigation'][0];
  const cta = navData.placeholders['header-top-right'][0] as unknown as NavCtaProps;

  const navItem = navData.fields.data.dataSource.Children.results.find(
    (c) => c.Persona?.value === 'Individual'
  )?.Children;

  if (navItem) {
    navItem.results[0].NavigationTitle.value = menuItem1;
    navItem.results[1].NavigationTitle.value = menuItem2;
    navItem.results[2].NavigationTitle.value = menuItem3;
    navItem.results[3].NavigationTitle.value = menuItem4;

    if (navItem.results[0].CampaignTitle && navItem.results[0].CampaignDescription) {
      navItem.results[0].CampaignTitle.value = article1?.heading;
      navItem.results[0].CampaignDescription.value = article1?.content;
    }

    if (cta.fields?.items?.length > 0) {
      if (cta.fields.items[0]) {
        cta.fields.items[0].fields.LinkValue.value.text = applyNowButtonLabel;
      }

      if (cta.fields.items[1]) {
        cta.fields.items[1].fields.LinkValue.value.text = registerButtonLabel;
      }
    }

    if (subMenu1 && subMenu1.length > 0) {
      navItem.results[0].Children.results[0].NavigationTitle.value = subMenu1[0].text;
      navItem.results[0].Children.results[1].NavigationTitle.value = subMenu1[1].text;
      navItem.results[0].Children.results[2].NavigationTitle.value = subMenu1[2].text;
      navItem.results[0].Children.results[3].NavigationTitle.value = subMenu1[3].text;
    } else {
      navItem.results[0].Children.results = [];
    }
  }
  if (toggleUtilityPanel) {
    deleteCookie(COOKIE_USER_TYPE_NAME);
  }

  return (
    <div className="relative w-full xl:min-w-[1200px]">
      <Nav
        fields={navData.fields as unknown as NavFields}
        rendering={navData as unknown as NavRenderingType}
      />
    </div>
  );
};
