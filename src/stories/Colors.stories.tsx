import type { Meta, StoryFn } from '@storybook/react';
import { ReactNode } from 'react';

const meta = {
  title: 'Design/Colours',
  parameters: {
    layout: 'left',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryFn<typeof meta>;

const TileGroup = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col flex-wrap gap-3 md:flex-row">{children}</div>;
};

export const Default: Story = () => {
  const colorTile = (name: string, color: string, className: string) => {
    return (
      <div className="my-3 flex flex-col gap-2">
        <div className={`h-32 w-full border border-black sm:w-52  ${className}`}></div>
        <span className="font-bold">{name}</span>
        <span className="uppercase">{color}</span>
      </div>
    );
  };

  return (
    <div className="m-5 flex flex-col gap-4">
      <div className="flex flex-col">
        <span className="text-lg font-bold">Primary Palette</span>
        <p>This colour is for web only and is not part of the brand guidelines.</p>
        <TileGroup>{colorTile('Challenger Green', '#b5bd00', 'bg-challenger-green')}</TileGroup>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-lg font-bold">Secondary Palette</span>
        <p>This secondary colour is typically used for backgrounds and in some cases typography.</p>
        <TileGroup>
          {colorTile('Deep blue', '#003b5c', 'bg-deep-blue')}
          {colorTile('Blue', '#00629b', 'bg-blue')}
        </TileGroup>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-lg font-bold">Tertiary Palette</span>
        <p>
          This tertiary colour is used for secondary CTA’s, backgrounds and headings. This colour is
          also used for CarePlus.
        </p>
        <TileGroup>
          {colorTile('Bright', '#00205b', 'bg-bright-navy')}
          {colorTile('Deep Green', '#006341', 'bg-deep-green')}
          {colorTile('Green', '#48a23f', 'bg-green')}
          {colorTile('Deep Teal', '#115e67', 'bg-deep-teal')}
          {colorTile('Light Blue', '#71b2c9', 'bg-light-blue')}
          {colorTile('Bright Teal', '#2adb9b', 'bg-bright-teal')}
          {colorTile('Teal', '#6eceb2', 'bg-teal')}
          {colorTile('White', '#ffffff', 'bg-white')}
          {colorTile('Black', '#000000', 'bg-black')}
          {colorTile('Grey', '#d2d2d2', 'bg-grey')}
          {colorTile('Light Grey', '#f5f6f7', 'bg-grey-light')}
          {colorTile('Error Light Red', '#ee3536', 'bg-error-red-light')}
          {colorTile('Error Dark Red', '#ce0c0e', 'bg-error-red-dark')}
        </TileGroup>
      </div>
    </div>
  );
};
