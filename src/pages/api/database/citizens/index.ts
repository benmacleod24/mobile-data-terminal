import { CitizenService } from '@/backend/services';
import { ApiResponse } from '@/utils/format-response';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			return GET(req, res);
		default:
			throw new Error('Method is not supported at this endpoint.');
	}
};

/**
 * @breif Get an array of citizens from the database, is paginated also.
 * @method GET
 */
const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	const { page } = req.query;
	const { getCitizens, perPagelimit } = new CitizenService();
	const citizens = await getCitizens(Number(page));

	res.status(200).json(
		ApiResponse(req, {
			citizens: citizens.citizens,
			_pagination: {
				count: citizens._cout,
				perPage: perPagelimit,
				totalNumOfPages: Math.ceil(citizens._cout / perPagelimit),
			},
		})
	);
};

export default handler;
