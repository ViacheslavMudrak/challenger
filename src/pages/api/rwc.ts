/* eslint-disable import/no-anonymous-default-export */
import { getAccessToken } from 'lib/challenger/pricing';
import { getRwcDefaultValues } from 'lib/challenger/rwc';
import type { NextApiRequest, NextApiResponse } from 'next';
export default async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const token = await getAccessToken();

    const rwcDefaultData = await getRwcDefaultValues(token);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*'); // replace this your actual origin
    res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    //res.setHeader('Cache-Control', 'max-age=86400');
    //res.setHeader('CDN-Cache-Control', 'max-age=86400');
    res.status(200).json(rwcDefaultData);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: 'Failed to fetch default values' });
  }
};
