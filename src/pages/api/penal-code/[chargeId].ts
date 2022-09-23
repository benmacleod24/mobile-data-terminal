import { stringToNumber } from '@/utils/parse';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { json } from 'stream/consumers';
import { PermissionService } from '@/backend/services';

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
	const { getAccountPermission } = new PermissionService(req, res);
	const hasAccess = await getAccountPermission('EDIT_CHARGE');
	return res.status(200).json(hasAccess);
};

export default handler;
