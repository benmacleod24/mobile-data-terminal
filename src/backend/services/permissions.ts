import { nextAuthConfig } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@prisma';
import { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';

interface Constructor {
	accountId?: number;
}

// Type for collection of accounts permissions.
export type AccountPermissions = Prisma.Account_PermissionsGetPayload<{
	include: {
		permission: true;
	};
}>;

/**
 * Permissions service for collecting an accounts permissions.
 */
class Permissions {
	private accountId?: any;
	private readonly req: NextApiRequest;
	private readonly res: NextApiResponse;

	constructor(req: NextApiRequest, res: NextApiResponse) {
		this.req = req;
		this.res = res;

		// Initalze the permission service.
		this.accountId = this.getAccountIdFromReq();
	}

	/**
	 * Collect the account id from the session, this is required for the service.
	 * @returns undefined
	 */
	private getAccountIdFromReq = async () => {
		const session = await unstable_getServerSession(
			this.req,
			this.res,
			nextAuthConfig
		);

		// this.accountId = session?.user.accountId;
		return session?.user.accountId ?? 0;
	};

	/**
	 * Collect all permissions for the account.
	 * @returns
	 */
	public getAccountPermissions = async (): Promise<
		AccountPermissions[] | undefined
	> => {
		if (!this.accountId) return undefined;

		const permissions = await prisma.account_Permissions.findMany({
			where: {
				account_id: this.accountId,
			},
			include: {
				permission: true,
			},
		});

		return permissions;
	};

	/**
	 * Check a specific permission for a account.
	 * @param key Key of the permission you want to check.
	 * @returns True or false
	 */
	public getAccountPermission = async (key: string) => {
		// Collect permission from the database.
		const _permission = await prisma.account_Permissions.findFirst({
			where: {
				account_id: this.accountId,
				permission: {
					key,
				},
			},
		});

		console.log(_permission);

		return _permission && _permission.id ? true : false;
	};
}

export { Permissions };
