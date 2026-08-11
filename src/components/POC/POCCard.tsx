import React from 'react';
import { Text, RichText, Link, Image } from '@sitecore-content-sdk/nextjs';
import { POCCardProps, Tag } from './POCCard.types';

const POCCard = (props: POCCardProps): React.JSX.Element => {
  const list = props.rendering.fields?.CardTags?.filter(
    (element: Tag) => element?.fields?.TagTitle
  ).map((element: Tag, key: number) => (
    <span
      key={key}
      className="dark:bg-blue-900 dark:text-blue-300 me-2 rounded bg-bright-teal px-2.5 py-0.5 text-sm font-medium text-bright-navy"
    >
      <b>{element.fields.TagTitle.value}</b>
    </span>
  ));

  const POCTag = props.rendering.fields.CardTitleStyle?.fields?.HeaderType?.value || 'h2';

  return (
    <div className="component text-center">
      <div className="border-gray-200 dark:bg-gray-800 dark:border-gray-700 max-w-sm rounded-lg border bg-white shadow">
        <Link field={props.rendering.fields.CardLink}>
          <Image field={props.rendering.fields.CardImage} className="rounded-t-lg" />
        </Link>
        <div>{list}</div>
        <div className="p-5">
          <Text
            tag={POCTag}
            className="card new components"
            field={props.rendering.fields.CardTitle}
          />
          <RichText field={props.rendering.fields.CardContent} />
        </div>
        <div className="p-5">
          <Link
            field={props.rendering.fields.CardLink}
            className=" inline-flex items-center bg-bright-navy px-3 py-2 text-center text-sm font-medium text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default POCCard;
