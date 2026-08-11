import { clearPricingAPIJobData } from 'lib/challenger/rates';
import type { NextApiRequest, NextApiResponse } from 'next';

const resetPricingData = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'GET') {
    try {
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Origin', '*'); // replace this your actual origin
      res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
      );
      await clearPricingAPIJobData();
      res.status(200);
    } catch (err) {
      console.error('Error in Clearing Pricing Cache Data: ', err);
      res.status(500).send({ error: 'Clear Cache Error' });
    }
  } else {
    return res.status(400).json({ message: 'Invalid method used.' });
  }
};

export default resetPricingData;
