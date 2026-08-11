import type { Meta } from '@storybook/react';
import * as FooterStories from 'components/Footer/__stories__/Footer.stories';
import * as BannerStories from 'components/Banner/__stories__/Banner.stories';
import * as NavStories from 'components/Nav/__stories__/Nav.stories';
import * as CardContainerStories from 'components/Card/__stories__/Card.container.stories';

import { TemplateMapping } from 'components/Banner/Banner.types';
import { CardType, GapSize } from 'components/Card/Card.types';
import classNames from 'classnames';
import { DESKTOP_MAX_WIDTH } from 'components/constants';

interface ArgTypes {
  text: string;
  template1: string;
  template2: string;
  heading: string;
  content: string;
  image: string;
  cardType: CardType;
  cardsPerRow: number;
  includeSeparator: boolean;
  gapSize: GapSize;
  alignment: 'left' | 'center' | 'right';
}

const meta = {
  title: 'Pages/Home',
  parameters: {
    layout: 'fullscreen',
    jest: [],
  },
  argTypes: {
    template1: {
      name: 'Banner 1',
      control: { type: 'select' },
      options: Object.keys(TemplateMapping),
      table: {
        category: 'Banner',
      },
      description: 'Banner template',
    },
    template2: {
      name: 'Banner 2',
      control: { type: 'select' },
      options: Object.keys(TemplateMapping),
      table: {
        category: 'Banner',
      },
      description: 'Banner template',
    },
    heading: {
      control: { type: 'text' },
      name: 'Banner heading',
      table: {
        category: 'Banner',
      },
    },
    content: {
      control: { type: 'text' },
      name: 'Banner content',
      table: {
        category: 'Banner',
      },
    },
    image: {
      control: { type: 'select' },
      name: 'Banner image',
      description: 'Banner image',
      options: [
        'sample1.jpg',
        'sample2.jpg',
        'sample3.jpg',
        'profile1.jpg',
        'profile2.jpg',
        'profile3.jpg',
        'none',
      ],
      table: {
        defaultValue: { summary: 'sample1.jpg' },
        category: 'Banner',
      },
    },
    cardType: {
      name: 'Card type',
      control: { type: 'select' },
      options: Object.values(CardType),
      table: {
        category: 'Card Container',
      },
      description: 'Card type',
    },
    cardsPerRow: {
      name: 'Cards per row',
      control: { type: 'number', min: 1, max: 10, step: 1 },
      table: {
        category: 'Card Container',
      },
      description: 'Cards per row',
    },
    gapSize: {
      name: 'Space between cards',
      control: { type: 'radio' },
      options: ['spacing-small', 'spacing-medium', 'spacing-large', 'none'],
      table: {
        category: 'Card Container',
      },
    },
    includeSeparator: {
      name: 'Include separator',
      control: { type: 'boolean' },
      table: {
        category: 'Card Container',
      },
    },
    alignment: {
      name: 'Alignment',
      control: { type: 'radio' },
      options: ['position-left', 'position-center', 'position-right'],
      table: {
        category: 'Card Container',
      },
    },
  },
  args: {
    template1: BannerStories.default.args.template,
    template2: 'CTA_Footer_Banner_No_Image',
    heading: BannerStories.default.args.heading,
    content: BannerStories.default.args.content,
    image: BannerStories.default.args.image,
    cardType: CardType.Info1,
    cardsPerRow: 4,
    includeSeparator: false,
    gapSize: 'none',
    alignment: 'center',
  },
  tags: ['autodocs'],
} satisfies Meta<ArgTypes>;

export default meta;

export const Default = (args: ArgTypes) => {
  const navArgs = NavStories.default.args;
  const bannerArgs = BannerStories.default.args;
  const footerArgs = FooterStories.default.args;

  return (
    <div className="relative flex h-screen w-full flex-col items-center ">
      <NavStories.Default {...navArgs} />
      <div className={classNames('relative flex w-full flex-col shadow-md', DESKTOP_MAX_WIDTH)}>
        <BannerStories.Default
          {...{
            ...bannerArgs,
            template: args.template1,
            image: args.image,
            content: args.content,
            heading: args.heading,
            bgColor: 'grey',
          }}
        />

        <div className="flex w-full flex-col items-center bg-grey-light pt-20">
          <h2 className="w-4/5 text-center font-roboto-700 text-bright-navy lg:w-3/5">
            Tell us what you’re looking for, and we’ll help you get there
          </h2>

          <CardContainerStories.Default
            {...{
              ...CardContainerStories.default.args,
              cardType: args.cardType,
              gapSize: args.gapSize,
              includeSeparator: args.includeSeparator,
              alignment: args.alignment,
              cardsPerRow: args.cardsPerRow,
            }}
          />
        </div>
        <BannerStories.Default
          {...{
            ...bannerArgs,
            template: args.template2,
            image: args.image,
            content: args.content,
            heading: args.heading,
            bgColor: 'grey',
          }}
        />
      </div>
      <FooterStories.Default {...footerArgs} />
    </div>
  );
};
