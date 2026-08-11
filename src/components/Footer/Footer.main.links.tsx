import { Link, useSitecore, Text } from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import { FooterMainLinksProps, LinkItem } from './Footer.main.links.types';

const SiteFooterBottomMainLinks = (props: FooterMainLinksProps): React.JSX.Element => {
  const { page: sitecoreContext } = useSitecore();
  const relevantChildrenItems: LinkItem[] = [];

  // Some items in sitecore could have been setup with no text. those would be irrelevant
  if (
    props.rendering.fields?.data?.items &&
    props.rendering.fields?.data?.items?.children?.results?.length > 0
  ) {
    props.rendering.fields?.data?.items?.children?.results.map((item) => {
      if (item.field?.Link?.value?.text && item.field?.Link?.value?.text?.length > 0) {
        relevantChildrenItems.push(item);
      }
    });
  }

  if (relevantChildrenItems.length > 0 || (sitecoreContext && sitecoreContext.mode?.isEditing)) {
    return (
      <>
        <Link
          field={props.rendering.fields?.data?.Link?.field?.Link}
          link_name={props.rendering.fields?.data?.Link?.field?.Link.value.href}
          className="hover:text-bright-teal"
          editable={false}
        >
          <Text
            tag="span"
            className="text-lg"
            field={props.rendering.fields?.data?.Title?.field?.Title}
          />
        </Link>

        <ul
          className={classNames('w-fit font-roboto-700 [&_a]:text-sm [&_li]:mb-1', {
            'columns-2 gap-x-9': relevantChildrenItems?.length >= 4,
          })}
        >
          {relevantChildrenItems?.map((item) => {
            if (
              !item.field?.Link?.value?.text ||
              item.field?.Link?.value?.text?.length === 0 ||
              !item.field?.Link?.value?.href ||
              item.field?.Link?.value?.href?.length === 0
            ) {
              return null;
            }

            return (
              <li key={item.field?.Link?.value.text}>
                <Link
                  field={item.field?.Link}
                  link_name={item.field?.Link.value.text}
                  className="hover:text-bright-teal"
                />
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  return <></>;
};

export default SiteFooterBottomMainLinks;
