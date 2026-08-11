import { Link, LinkField } from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import { ArrowRightIcon } from 'components/Icons';
import { IconColor, IconSize } from 'components/Icons/icon.types';
import React, { useEffect, useState } from 'react';
import { ArticleType, NavItemChild } from './Nav.types';
import { useRouter } from 'next/router';
import ButtonLink from 'components/Button/Button.link';
import { Variant } from 'components/Button/Button.types';
import { DESKTOP_MAX_WIDTH } from 'components/constants';
import IconButton from 'components/IconButton/IconButton';
import { useSitecore } from 'lib/challenger/useSitecore';
import {
  getFixedTermValue,
  getUpdatedContentReplacedWithRate,
} from 'lib/challenger/fixedTerm.helper';
import { useFixedTermRates } from 'lib/challenger/useFixedTermRates';

interface NavPanelProps {
  show?: boolean;
  title?: string;
  href?: string;
  onClick?: () => void;
  article?: ArticleType;
  menuItems?: NavItemChild[];
  className?: string;
}

const NavPanel = React.forwardRef<HTMLDivElement, NavPanelProps>((props, forwardedRef) => {
  const { onClick, className, article, menuItems, title, show, href } = props;
  const [isReady, setIsReady] = useState<boolean>(false);
  const router = useRouter();
  const { isEditMode } = useSitecore();

  const replacePlaceholder = article?.heading || '';
  let heading = article?.heading.replaceAll(/@[12345]YFixedTermRate/g, '');
  const headingTerms = getFixedTermValue(replacePlaceholder, isEditMode);

  const rates = useFixedTermRates(headingTerms);

  useEffect(() => {
    if (show) {
      setIsReady(true);
    }
  }, [show]);

  const handleItemClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const renderArticle = () => {
    if (!article || !article.heading || !article.content) {
      return null;
    }
    const { content, link } = article;

    if (
      !isEditMode &&
      headingTerms?.length > 0 &&
      (rates.threeYearFixedTermRate ||
        rates.twoYearFixedTermRate ||
        rates.oneYearFixedTermRate ||
        rates.fourYearFixedTermRate ||
        rates.fiveYearFixedTermRate)
    ) {
      heading = getUpdatedContentReplacedWithRate(replacePlaceholder, rates);
    }

    return (
      article && (
        <div className="h-full bg-grey-light p-6">
          <div role="article" className="flex h-fit w-96 flex-col gap-4 ">
            <span className="line-clamp-2 overflow-hidden text-ellipsis font-roboto-700 text-2xl  text-deep-blue">
              {heading}
            </span>
            <p className="line-clamp-4 overflow-hidden text-ellipsis text-grey-darkest">
              {content}
            </p>
            {link && link.text && link.text.length > 0 && (
              <ButtonLink
                linkUrl={link.href}
                isExternalLink={link.target === '_blank'}
                Color={{ fields: { Type: { value: 'primary' } } }}
                as="link"
                onClick={handleItemClick}
                variant={Variant.Link}
                HasArrow={{ value: true }}
                LinkValue={{ value: link }}
              />
            )}
          </div>
        </div>
      )
    );
  };

  const renderMenuItems = () => {
    if (!menuItems || menuItems.length <= 0) {
      return null;
    }

    const menuItemCount = menuItems?.length || 0;

    const handleClick = () => {
      if (href && href.length > 0) {
        router.push(href);
      }

      handleItemClick();
    };

    return (
      <div className="flex max-h-[15rem] flex-col gap-4 overflow-hidden">
        <div
          role="button"
          className="flex w-fit cursor-pointer items-center gap-2 border-b-[2px] border-white hover:border-bright-navy"
          onClick={handleClick}
        >
          <span className="font-roboto-700 text-2xl text-bright-navy">{title}</span>
          <a href={href} className="hidden">
            {title}
          </a>
          <ArrowRightIcon size={IconSize.Md} color={IconColor.Navy} />
        </div>
        <ul
          className={classNames(
            'gap-11 text-blue [&_li]:mb-4',
            {
              'columns-2': menuItemCount > 4 && menuItemCount <= 9,
            },
            { 'columns-3': menuItemCount > 9 }
          )}
        >
          {menuItems?.map((item) => {
            const field: LinkField = {
              value: {
                href: item.Href.jsonValue.value.href,
                text: item.NavigationTitle.value?.toString(),
              },
            };

            if (!item.ShowInNavigation || item.ShowInNavigation.value !== '1') {
              return <></>;
            }

            return (
              <li key={item.Href.jsonValue.value.id as string}>
                <Link
                  field={field}
                  className="underline-offset-4 hover:underline"
                  link_name={field.value.text}
                  onClick={handleItemClick}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  if (!isReady) {
    return null;
  }

  return (
    <div
      ref={forwardedRef}
      className={classNames(
        'absolute z-[80] hidden h-[330px] w-full',
        'bg-white',
        'justify-center py-10 shadow-lg xl:flex',
        className
      )}
    >
      <div className={classNames('flex w-full gap-10 lg:gap-24 xl:px-24', DESKTOP_MAX_WIDTH)}>
        {renderArticle()}
        {renderMenuItems()}
        <IconButton
          type="CloseIcon"
          className={classNames('ml-auto hidden self-start xl:flex')}
          iconSize={IconSize.Md}
          iconColor={IconColor.Navy}
          onClick={() => setIsReady(false)}
        />
      </div>
    </div>
  );
});

export default NavPanel;

NavPanel.displayName = 'NavPanel';
