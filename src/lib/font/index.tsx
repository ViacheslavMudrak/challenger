import localFont from 'next/font/local';

const roboto = localFont({
  src: [
    {
      path: './roboto/roboto-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './roboto/roboto-latin-400-italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './roboto/roboto-latin-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './roboto/roboto-latin-500-italic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './roboto/roboto-latin-700-normal.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './roboto/roboto-latin-700-italic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: './roboto/roboto-latin-900-normal.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: './roboto/roboto-latin-900-italic.woff2',
      weight: '900',
      style: 'italic',
    },
  ],
  display: 'swap',
});

const RobotoFont = (): React.JSX.Element => {
  return (
    <style jsx global>{`
      html {
        --font-roboto: ${roboto.style.fontFamily};
      }
    `}</style>
  );
};

export default RobotoFont;
