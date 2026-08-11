import {
  ComponentParams,
  ComponentRendering,
  Link,
  LinkField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';

export interface Fields {
  items: LinkItem[];
}

export interface LinkItem {
  fields: {
    Link: LinkField;
  };
}

export interface FooterBottomLinksProps {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: Fields };
}

const SiteFooterBottomLinks = (props: FooterBottomLinksProps): React.JSX.Element => {
  const { page: sitecoreContext } = useSitecore();

  if (
    (props.rendering.fields?.items && props.rendering.fields?.items?.length > 0) ||
    (sitecoreContext && sitecoreContext.mode?.isEditing)
  ) {
    return (
      <ul className="flex flex-wrap items-end gap-8 gap-y-5 font-roboto-700">
        {props.rendering.fields?.items.map((item) => {
          if (
            !item.fields?.Link?.value?.text ||
            item.fields?.Link?.value?.text?.length === 0 ||
            !item.fields?.Link?.value?.href ||
            item.fields?.Link?.value?.href?.length === 0
          ) {
            return null;
          }

          return (
            <li key={item.fields?.Link?.value?.text} className="flex items-end">
              <Link
                field={item.fields?.Link}
                className="hover:text-bright-teal"
                link_name={item.fields.Link.value.text}
                editable={false}
              />
            </li>
          );
        })}
      </ul>
    );
  }

  return <></>;
};

export default SiteFooterBottomLinks;
