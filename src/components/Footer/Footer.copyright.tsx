import dayjs from 'dayjs';

const FooterCopyright = (): React.JSX.Element => {
  const currentYear = dayjs().year();

  return <>Copyright Â© {currentYear} Challenger</>;
};

export default FooterCopyright;
