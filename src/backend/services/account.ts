import { prisma } from '@prisma';
import { Account as TAccount } from '@prisma/client';

class Account {
	constructor() {}

	/**
	 * Colllect an acccount by their username.
	 * @param username Username of the account.
	 * @returns Account model or undefined.
	 */
	public getAccountByUsername = async (
		username: string
	): Promise<TAccount | undefined> => {
		const account = await prisma.account.findFirst({
			where: {
				username,
			},
		});

		return account ?? undefined;
	};
}

export default Account;
