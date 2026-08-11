import { getAccessToken, getPricing, PaymentFrequency } from 'lib/challenger/pricing';
import type { NextApiRequest, NextApiResponse } from 'next';

const pricingApi = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'GET') {
    try {
      const [, paramString] = (req.url || '').split('?');
      const params = new URLSearchParams(paramString);
      const amount = (params.get('amount') || 0) as number;
      const frequency = params.get('frequency') as PaymentFrequency;

      const token = await getAccessToken();
      const pricingData = await getPricing(token, amount, frequency);

      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Origin', '*'); // replace this your actual origin
      res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
      );

      //res.setHeader('Cache-Control', 'max-age=86400');
      //res.setHeader('CDN-Cache-Control', 'max-age=86400');

      res.status(200).json(pricingData);
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: 'Failed to fetch pricing' });
    }
  } else {
    return res.status(400).json({ message: 'Invalid method used.' });
  }
};

export default pricingApi;
