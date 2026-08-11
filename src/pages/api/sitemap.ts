import type { NextApiRequest, NextApiResponse } from 'next';
import { siteResolver } from 'lib/site-resolver';
import { sitecoreClient } from 'lib/sitecore-client';

const sitemapApi = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  const {
    query: { id },
  } = req;
  const hostName = req.headers['host']?.split(':')[0] || 'localhost';
  const site = siteResolver.getByHost(hostName);
  const reqProtocol = req.headers['x-forwarded-proto'] || 'https';

  try {
    const sitemapContent = await sitecoreClient.getSiteMap({
      reqHost: hostName,
      reqProtocol,
      id: id as string | undefined,
      siteName: site?.name,
    });
    res.setHeader('Content-Type', 'text/xml;charset=utf-8');
    return res.send(sitemapContent);
  } catch {
    return res.redirect('/404');
  }
};

export default sitemapApi;
