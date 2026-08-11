interface NavHamburgerProps {
  onClick: () => void;
  isOpen: boolean;
}

const NavHamburger = (props: NavHamburgerProps) => {
  const { isOpen, onClick } = props;

  const genericHamburgerLine = `h-[3px] w-6 bg-deep-blue transition ease transform duration-300`;

  const handleClick = () => {
    onClick();
  };

  return (
    <div className="flex items-center justify-center">
      <button
        aria-label="menu button"
        className="flex flex-col items-center justify-center gap-1"
        onClick={handleClick}
      >
        <span
          className={`${genericHamburgerLine} ${isOpen ? 'translate-y-[7px] rotate-45 ' : ''}`}
        />
        <span className={`${genericHamburgerLine} ${isOpen ? 'opacity-0' : ''}`} />
        <span
          className={`${genericHamburgerLine} ${isOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
        />
      </button>
    </div>
  );
};

export default NavHamburger;
