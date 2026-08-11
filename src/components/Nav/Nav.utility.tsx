// 'use client';

import { ComponentParams, ComponentRendering, Placeholder } from '@sitecore-content-sdk/nextjs';
import { useMediaQuery } from 'usehooks-ts';
import { DESKTOP_MEDIA_QUERY } from 'components/constants';
import classNames from 'classnames';
import { DESKTOP_MAX_WIDTH } from 'components/constants';
import NavUtilityPanel from './Nav.utility.panel';
import { useState } from 'react';
import { useAnalytics } from 'lib/challenger/useAnalytics';

type Fields = {
  Id: string;
  DisplayName: string;
};

export interface NavUtilityProps {
  params?: { [key: string]: string };
  fields: Fields;
  relativeLevel?: number;
  rendering?: ComponentRendering & { params: ComponentParams };
}
const NavUtility = (props: NavUtilityProps): React.JSX.Element => {
  const { rendering } = props;
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const isMobile = !isDesktop;
  const [toggleUtilityPanel, setToggleUtilityPanel] = useState(false);
  const { linkComponent } = useAnalytics(props.rendering);

  const handleUtilityPanelClose = () => {
    setToggleUtilityPanel(false);
  };

  if (isMobile) {
    return (
      <>
        {rendering && <Placeholder name="utility-top-left" rendering={rendering} />}
        {rendering && <Placeholder name="utility-top-right" rendering={rendering} />}
      </>
    );
  }

  return (
    <div
      link_component={linkComponent}
      className="hidden w-full flex-col items-center justify-center bg-deep-blue lg:flex"
    >
      <div
        className={classNames(
          'flex w-full items-center text-white xl:justify-between xl:px-24',
          DESKTOP_MAX_WIDTH
        )}
      >
        {rendering && <Placeholder name="utility-top-left" rendering={rendering} />}
        <div className="py-3">
          {rendering && <Placeholder name="utility-top-right" rendering={rendering} />}
        </div>
      </div>
      <NavUtilityPanel
        show={toggleUtilityPanel}
        onClose={handleUtilityPanelClose}
        rendering={rendering}
      />
    </div>
  );
};

export default NavUtility;

// export default dynamic(() => Promise.resolve(NavUtility), {
//   ssr: false,
// });
