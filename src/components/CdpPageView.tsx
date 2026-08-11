/* eslint-disable @typescript-eslint/no-explicit-any */
import { CdpHelper, useSitecore } from '@sitecore-content-sdk/nextjs';
import { useEffect } from 'react';
import config from 'sitecore.config';
import { context } from 'lib/context';

/**
 * This is the CDP page view component.
 * It uses the Sitecore Engage SDK to enable page view events on the client-side.
 * See Sitecore Engage SDK documentation for details.
 * https://www.npmjs.com/package/@sitecore/engage
 */
const CdpPageView = (): React.JSX.Element => {
  const { page } = useSitecore();
  const pageAny = page as any;
  const route = pageAny?.route;
  const variantId = pageAny?.variantId;
  const site = (page as any)?.site;

  /**
   * Determines if the page view events should be turned off.
   * IMPORTANT: You should implement based on your cookie consent management solution of choice.
   * By default it is disabled in development mode
   */
  const disabled = () => process.env.NODE_ENV === 'development';

  useEffect(() => {
    // Do not create events in editing or preview mode or if missing route data
    if (!page.mode?.isNormal || !route?.itemId) return;
    // Do not create events if disabled (e.g. we don't have consent)
    if (disabled()) return;

    //const siteInfo = siteResolver.getByName(site?.name || config.sitecoreSiteName);
    const language = route.itemLanguage || config.defaultLanguage;
    const scope = process.env.NEXT_PUBLIC_PERSONALIZE_SCOPE;

    const pageVariantId = CdpHelper.getPageVariantId(
      route.itemId,
      language,
      variantId as string,
      scope
    );
    // there are cases where Events SDK will be absent which are expected to reject
    context
      .getSDK('Events')
      .then((Events: any) =>
        Events.pageView({
          channel: 'WEB',
          currency: 'USD',
          page: route.name,
          pageVariantId,
          language,
        })
      )
      .catch((e: unknown) => console.debug(e));
  }, [page.mode, route, variantId, site]);

  return <></>;
};

export default CdpPageView;
