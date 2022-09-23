import { stringToNumber } from '@/utils/parse';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { Permissions } from '@/backend/services';
import { z } from 'zod';
import { json } from 'stream/consumers';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			return GET(req, res);
		default:
			throw new Error('This method is not supported at this endpoint.');
	}
};

const getQueryParams = z.object({
	chargeId: z.string().transform(stringToNumber),
});

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	const { getAccountPermission } = new Permissions(req, res);
	const hasPermission = await getAccountPermission('EDIT_CHARGE');
	return res.json(hasPermission);
};

export default handler;
