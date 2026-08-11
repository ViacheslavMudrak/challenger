import { getAccessToken } from 'lib/challenger/pricing';
import type { NextApiRequest, NextApiResponse } from 'next';

const accessTokenApi = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'GET') {
    try {
      const token = await getAccessToken();

      res.status(200).json(token);
    } catch (err) {
      console.error('access token api error', err);
      res.status(500).send({ error: 'Failed to fetch access token', err });
    }
  } else {
    return res.status(400).json({ message: 'Invalid method used.' });
  }
};

export default accessTokenApi;
