import classNames from 'classnames';

interface NavMenuItemProps {
  text: string;
  isActive: boolean;
  isExpanded: boolean;
}
const NavMenuItem = (props: NavMenuItemProps) => {
  const { text, isActive, isExpanded } = props;
  return (
    <>
      <span
        title={text}
        link_name={text}
        className={classNames(
          'font-roboto-500 text-lg',
          'max-w-[200px]',
          'overflow-hidden text-ellipsis whitespace-nowrap',
          `group-hover:text-blue`,
          `group-hover:bg-grey-light`,
          `xl:p-3 `,
          { 'text-deep-blue': !isExpanded },
          { 'bg-grey-light text-blue': isActive && isExpanded }
        )}
      >
        {text}
      </span>
    </>
  );
};

export default NavMenuItem;
