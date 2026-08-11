import { ComponentParams, ComponentRendering, Placeholder } from '@sitecore-content-sdk/nextjs';
import { Text } from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import IconButton from 'components/IconButton/IconButton';
import { ContentIcon } from 'components/Icons';
import { IconColor, IconSize } from 'components/Icons/icon.types';
import { DESKTOP_MEDIA_QUERY } from 'components/constants';
import { useAnalytics, useSitecore } from 'lib/challenger/hooks';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

export interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
}

const TableOfContents = (props: ComponentProps) => {
  const containerStyles = props?.rendering?.params?.Styles || '';
  const heading = props.rendering.params['Heading'] || '';
  const [toggleContent, setToggleContent] = useState<boolean>(false);
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const { isEditMode } = useSitecore();
  const { linkComponent } = useAnalytics(props.rendering);

  useEffect(() => {
    if (isDesktop) {
      setToggleContent(true);
    }
  }, [isDesktop]);

  const handleClick = () => {
    setToggleContent((prevContent) => !prevContent);
  };

  return (
    <div link_component={linkComponent} className="relative w-full xl:w-fit">
      <div
        className={classNames('relative', 'z-40 h-fit w-full bg-white md:w-60', containerStyles)}
      >
        <div className="relative flex w-full flex-col items-start gap-7 p-6 shadow-md md:shadow-none">
          <div className="flex w-full items-center justify-between gap-3">
            <div className="flex items-end gap-3">
              <ContentIcon color={IconColor.Navy} size={IconSize.Sm} />
              <h3 className={classNames('font-roboto-700 text-sm text-bright-navy')}>
                <Text field={{ value: heading }} />
              </h3>
            </div>
            <div className="flex items-center md:hidden [&_button]:w-fit">
              <IconButton
                type={toggleContent ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                iconSize={IconSize.Md}
                iconColor={IconColor.Navy}
                onClick={handleClick}
              />
            </div>
          </div>
          {!isEditMode && toggleContent && (
            <div className="flex flex-col gap-5 text-left font-roboto-700 text-sm">
              <Placeholder name="table-of-contents" rendering={props.rendering} />
            </div>
          )}
          {isEditMode && (
            <div className="flex flex-col gap-5 text-left font-roboto-700 text-sm">
              <Placeholder name="table-of-contents" rendering={props.rendering} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;
