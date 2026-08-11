/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ComponentParams,
  Field,
  LinkField,
  useSitecore,
  Link as JssLink,
} from '@sitecore-content-sdk/nextjs';
const getPublicUrl = () => process.env.PUBLIC_URL || '';
import { ChevronRightIcon } from 'components/Icons';
import { IconColor, IconSize } from 'components/Icons/icon.types';

interface Ancestor {
  field: {
    value: string;
  };
  url: {
    path: string;
  };
  show?: {
    boolValue: boolean;
  };
}

export interface BreadcrumbFields {
  data: {
    item: {
      field: Field<string>;
      url: {
        path: string;
      };
      show?: {
        boolValue: boolean;
      };
      ancestors: Ancestor[];
    };
  };
}

export interface BreadcrumbProps {
  params: ComponentParams;
  fields: BreadcrumbFields;
}

interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: { '@type': string; position: number; name: string; item: string }[];
}

const Breadcrumb = (props: BreadcrumbProps) => {
  const data = props.fields?.data;
  const { page: sitecoreContext } = useSitecore();
  const breadcrumbCurrentLink: LinkField = {
    value: {
      href: data.item.url.path,
      text: data.item.field.value,
      target: '_self',
    },
  };

  const itemList = Array.from(data.item.ancestors)
    .reverse()
    .map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.field.value,
      item: getPublicUrl() + item.url.path,
    }));

  const currentItem = {
    '@type': 'ListItem',
    position: itemList.length + 1,
    name: data.item.field.value,
    item: getPublicUrl() + data.item.url.path,
  };

  const schema: BreadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [...itemList, currentItem],
  };

  const renderBreadcrumbList = (ancestors: Ancestor[]): React.JSX.Element => {
    const reverseAncestor = ancestors
      .reduceRight((acc, b) => [...acc, b], [])
      .filter((c) => c.show?.boolValue === undefined || c.show?.boolValue == true);
    // const reverseAncestor = ancestors
    //    .filter((c) => c.show?.boolValue === undefined || c.show?.boolValue == true);
    const ancestorListItems = reverseAncestor.map((ancestor: Ancestor, index: number) => {
      const breadcrumbLink: LinkField = {
        value: {
          href: ancestor.url.path,
          text: ancestor.field.value,
          target: '_self',
        },
      };

      return (
        <li key={index} className="flex items-center gap-2">
          <JssLink field={breadcrumbLink} className="text-sm text-deep-blue hover:text-deep-blue" />
          <ChevronRightIcon color={IconColor.Blue} size={IconSize.Sm} />
        </li>
      );
    });

    return (
      <ul className="breadcrumb flex flex-wrap gap-2">
        {ancestorListItems}
        {(data.item.show?.boolValue === undefined || data.item.show?.boolValue == true) && (
          <li>
            <JssLink
              field={breadcrumbCurrentLink}
              className="relative pr-2 text-sm text-deep-blue hover:text-deep-blue"
            />
          </li>
        )}
      </ul>
    );
  };

  if (data) {
    return (
      <>
        <script
          id="breadcrumb_schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        ></script>
        <div className="pl-5 md:pl-0">{renderBreadcrumbList(data.item.ancestors)}</div>
      </>
    );
  }

  return (
    <>
      <script
        id="breadcrumb_schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      ></script>

      <div>
        <div>
          <div>No Item </div>
          <div>id: {(sitecoreContext as any).itemId}</div>
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
