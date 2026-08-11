import React from 'react';
import { ComponentParams, ComponentRendering, Placeholder } from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import { DESKTOP_MAX_WIDTH } from 'components/constants';
import { useAnalytics, useSitecore } from 'lib/challenger/hooks';

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
}

const SectionContainer = (props: ComponentProps): React.JSX.Element => {
  const containerStyles = props?.rendering?.params?.Styles || '';
  const uniqueId = props?.rendering?.params?.RenderingIdentifier || props.rendering.uid || '';
  const { linkComponent } = useAnalytics(props.rendering);
  const { isEditMode } = useSitecore();

  return (
    <div
      id={uniqueId}
      link_component={linkComponent}
      className={classNames(
        'section-container',
        'w-full flex-col gap-10 p-5 xl:px-24',
        'items-center',
        containerStyles,
        DESKTOP_MAX_WIDTH
      )}
    >
      <div
        className={`section-container-header flex w-full flex-col gap-7 lg:max-w-[800px] ${isEditMode ? '' : '[&:empty]:hidden'}`}
      >
        <Placeholder name="section-container-header" rendering={props.rendering} />
      </div>
      <div className={classNames('section-container-body flex w-full flex-col gap-7')}>
        <Placeholder name="section-container-body" rendering={props.rendering} />
      </div>
      <div
        className={`section-container-footer flex w-full flex-col gap-7 lg:max-w-[800px] ${isEditMode ? '' : '[&:empty]:hidden'}`}
      >
        <Placeholder name="section-container-footer" rendering={props.rendering} />
      </div>
    </div>
  );
};

export const Default = (props: ComponentProps): React.JSX.Element => {
  return <SectionContainer {...props} />;
};
