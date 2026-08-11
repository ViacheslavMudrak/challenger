import IconButton from 'components/IconButton/IconButton';
import { IconColor, IconSize } from 'components/Icons/icon.types';
import { Item, NavProps, NavRenderingType } from './Nav.types';
import { Link } from '@sitecore-content-sdk/nextjs';

const NavSearch = (props: NavProps) => {
  const items = props.rendering;

  if (!items || !items.placeholders) {
    return null;
  }

  const utilityBar = items.placeholders['header-utility'][0] as NavRenderingType;

  if (!utilityBar || !utilityBar.placeholders) {
    return null;
  }

  const utilityLinks = utilityBar.placeholders['utility-top-right'][0] as NavRenderingType;

  if (!utilityLinks || !utilityLinks.fields) {
    return null;
  }

  const searchItem = (utilityLinks.fields.items as Item[]).find(
    (item: Item) => item.name.toLowerCase() === 'search'
  ) as Item;

  if (!searchItem) {
    return null;
  }

  return (
    <Link field={searchItem.fields.Link} className="flex items-center">
      <IconButton type="SearchIcon" iconColor={IconColor.Navy} iconSize={IconSize.Lg} />
    </Link>
  );
};

export default NavSearch;
