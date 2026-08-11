import type { NextApiRequest, NextApiResponse } from 'next';

// EditingDataMiddleware was removed in Content SDK.
// XM Cloud editing uses the modern editing API — implement if Pages editing is needed.
export const config = {
  api: {
    bodyParser: { sizeLimit: '2mb' },
    responseLimit: false,
  },
};

const handler = async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  res.status(404).end();
};

export default handler;
