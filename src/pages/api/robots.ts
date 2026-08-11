import type { NextApiRequest, NextApiResponse } from 'next';
import { siteResolver } from 'lib/site-resolver';
import { sitecoreClient, sitecoreConfig } from 'lib/sitecore-client';

const robotsApi = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
  const hostName = req.headers['host']?.split(':')[0] || 'localhost';
  const site = siteResolver.getByHost(hostName);
  const siteName = site?.name || sitecoreConfig.defaultSite;

  const robotsResult = await sitecoreClient.getRobots(siteName);
  return res.status(200).send(robotsResult || '');
};

export default robotsApi;
