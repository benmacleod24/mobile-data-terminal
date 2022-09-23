import { nextAuthConfig as _config } from '@/pages/api/auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session, unstable_getServerSession } from 'next-auth';
import { prisma } from '@prisma';
import { Prisma } from '@prisma/client';

type AccountPermisssions = Prisma.Account_PermissionsGetPayload<{
	include: {
		permission: true;
	};
}>[];

class PermissionService {
	private readonly request: NextApiRequest;
	private readonly response: NextApiResponse;

	constructor(req: NextApiRequest, res: NextApiResponse) {
		this.request = req;
		this.response = res;
	}

	/**
	 * Get session from the server and return int.
	 * @returns Session or null
	 */
	private getSession = async (): Promise<Session | null> => {
		const { request, response } = this;
		const session = unstable_getServerSession(request, response, _config);
		return session;
	};

	/**
	 * Check an accounts permission against the database.
	 * @param key Key of the permission you want to check.
	 * @returns True is the user has permission and false if they don't
	 */
	public getAccountPermission = async (key: string): Promise<boolean> => {
		const session = await this.getSession();
		if (!session) return false;

		// Collect permission record from the database.
		const permission = await prisma.account_Permissions.findFirst({
			where: {
				account_id: session.user.accountId,
				permission: {
					key,
				},
			},
		});

		return permission && permission.id ? true : false;
	};

	/**
	 * Get all permissions for the account in the session.
	 * @returns Array of account permissions
	 */
	public getAccountPermissions = async (): Promise<
		AccountPermisssions | undefined
	> => {
		const session = await this.getSession();
		if (!session) return undefined;

		// Collect the permission records from the database.
		const permissions = await prisma.account_Permissions.findMany({
			where: {
				account_id: session.user.accountId,
			},
			include: {
				permission: true,
			},
		});

		return permissions ?? [];
	};
}

export { PermissionService };
export default PermissionService;
