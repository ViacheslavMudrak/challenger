import React, { MouseEvent, useState } from 'react';
import {
  Image as JssImage,
  ImageField,
  Field,
  LinkField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { useSitecore as useCustomSitecore } from 'lib/challenger/useSitecore';
import { useMediaQuery } from 'usehooks-ts';
import { DESKTOP_MEDIA_QUERY } from './constants';

interface Fields {
  Image: ImageField;
  ImageCaption: Field<string>;
  TargetUrl: LinkField;
  'Enable Zoom'?: Field<boolean>;
}

type ImageProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ImageDefault = (props: ImageProps): React.JSX.Element => (
  <div className={`component image ${props.params.styles}`.trimEnd()}>
    <div className="component-content">
      <span className="is-empty-hint">Image</span>
    </div>
  </div>
);

export const Banner = (props: ImageProps): React.JSX.Element => {
  const { page } = useSitecore();
  const backgroundStyle = { backgroundImage: `url('${props?.fields?.Image?.value?.src}')` };
  const id = props.params.RenderingIdentifier;

  return (
    <div className={`component hero-banner ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content sc-sxa-image-hero-banner" style={backgroundStyle}>
        {page.mode?.isEditing ? <JssImage field={props.fields.Image} /> : ''}
      </div>
    </div>
  );
};

export const Default = (props: ImageProps): React.JSX.Element => {
  const { isEditMode } = useCustomSitecore();
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);

  if (props.fields) {
    const Image = () => <JssImage field={props.fields.Image} />;
    const id = props.params.RenderingIdentifier;
    const isZoomFunctionalityEnabled = !!props.fields['Enable Zoom']?.value && isDesktop;

    const handleMouseEnter = () => {
      setZoom(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!e?.target) return;
      const el = e.target as HTMLElement;
      const { left, top, width, height } = el?.getBoundingClientRect();
      const x = ((e.pageX - left - window.scrollX) / width) * 100;
      const y = ((e.pageY - top - window.scrollY) / height) * 100;
      setPosition({ x, y });
    };

    const handleMouseLeave = () => {
      setZoom(false);
      setPosition({ x: 0, y: 0 });
    };

    return (
      <div className={`component image ${props.params.styles}`} id={id ? id : undefined}>
        {isEditMode || !isZoomFunctionalityEnabled ? (
          <div className="component-content">
            <Image />
          </div>
        ) : (
          <div
            className="component-content image-zoom-container"
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <JssImage
              field={props.fields.Image}
              className={zoom ? 'zoomed' : ''}
              style={{ transformOrigin: `${position.x}% ${position.y}%` }}
            />
          </div>
        )}
      </div>
    );
  }

  return <ImageDefault {...props} />;
};
