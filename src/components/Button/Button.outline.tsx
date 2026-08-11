import React, { useState } from 'react';
import { ButtonElement, ButtonProps, ColorType } from './Button.types';
import { IconColor, IconSize } from 'components/Icons/icon.types';
import { ArrowRightIcon } from 'components/Icons';
import classNames from 'classnames';
import Link from 'next/link';
import { Link as JssLink, useSitecore } from '@sitecore-content-sdk/nextjs';
import VideoModal from 'components/VideoModal/VideoModal';

const ButtonOutline = React.forwardRef<ButtonElement, ButtonProps>((props, forwardedRef) => {
  const {
    id, // not field
    Color,
    HasArrow,
    ariaLabel, // do we need editable in SC?
    isDisabled = false, // do we need editable in SC?
    as = 'link',
    LinkValue,
    className,
  } = props;
  const useModal = props.UseModal?.value;
  const [showModal, setShowModal] = useState(false);
  const { page: sitecoreContext } = useSitecore();

  const isExternalLink = LinkValue?.value?.target === '_blank';
  const linkUrl = LinkValue?.value?.href as string;
  const color = (Color?.fields?.Type?.value as ColorType) || ColorType.Primary;

  const renderIcon = () => {
    let iconColor = IconColor.Navy;

    if (color === ColorType.Secondary) {
      iconColor = IconColor.White;
    }

    if (HasArrow?.value) {
      return <ArrowRightIcon size={IconSize.Md} color={iconColor} />;
    }

    return null;
  };

  const outlinePrimaryClassNames = [
    'bg-transparent',
    'border',
    'border-bright-navy',
    'text-bright-navy',
  ].join(' ');

  const outlineSecondaryClassNames = [
    'bg-transparent',
    'border',
    'border-white',
    'text-white',
  ].join(' ');

  const renderChildren = () => {
    return (
      <div className="flex items-center justify-center gap-2 whitespace-nowrap">
        {LinkValue.value.text}
        {renderIcon()}
      </div>
    );
  };

  const buttonStyles = classNames(
    'group w-full min-w-[110px] rounded-sm px-6 py-3 text-lg font-roboto-500 lg:w-fit',
    {
      [outlinePrimaryClassNames]: color === ColorType.Primary,
      [outlineSecondaryClassNames]: color === ColorType.Secondary,
    },
    className
  );

  if (sitecoreContext && sitecoreContext.mode?.isEditing) {
    return <JssLink field={LinkValue} className={classNames(buttonStyles.toString())} />;
  }

  if (as === 'link') {
    return (
      <>
        {useModal ? (
          <a
            role="button"
            target={isExternalLink ? '_blank' : ''}
            className={buttonStyles}
            aria-label={ariaLabel}
            link_name={LinkValue?.value?.text}
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            {renderChildren()}
          </a>
        ) : (
          <Link
            role="button"
            href={linkUrl}
            target={isExternalLink ? '_blank' : ''}
            className={buttonStyles}
            aria-label={ariaLabel}
            link_name={LinkValue?.value?.text}
          >
            {renderChildren()}
          </Link>
        )}
        {showModal && (
          <VideoModal url={linkUrl} showModal={showModal} setShowModal={setShowModal} />
        )}
      </>
    );
  }

  return (
    <>
      {useModal ? (
        <button
          type="button"
          id={id}
          ref={forwardedRef}
          aria-label={ariaLabel}
          disabled={isDisabled}
          link_name={LinkValue.value.text}
          onClick={() => {
            setShowModal(!showModal);
          }}
          className={buttonStyles}
        >
          {renderChildren()}
        </button>
      ) : (
        <button
          type="button"
          id={id}
          ref={forwardedRef}
          aria-label={ariaLabel}
          disabled={isDisabled}
          link_name={LinkValue.value.text}
          onClick={props.onClick}
          className={buttonStyles}
        >
          {renderChildren()}
        </button>
      )}
      {showModal && <VideoModal url={linkUrl} showModal={showModal} setShowModal={setShowModal} />}
    </>
  );
});

export default ButtonOutline;

ButtonOutline.displayName = 'ButtonOutline';
