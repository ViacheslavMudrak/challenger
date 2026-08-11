import { RichText } from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import IconButton from 'components/IconButton/IconButton';
import React, { useEffect, useRef, useState } from 'react';
import { IconColor, IconSize } from 'components/Icons/icon.types';
import { AlertBannerDecorativeColors, AlertBannerRendering } from './AlertBanner.types';
import dayjs from 'dayjs';
import { useSitecore } from 'lib/challenger/useSitecore';
import { useMediaQuery } from 'usehooks-ts';
import { MOBILE_MEDIA_QUERY } from 'components/constants';

export default function AlertBanner(props: AlertBannerRendering) {
  const { AlertFrom, AlertTo, AlertMessage, ShowAlert, DecorativeLineColor } = props?.fields;

  const { isEditMode } = useSitecore();
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY);
  const DEFAULT_DATE_VALUE = '0001-01-01T00:00:00Z';
  const MAXIMUM_TIME_DIFFERENCE = 60000;
  const alertComnponentRef = useRef<HTMLDivElement>(null);

  const currentTime = new Date(
    new Date().toLocaleString('en-US', {
      timeZone: 'Australia/Sydney',
    })
  );
  const decorativeColorSelected =
    DecorativeLineColor?.value != '' ? DecorativeLineColor.value.toLowerCase() : 'none';
  const decorativeIconColor =
    AlertBannerDecorativeColors[
      decorativeColorSelected as keyof typeof AlertBannerDecorativeColors
    ];

  const [isAlertOpen, setIsAlertOpen] = useState(ShowAlert?.value ? '1' : '0');
  const [isAlertOpenBasedOnStartTime, setIsAlertOpenBasedOnStartTime] = useState(false);
  const [isAlertOpenBasedOnEndTime, setIsAlertOpenBasedOnEndTime] = useState(false);
  const isShowAlert =
    isAlertOpen == '1' &&
    ((isAlertOpenBasedOnStartTime && isAlertOpenBasedOnEndTime) || isEditMode);

  const checkForStartTime = () => {
    if (AlertFrom.value != DEFAULT_DATE_VALUE) {
      let alertFrom = AlertFrom.value.toString();
      if (alertFrom.endsWith('Z')) {
        alertFrom = alertFrom.substring(0, alertFrom.length - 1);
      }
      const fromDate = dayjs(alertFrom);
      const timeDifferenceInMilliSeconds = fromDate.valueOf() - currentTime.valueOf();
      setIsAlertOpenBasedOnStartTime(timeDifferenceInMilliSeconds < 0);
      if (timeDifferenceInMilliSeconds < MAXIMUM_TIME_DIFFERENCE) {
        setTimeout(() => {
          setIsAlertOpenBasedOnStartTime(true);
        }, timeDifferenceInMilliSeconds);
      }
    } else setIsAlertOpenBasedOnStartTime(true);
  };

  const checkForEndTime = () => {
    if (AlertTo.value != DEFAULT_DATE_VALUE) {
      let alertTo = AlertTo.value.toString();
      if (alertTo.endsWith('Z')) {
        alertTo = alertTo.substring(0, alertTo.length - 1);
      }
      const toDate = dayjs(alertTo);
      setIsAlertOpenBasedOnEndTime(toDate.valueOf() - currentTime.valueOf() > 0);
    } else setIsAlertOpenBasedOnEndTime(true);
  };

  useEffect(() => {
    if (isEditMode) return;
    const isOpen = sessionStorage.getItem('isAlertOpen');
    if (isOpen) setIsAlertOpen(isOpen);
    checkForStartTime();
    checkForEndTime();
  }, []);

  useEffect(() => {
    if (isMobile) {
      const placeholderEl = document.getElementById('heightPlaceholder');
      if (placeholderEl && alertComnponentRef.current) {
        placeholderEl.style.height = alertComnponentRef.current.offsetHeight + 75 + 'px';
      }
    }
  }, [isMobile, isShowAlert]);

  const handleCloseClick = () => {
    sessionStorage?.setItem('isAlertOpen', '0');
    setIsAlertOpen('0');
    const placeholderEl = document.getElementById('heightPlaceholder');
    if (placeholderEl) placeholderEl.style.height = '';
  };

  return isShowAlert ? (
    <div
      className="flex justify-center  border-t-[0.625rem] bg-grey-light xl:border-t-[0.5rem]"
      style={{ borderTopColor: decorativeIconColor }}
      ref={alertComnponentRef}
    >
      <div
        className={classNames(
          'flex w-full items-start gap-4 py-5 pl-6 pr-8 xl:max-w-[1920px] xl:items-center xl:px-24 xl:py-4'
        )}
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            className={classNames('h-[30px] xl:h-10 xl:w-10')}
          >
            <title>Information icon</title>
            <path
              d="M25,2C12.297,2,2,12.297,2,25s10.297,23,23,23s23-10.297,23-23S37.703,2,25,2z M25,11c1.657,0,3,1.343,3,3s-1.343,3-3,3 s-3-1.343-3-3S23.343,11,25,11z M29,38h-2h-4h-2v-2h2V23h-2v-2h2h4v2v13h2V38z"
              fill={decorativeIconColor}
            />
          </svg>
        </div>
        <div className={classNames('richtext flex basis-full items-center ')}>
          <RichText
            className={classNames(
              'alert-banner-richtext text-left text-base text-black  [&_a:hover]:underline [&_a]:text-blue'
            )}
            field={AlertMessage?.fields?.Text}
          />
        </div>
        <div className="flex h-8 items-start xl:h-10">
          <IconButton
            type="CloseIcon"
            iconColor={IconColor.Navy}
            iconSize={IconSize.Lg}
            onClick={handleCloseClick}
            className="self-start"
          />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
