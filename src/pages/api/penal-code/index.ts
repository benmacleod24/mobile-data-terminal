import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@prisma';
import { Prisma } from '@prisma/client';
import * as z from 'zod';
import { stringToBool } from '@/utils/parse';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	// Listen for method and determine action.
	switch (method) {
		case 'GET':
			return GET(req, res);
		default:
			throw new Error('Method not allowed on this endpoint.');
	}
};

/**
 * Full penal code type.
 * @todo Find a way to infer this from a query.
 */
export type PenalCode = Prisma.PenalCode_CategoryGetPayload<{
	include: {
		charges: {
			include: {
				points: true;
			};
		};
	};
}>;

/**
 * Collect the penal code or certain parts of the penal code.
 * @method GET
 */

const queryParams = z.object({
	points: z.ostring().transform(stringToBool),
	charges: z.ostring().transform(stringToBool),
});

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	let include = {};
	const { points, charges } = queryParams.parse(req.query);

	// We want to allow picking which data to grab and not to grab.
	// This is done via the query request query.
	if (charges) {
		include = {
			...include,
			charges: {
				include: {
					points: points,
				},
			},
		};
	}

	// Collect the penal code from the database.
	const penal_code = await prisma.penalCode_Category.findMany({
		include: { _count: true, ...include },
		where: {
			deleted_at: null,
		},
	});

	/* Error Handling Here */

	res.status(200).json(penal_code);
};

export default handler;
