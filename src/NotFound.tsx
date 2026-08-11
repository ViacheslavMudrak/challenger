import Head from 'next/head';

/**
 * Rendered in case if we have 404 error
 */
const NotFound = (): React.JSX.Element => (
  <>
    <Head>
      <title>404: NotFound Challenger</title>
    </Head>
    <div style={{ padding: 10 }}>
      <h1>Page not found Challenger</h1>
      <p error_message="This page does not exist">This page does not exist.</p>
      <a href="/">Go to the Home page</a>
    </div>
  </>
);

export default NotFound;
