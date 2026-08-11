import type { ArgTypes, Meta } from '@storybook/react';
import TableOfContents, { ComponentProps } from '../TableOfContents';
import carouselData from '../mocks/tableOfContents.json';

const meta = {
  title: 'Components/Table Of Contents',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Table of contents description coming soon',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<ArgTypes>;

export default meta;

export const Default = () => {
  const data = carouselData as unknown as ComponentProps;

  return (
    <div className="relative flex h-[600px] w-full flex-row gap-60 overflow-y-auto bg-white xl:p-5">
      <div className="relative">
        <TableOfContents rendering={data.rendering}></TableOfContents>
      </div>
      <div className="flex h-fit w-full flex-col gap-40 p-10 [&_span]:block [&_span]:pt-5">
        <div>
          <h2 id="overview">Overview</h2>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum condimentum, sem vel
            congue congue, lorem nulla efficitur odio, sed tincidunt arcu arcu id neque. Cras ligula
            ipsum, hendrerit in hendrerit in, condimentum vitae eros. Nunc dui est, scelerisque eget
            tempor sit amet, lobortis eget tellus. Nunc in faucibus quam, a semper neque. Nulla
            facilisi
          </span>
        </div>
        <div>
          <h2 id="benefits">Benefits</h2>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum condimentum, sem vel
            congue congue, lorem nulla efficitur odio, sed tincidunt arcu arcu id neque. Cras ligula
            ipsum, hendrerit in hendrerit in, condimentum vitae eros. Nunc dui est, scelerisque eget
            tempor sit amet, lobortis eget tellus. Nunc in faucibus quam, a semper neque. Nulla
            facilisi
          </span>
        </div>
        <div>
          <h2 id="payment-options">Payment options</h2>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum condimentum, sem vel
            congue congue, lorem nulla efficitur odio, sed tincidunt arcu arcu id neque. Cras ligula
            ipsum, hendrerit in hendrerit in, condimentum vitae eros. Nunc dui est, scelerisque eget
            tempor sit amet, lobortis eget tellus. Nunc in faucibus quam, a semper neque. Nulla
            facilisi
          </span>
        </div>
        <div>
          <h2 id="frequent-asked-questions">Frequent asked questions</h2>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum condimentum, sem vel
            congue congue, lorem nulla efficitur odio, sed tincidunt arcu arcu id neque. Cras ligula
            ipsum, hendrerit in hendrerit in, condimentum vitae eros. Nunc dui est, scelerisque eget
            tempor sit amet, lobortis eget tellus. Nunc in faucibus quam, a semper neque. Nulla
            facilisi
          </span>
        </div>
      </div>
    </div>
  );
};
