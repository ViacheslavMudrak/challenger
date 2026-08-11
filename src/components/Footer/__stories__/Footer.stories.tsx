import type { Meta } from '@storybook/react';
import Footer from '../Footer';
import FooterData from '../mocks/footer.json';
import { FooterProps } from '../Footer.types';

interface SBFooterProps {
  slogan: string;
  utilityTitle: string;
  utilityLink1: string;
  utilityLink2: string;
  utilityLink3: string;
  utilityLink4: string;
  utilityLink5: string;
  utilityLink6: string;
  phone: string;
  email: string;
  map: string;
  socialLink1: string;
  socialLink2: string;
  acknowledgement: string;
  disclaimer: string;
  secondaryLink1: string;
  secondaryLink2: string;
  secondaryLink3: string;
  secondaryLink4: string;
  secondaryLink5: string;
  secondaryLink6: string;
}

const footerBottomRight = FooterData.rendering.placeholders['footer-bottom-right'][0];
const footerTopMiddle = FooterData.rendering.placeholders['footer-top-middle'][0];
const footerTopRight = FooterData.rendering.placeholders['footer-top-right'][0].fields.items;
const footerTopLeft = FooterData.rendering.placeholders['footer-top-left'][2].fields.items;
const footerMiddle = FooterData.rendering.placeholders['footer-middle'];
const footerTopLeft1 = FooterData.rendering.placeholders['footer-top-left'][1];

const sBFooterProps: SBFooterProps = {
  slogan: footerTopLeft1.fields?.Text?.value || '',
  utilityTitle: footerTopMiddle.fields.data.Title.field.Title.value,
  utilityLink1: footerTopMiddle.fields.data.items.children.results[0].field.Link.value.text,
  utilityLink2: footerTopMiddle.fields.data.items.children.results[1].field.Link.value.text,
  utilityLink3: footerTopMiddle.fields.data.items.children.results[2].field.Link.value.text,
  utilityLink4: footerTopMiddle.fields.data.items.children.results[3].field.Link.value.text,
  utilityLink5: footerTopMiddle.fields.data.items.children.results[4].field.Link.value.text,
  utilityLink6: footerTopMiddle.fields.data.items.children.results[5].field.Link.value.text,
  phone: footerTopRight[1].fields.Link.value.text,
  email: footerTopRight[0].fields.Link.value.text,
  map: footerTopRight[2].fields.Link.value.text,
  socialLink1: footerTopLeft ? footerTopLeft[0].fields.Link.value.href : '',
  socialLink2: footerTopLeft ? footerTopLeft[1].fields.Link.value.href : '',
  acknowledgement: footerMiddle[0].fields.Text ? footerMiddle[0].fields.Text.value : '',
  disclaimer: footerMiddle[1].fields.data
    ? footerMiddle[1].fields.data.personaValue.DisclaimerText.value
    : '',
  secondaryLink1: footerBottomRight.fields.items[0].fields.Link.value.text,
  secondaryLink2: footerBottomRight.fields.items[1].fields.Link.value.text,
  secondaryLink3: footerBottomRight.fields.items[2].fields.Link.value.text,
  secondaryLink4: footerBottomRight.fields.items[3].fields.Link.value.text,
  secondaryLink5: footerBottomRight.fields.items[4].fields.Link.value.text,
  secondaryLink6: footerBottomRight.fields.items[5].fields.Link.value.text,
};

const meta = {
  title: 'Components/Footer',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    slogan: {
      name: 'Slogan',
      control: { type: 'text' },
    },
    socialLink1: {
      name: 'Social Link 1',
      control: { type: 'text' },
    },
    socialLink2: {
      name: 'Social Link 2',
      control: { type: 'text' },
    },
    utilityTitle: {
      name: 'Utility Title',
      control: { type: 'text' },
    },
    utilityLink1: {
      name: 'Utility Link 1',
      control: { type: 'text' },
    },
    utilityLink2: {
      name: 'Utility Link 2',
      control: { type: 'text' },
    },
    utilityLink3: {
      name: 'Utility Link 3',
      control: { type: 'text' },
    },
    utilityLink4: {
      name: 'Utility Link 4',
      control: { type: 'text' },
    },
    utilityLink5: {
      name: 'Utility Link 5',
      control: { type: 'text' },
    },
    utilityLink6: {
      name: 'Utility Link 6',
      control: { type: 'text' },
    },
    phone: {
      name: 'Phone',
      control: { type: 'text' },
    },
    email: {
      name: 'Email',
      control: { type: 'text' },
    },
    map: {
      name: 'Map',
      control: { type: 'text' },
    },
    acknowledgement: {
      name: 'Acknowledgement',
      control: { type: 'text' },
    },
    disclaimer: {
      name: 'disclaimer',
      control: { type: 'text' },
    },
    secondaryLink1: {
      name: 'Secondary Link 1',
      control: { type: 'text' },
    },
    secondaryLink2: {
      name: 'Secondary Link 2',
      control: { type: 'text' },
    },
    secondaryLink3: {
      name: 'Secondary Link 3',
      control: { type: 'text' },
    },
    secondaryLink4: {
      name: 'Secondary Link 4',
      control: { type: 'text' },
    },
    secondaryLink5: {
      name: 'Secondary Link 5',
      control: { type: 'text' },
    },
    secondaryLink6: {
      name: 'Secondary Link 6',
      control: { type: 'text' },
    },
  },
  args: sBFooterProps,
  decorators: [],
} satisfies Meta<SBFooterProps>;

export default meta;

export const Default = (args: SBFooterProps) => {
  footerTopLeft1.fields.Text = { value: args.slogan };

  footerTopMiddle.fields.data.Title.field.Title.value = args.utilityTitle;
  footerTopMiddle.fields.data.items.children.results[0].field.Link.value.text = args.utilityLink1;
  footerTopMiddle.fields.data.items.children.results[1].field.Link.value.text = args.utilityLink2;
  footerTopMiddle.fields.data.items.children.results[2].field.Link.value.text = args.utilityLink3;
  footerTopMiddle.fields.data.items.children.results[3].field.Link.value.text = args.utilityLink4;
  footerTopMiddle.fields.data.items.children.results[4].field.Link.value.text = args.utilityLink5;
  footerTopMiddle.fields.data.items.children.results[5].field.Link.value.text = args.utilityLink6;

  footerTopRight[0].fields.Link.value.text = args.phone;
  footerTopRight[1].fields.Link.value.text = args.email;
  footerTopRight[2].fields.Link.value.text = args.map;

  if (footerTopLeft) {
    footerTopLeft[0].fields.Link.value.href = args.socialLink1;
    footerTopLeft[1].fields.Link.value.href = args.socialLink2;
  }

  footerMiddle[0].fields.Text = {
    value: args.acknowledgement,
  };

  if (footerMiddle[1].fields.data) {
    footerMiddle[1].fields.data.personaValue.DisclaimerText.value = args.disclaimer;
  }

  footerBottomRight.fields.items[0].fields.Link.value.text = args.secondaryLink1;
  footerBottomRight.fields.items[1].fields.Link.value.text = args.secondaryLink2;
  footerBottomRight.fields.items[2].fields.Link.value.text = args.secondaryLink3;
  footerBottomRight.fields.items[3].fields.Link.value.text = args.secondaryLink4;
  footerBottomRight.fields.items[4].fields.Link.value.text = args.secondaryLink5;
  footerBottomRight.fields.items[5].fields.Link.value.text = args.secondaryLink6;

  const rendering = FooterData as unknown as FooterProps;

  return <Footer rendering={rendering.rendering} />;
};
