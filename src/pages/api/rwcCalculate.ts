/* eslint-disable import/no-anonymous-default-export */
import { getAccessToken } from 'lib/challenger/pricing';
import { sendRwcValues } from 'lib/challenger/rwc';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  if (_req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const token = await getAccessToken();
    const rwcCalcData = await sendRwcValues(token, _req.body);

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    return res.status(200).json(rwcCalcData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to send RWC calculate values' });
  }
};
