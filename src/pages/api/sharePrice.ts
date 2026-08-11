import type { NextApiRequest, NextApiResponse } from 'next';
import { Parser } from 'xml2js';

const sharePriceApi = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'GET') {
    try {
      const response = await fetch(
        'https://www.aspecthuntley.com.au/af/investmentprice?xtm-licensee=challengerfeed&code=CGF&exchangeCode=ASX&cs=utf&mode=xm'
      );
      const xmlRate = await response.text();
      const parser = new Parser();
      const result = await parser.parseStringPromise(xmlRate);

      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Origin', '*'); // replace this your actual origin
      res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(500).send({ error: 'Failed to fetch rates' });
    }
  } else {
    return res.status(400).json({ message: 'Invalid method used.' });
  }
};

export default sharePriceApi;
