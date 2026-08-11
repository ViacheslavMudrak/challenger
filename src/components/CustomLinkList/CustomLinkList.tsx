import {
  ComponentParams,
  ComponentRendering,
  LinkField,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import { useAnalytics, useSitecore } from 'lib/challenger/hooks';
import { DownloadIcon, ExternalLinkIcon } from 'components/Icons';
import { IconColor, IconSize } from 'components/Icons/icon.types';
import { CustomLinkItemProps } from './CustomLink.item';
import { isValidLink } from 'components/Card/Card.helpers';

export interface CustomLinkListProps {
  rendering: ComponentRendering & { params: ComponentParams };
}

const CustomLinkList = (props: CustomLinkListProps) => {
  const { isEditMode } = useSitecore();
  const containerStyles = props?.rendering?.params?.Styles || '';
  const phKey = `link-list-container`;
  const items = props.rendering;
  const { linkComponent } = useAnalytics(props.rendering);

  if (isEditMode) {
    return (
      <div className={classNames('relative flex w-full flex-col gap-3 p-5', containerStyles)}>
        <Placeholder key={phKey} name={phKey} rendering={props.rendering} />
      </div>
    );
  }

  if (!items || !items.placeholders) {
    return null;
  }

  const linkItems = items.placeholders[phKey].filter((i: ComponentRendering) =>
    (i.componentName || '').toLowerCase().includes('customlink.item')
  );

  const renderLinkIcon = (link?: LinkField) => {
    if (!link) {
      return <></>;
    }

    if (
      link.value.href?.endsWith('.pdf') ||
      link.value.href?.endsWith('.doc') ||
      link.value.href?.endsWith('.txt')
    ) {
      return (
        <DownloadIcon
          color={IconColor.Navy}
          size={IconSize.Md}
          className={classNames('group-hover:fill-blue')}
        />
      );
    }

    if (link.value.target === '_blank') {
      return (
        <ExternalLinkIcon
          color={IconColor.Blue}
          size={IconSize.Md}
          className={classNames('group-hover:fill-deep-blue')}
        />
      );
    }

    return <></>;
  };

  const renderLinkItems = () => {
    if (linkItems && linkItems.length > 0) {
      const items = linkItems.map((item, idx) => {
        const mappedItem = {
          rendering: item,
        } as CustomLinkItemProps;

        const customLinkId = mappedItem.rendering.uid;
        const { Link } = mappedItem.rendering.fields;
        const hasValidLink = isValidLink(Link);

        return (
          hasValidLink &&
          Link && (
            <div
              key={customLinkId}
              className="flex w-full flex-col"
              {...(mappedItem.rendering?.params?.RenderingIdentifier && {
                id: mappedItem.rendering.params.RenderingIdentifier,
              })}
            >
              <a
                href={Link.value.href}
                target={Link.value.target}
                link_event={Link.value.href}
                link_name={mappedItem.rendering.fields.Link?.value.text}
                className="w-full"
              >
                <div
                  key={customLinkId}
                  className={classNames(
                    'flex w-full cursor-pointer items-center gap-5 py-4',
                    'justify-between text-left text-lg text-deep-blue',
                    'border-b-[1px] border-grey',
                    { 'border-t-[1px] border-grey': idx === 0 }
                  )}
                >
                  <div>{mappedItem.rendering.fields.Link?.value.text}</div>
                  <div>{renderLinkIcon(mappedItem.rendering.fields.Link)}</div>
                </div>
              </a>
            </div>
          )
        );
      });

      return <div className={classNames('flex w-full flex-col')}>{items}</div>;
    }

    return null;
  };

  return (
    <div
      link_component={linkComponent}
      {...(props.rendering?.params?.RenderingIdentifier && {
        id: props.rendering.params.RenderingIdentifier,
      })}
      className={classNames(
        'relative',
        'flex w-full flex-col items-start gap-5 p-5',
        containerStyles
      )}
    >
      {renderLinkItems()}
    </div>
  );
};

export default CustomLinkList;
