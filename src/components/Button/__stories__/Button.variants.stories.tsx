import type { Meta, StoryFn } from '@storybook/react';
import Button from '../Button';
import { ButtonComponentProps } from '../Button.types';
import solidPrimaryWithArrowData from '../mocks/solid/button.solid.primary.withArrow.json';
import solidPrimaryData from '../mocks/solid/button.primary.json';
import solidSecondaryData from '../mocks/solid/button.solid.secondary.json';
import solidSecondaryWithArrowData from '../mocks/solid/button.solid.secondary.withArrow.json';
import outlinePrimaryWithArrowData from '../mocks/outline/button.outline.primary.withArrow.json';
import outlinePrimaryData from '../mocks/outline/button.outline.primary.json';
import outlineSecondaryData from '../mocks/outline/button.outline.secondary.json';
import outlineSecondaryWithArrowData from '../mocks/outline/button.outline.secondary.withArrow.json';
import linkPrimaryWithArrowData from '../mocks/link/button.link.primary.withArrow.json';
import linkPrimaryData from '../mocks/link/button.link.primary.json';
import linkSecondaryData from '../mocks/link/button.link.secondary.json';
import linkSecondaryWithArrowData from '../mocks/link/button.link.secondary.withArrow.json';
import linkTertiaryData from '../mocks/link/button.link.tertiary.json';
import linkTertiaryWithArrowData from '../mocks/link/button.link.tertiary.withArrow.json';

const meta = {
  title: 'Components/Button/Variants',
  parameters: {
    layout: 'none',
  },
} satisfies Meta;

export default meta;

export const Solid: StoryFn = () => {
  const solidPrimary = solidPrimaryData as unknown as ButtonComponentProps;
  const solidPrimaryWithArrow = solidPrimaryWithArrowData as unknown as ButtonComponentProps;
  const solidSecondary = solidSecondaryData as unknown as ButtonComponentProps;
  const solidSecondaryWithArrow = solidSecondaryWithArrowData as unknown as ButtonComponentProps;
  return (
    <div className="flex w-full flex-col gap-3 p-10 ">
      <div className="flex flex-col gap-3 border bg-white p-6">
        <span>Solid | Primary</span>
        <div className="flex flex-col gap-3 md:flex-row">
          <Button rendering={solidPrimary.rendering} />
          <Button rendering={solidPrimaryWithArrow.rendering} />
        </div>
      </div>
      <div className="flex flex-col gap-3 border bg-white p-6">
        <span>Solid | Secondary</span>
        <div className="flex flex-col gap-3 md:flex-row">
          <Button rendering={solidSecondary.rendering} />
          <Button rendering={solidSecondaryWithArrow.rendering} />
        </div>
      </div>
    </div>
  );
};

export const Outline: StoryFn = () => {
  const outlinePrimary = outlinePrimaryData as unknown as ButtonComponentProps;
  const outlinePrimaryWithArrow = outlinePrimaryWithArrowData as unknown as ButtonComponentProps;
  const outlineSecondary = outlineSecondaryData as unknown as ButtonComponentProps;
  const outlineSecondaryWithArrow =
    outlineSecondaryWithArrowData as unknown as ButtonComponentProps;
  return (
    <div className="flex w-full flex-col gap-3 p-10">
      <div className="flex flex-col gap-3 border bg-white p-6">
        <span>Outline | Primary</span>
        <div className="flex flex-col gap-3 md:flex-row">
          <Button rendering={outlinePrimary.rendering} />
          <Button rendering={outlinePrimaryWithArrow.rendering} />
        </div>
      </div>
      <div className="flex flex-col gap-3 border bg-bright-navy p-6">
        <span className="text-white">Outline | Secondary</span>
        <div className="flex flex-col gap-3 md:flex-row">
          <Button rendering={outlineSecondary.rendering} />
          <Button rendering={outlineSecondaryWithArrow.rendering} />
        </div>
      </div>
    </div>
  );
};

export const Link: StoryFn = () => {
  const linkPrimary = linkPrimaryData as unknown as ButtonComponentProps;
  const linkPrimaryWithArrow = linkPrimaryWithArrowData as unknown as ButtonComponentProps;
  const linkSecondary = linkSecondaryData as unknown as ButtonComponentProps;
  const linkSecondaryWithArrow = linkSecondaryWithArrowData as unknown as ButtonComponentProps;
  const linkTertiary = linkTertiaryData as unknown as ButtonComponentProps;
  const linkTertiaryWithArrow = linkTertiaryWithArrowData as unknown as ButtonComponentProps;

  return (
    <div className="flex w-full flex-col gap-3 p-10">
      <div className="flex flex-col gap-3 border bg-white p-6">
        <span>Link | Primary</span>
        <div className="flex flex-col gap-3 md:flex-row">
          <Button rendering={linkPrimary.rendering} />
          <Button rendering={linkPrimaryWithArrow.rendering} />
        </div>
      </div>

      <div className="flex flex-col gap-3 border bg-deep-blue p-6">
        <span className="text-white">Link | Secondary</span>
        <div className="flex flex-col gap-3 md:flex-row">
          <Button rendering={linkSecondary.rendering} />
          <Button rendering={linkSecondaryWithArrow.rendering} />
        </div>
      </div>

      <div className="flex flex-col gap-3 border bg-white p-6">
        <span>Link | Tertiary</span>
        <div className="flex flex-col gap-3 md:flex-row">
          <Button rendering={linkTertiary.rendering} />
          <Button rendering={linkTertiaryWithArrow.rendering} />
        </div>
      </div>
    </div>
  );
};
