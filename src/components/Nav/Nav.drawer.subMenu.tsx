import IconButton from 'components/IconButton/IconButton';
import { NavItemChild } from './Nav.types';
import classNames from 'classnames';
import { IconSize } from 'components/Icons/icon.types';

interface NavDrawerSubMenuProps {
  menuItem?: NavItemChild;
  show?: boolean;
  onBack?: () => void;
  onClick?: (url: string) => void;
}
const NavDrawerSubMenu = (props: NavDrawerSubMenuProps) => {
  const { menuItem, onBack, show, onClick } = props;

  if (!menuItem || !menuItem.Children || menuItem.Children.results.length === 0) {
    return null;
  }

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleItemClick = (item: NavItemChild) => {
    if (onClick) {
      onClick(item.Href.jsonValue.value.href || '');
    }
  };

  const { Children: items } = menuItem;

  const renderMenuItems = () => {
    return (
      <ul className="flex flex-col gap-8">
        {items.results?.map((item) => {
          return (
            <li
              className={classNames(
                'group flex w-full items-center justify-between gap-2',
                'cursor-pointer text-2xl',
                'text-deep-blue'
              )}
              key={item.Href.jsonValue.value.id as string}
              onClick={() => handleItemClick(item)}
            >
              <span className="hover:underline hover:underline-offset-8">
                {item.NavigationTitle.value}
              </span>
              <a href={item.Href.jsonValue.value.href} className="hidden">
                {item.NavigationTitle.value}
              </a>
            </li>
          );
        })}
      </ul>
    );
  };

  const handleClick = (href: string) => {
    if (onClick) {
      onClick(href);
    }
  };

  return (
    <div
      className={classNames(
        'absolute h-full w-full',
        'bg-grey-light',
        'nav-drawer',
        { 'slide-out-animation': show },
        { 'slide-in-animation': !show }
      )}
    >
      <div className="flex items-center justify-start bg-white px-6 py-8 [&_button]:w-fit">
        <IconButton
          type="ChevronLeftIcon"
          iconSize={IconSize.Md}
          className="font-roboto-700 text-xl text-deep-blue"
          onClick={handleBackClick}
        >
          Back
        </IconButton>
      </div>
      <div className="h-[calc(100vh-165px)] overflow-y-auto px-6 py-4">
        <span
          role="button"
          onClick={() => handleClick(menuItem.Href.jsonValue.value.href || '')}
          className="block pb-8 pt-6 font-roboto-700 text-[28px] text-deep-blue hover:underline hover:underline-offset-8"
        >
          {menuItem.NavigationTitle.value}
        </span>
        {renderMenuItems()}
      </div>
    </div>
  );
};

export default NavDrawerSubMenu;
