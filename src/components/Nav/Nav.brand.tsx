import React from 'react';
import {
  Image,
  Link,
  ImageField,
  Field,
  LinkField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';

type Fields = {
  Image: ImageField;
  ImageCaption: Field<string>;
  TargetUrl: LinkField;
};

export interface NavBrandProps {
  params: { [key: string]: string };
  fields: Fields;
}

const ImageDefault = (props: NavBrandProps): React.JSX.Element => (
  <div className={`component image ${props.params.styles}`.trimEnd()}>
    <div className="component-content">
      <span className="is-empty-hint">Image</span>
    </div>
  </div>
);

const NavBrand = (props: NavBrandProps): React.JSX.Element => {
  const { page: sitecoreContext } = useSitecore();

  if (props.fields) {
    const { Image: image, TargetUrl: targetUrl } = props.fields;
    const renderImage = () => {
      return (
        <Image
          field={image}
          editable={false}
          priority="true"
          className="h-14 w-36 lg:h-16 lg:w-52"
        />
      );
    };

    if ((sitecoreContext && sitecoreContext.mode?.isEditing) || !targetUrl?.value?.href) {
      return renderImage();
    }

    return <Link field={targetUrl}>{renderImage()}</Link>;
  }

  return <ImageDefault {...props} />;
};

export default NavBrand;
