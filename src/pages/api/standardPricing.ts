import { getAccessToken, getStandardPricing } from 'lib/challenger/pricing';
import {
  getCarePlusJobData,
  getCarePlusTableData,
  getDLATableData,
  getDLAJobData,
  getFITableData,
  getFIJobData,
  getMLATableData,
  getMLAJobData,
  clearPricingAPIJobData,
} from 'lib/challenger/rates';
import type { NextApiRequest, NextApiResponse } from 'next';
import { revalidateTag } from 'next/cache';
//import action from './action';

const standardPricingApi = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'GET') {
    try {
      const [, paramString] = (req.url || '').split('?');
      const params = new URLSearchParams(paramString);
      const mode = (params.get('mode') || '') as string;
      const tag = (params.get('tag') || '') as string;
      const term = parseInt(params.get('term') || '3') as number;

      const token = await getAccessToken();

      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Origin', '*'); // replace this your actual origin
      res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
      );
      //res.setHeader('Cache-Control', 'max-age=86400');
      //res.setHeader('CDN-Cache-Control', 'max-age=86400');

      if (mode === 'getCarePlus') {
        const cpData = await getCarePlusTableData();
        res.status(200).json(cpData);
      } else if (mode === 'getCarePlusJob') {
        const cpJobData = await getCarePlusJobData();
        res.status(200).json(cpJobData);
      } else if (mode === 'getDLA') {
        const dlaData = await getDLATableData();
        res.status(200).json(dlaData);
      } else if (mode === 'getDLAJob') {
        const dlaJobData = await getDLAJobData();
        res.status(200).json(dlaJobData);
      } else if (mode === 'getFI') {
        const dlaData = await getFITableData();
        res.status(200).json(dlaData);
      } else if (mode === 'getFIJob') {
        const fiJobData = await getFIJobData();
        res.status(200).json(fiJobData);
      } else if (mode === 'getMLA') {
        const dlaData = await getMLATableData();
        res.status(200).json(dlaData);
      } else if (mode === 'getMLAJob') {
        const mlajobData = await getMLAJobData();
        res.status(200).json(mlajobData);
      } else if (mode === 'clearCacheData') {
        await clearPricingAPIJobData();
        res.status(200);
      } else if (mode === 'revalidate') {
        revalidateTag(tag);
        res.status(200).json(true);
      } else {
        const standardPricing = await getStandardPricing(token, term);
        res.status(200).json(standardPricing);
      }
    } catch (err) {
      console.error('Standard pricing error', err);
      res.status(500).send({ error: 'Failed to fetch pricing' });
    }
  } else {
    return res.status(400).json({ message: 'Invalid method used.' });
  }
};

export default standardPricingApi;
