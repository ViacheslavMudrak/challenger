import BYOC from 'src/byoc';
import CdpPageView from 'components/CdpPageView';
import { EditingScripts } from '@sitecore-content-sdk/nextjs';

const Scripts = (): React.JSX.Element => {
  return (
    <>
      <EditingScripts />
      <BYOC />
      <CdpPageView />
    </>
  );
};

export default Scripts;
