import React from 'react';
import { NextImage, Placeholder } from '@sitecore-content-sdk/nextjs';
import { useSitecore } from 'lib/challenger/useSitecore';
import { FullWidthImageBannerProps } from './FullWidthImageBanner.types';
import {
  buttonAlignmentMapper,
  contentColorMapper,
  overlayColorMapper,
  verticalAlignmentMapper,
} from './FullWidthImageBannerUtil';

export function FullWidthImageBanner(props: FullWidthImageBannerProps) {
  const { isEditMode } = useSitecore();
  const backgroundImage = {
    url: props.rendering.fields.Image.value?.src,
    alt: props.rendering.fields.Image.value?.alt,
    focalPoint: {
      x: props.rendering.fields.FocalX,
      y: props.rendering.fields.FocalY,
    },
  };
  const content = {
    heading: props.rendering.fields.Heading.value,
    headingAlignment: props.rendering.fields.HeadingAlignment.fields.Alignment.value,
    headingColor: contentColorMapper(props.rendering.fields.HeadingColor?.fields?.Color.value),
    subheading: props.rendering.fields.Subheading.value,
    subheadingAlignment: props.rendering.fields.SubheadingAlignment.fields.Alignment.value,
    subheadingColor: contentColorMapper(
      props.rendering.fields.SubheadingColor?.fields?.Color.value
    ),
    disclaimer: props.rendering.fields.Disclaimer.value,
    disclaimerAlignment: props.rendering.fields.DisclaimerAlignment.fields.Alignment.value,
    disclaimerColor: contentColorMapper(
      props.rendering.fields.DisclaimerColor?.fields?.Color.value
    ),
    buttonAlignment: buttonAlignmentMapper(
      props.rendering.fields.ButtonAlignment.fields.Alignment.value
    ),
  };
  const overlay = {
    color: overlayColorMapper(props.rendering.fields.OverlayColor.fields.Color.value),
    opacity: props.rendering.fields.OverlayOpacity.value
      ? props.rendering.fields.OverlayOpacity.value
      : 0.35,
  };
  const layout = {
    height: props.rendering.fields.Height.fields.Size.value,
    contentAlignment: verticalAlignmentMapper(
      props.rendering.fields.VerticalAlignment.fields.Alignment.value
    ),
  };
  const useSeo = props.rendering.fields.UseSEO ? 'h1' : 'h2';
  const phKey = `banner-button`;

  function renderForPagesEditor() {
    return (
      <div>
        <NextImage
          field={props?.rendering.fields.Image}
          height={layout.height === 'Small' ? 480 : 600}
          width={400}
        />
        <Placeholder key={phKey} name={phKey} rendering={props.rendering} />
      </div>
    );
  }

  if (isEditMode) {
    return <>{renderForPagesEditor()}</>;
  }

  return (
    <div
      className={`relative z-[90] aspect-video w-full overflow-hidden md:min-h-[350px] ${layout.height === 'Small' ? 'md:h-[480px]' : 'md:h-[600px]'}`}
    >
      {/* Background Image */}
      <img
        className="absolute inset-0 h-full w-full bg-no-repeat object-cover"
        src={backgroundImage.url}
        style={{
          backgroundPosition: `${backgroundImage.focalPoint.x}% ${backgroundImage.focalPoint.y}%`,
        }}
        role="img"
        alt={`${backgroundImage.alt}`}
      />

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          backgroundColor: overlay.color,
          opacity: overlay.opacity,
        }}
      />

      {/* Content Container */}
      <div
        className={`relative z-10 flex h-full w-full flex-col items-center justify-${layout.contentAlignment}`}
      >
        {/* Main Content */}
        <div className=" min-w-[80vw] space-y-4 px-6 md:space-y-6">
          {/* Heading */}
          {content.heading && useSeo ? (
            <h1
              className={`max-w-full font-roboto-700 text-[2.5rem] leading-[3rem]  ${content.headingColor} text-${content.headingAlignment}`}
            >
              {content.heading}
            </h1>
          ) : (
            <h2
              className={`max-w-full font-roboto-700 text-[2.5rem] leading-[3rem] ${content.headingColor} text-${content.headingAlignment}`}
            >
              {content.heading}
            </h2>
          )}

          {/* Subheading */}
          {content.subheading && (
            <p
              className={`max-w-full font-roboto-700 ${content.subheadingColor} text-${content.subheadingAlignment}`}
            >
              {content.subheading}
            </p>
          )}

          {/* CTA button */}
          <div className={`flex flex-row justify-${content.buttonAlignment} [&_a]:w-fit`}>
            <Placeholder key={phKey} name={phKey} rendering={props?.rendering} />
          </div>

          {/* Disclaimer */}
          {content.disclaimer && (
            <div className={`pt-4 text-${content.disclaimerAlignment}`}>
              <p className={`max-w-full text-sm ${content.disclaimerColor}`}>
                {content.disclaimer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FullWidthImageBanner;
