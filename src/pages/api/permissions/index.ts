import { PermissionService } from '@/backend/services';
import { ApiResponse } from '@/utils/format-response';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			return GET(req, res);
		default:
			throw new Error('Method is not support at this endpoint.');
	}
};
/**
 * Handler for collecting a users permission, can be all or none.
 * @method GET
 */

const getQuery = z.object({
	key: z.ostring(),
});

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	const { key: permissionKey } = getQuery.parse(req.query);

	// Permission Service.
	const permissions = new PermissionService(req, res);
	const { getAccountPermission, getAccountPermissions } = permissions;

	// If permission key query exist we will return only that permission.
	if (permissionKey) {
		const permission = await getAccountPermission(permissionKey);
		return res.status(200).json(ApiResponse(req, permission));
	}

	// Default to all permissions returned.
	const _permissions = await getAccountPermissions();
	return res.status(200).json(ApiResponse(req, _permissions));
};

export default handler;
