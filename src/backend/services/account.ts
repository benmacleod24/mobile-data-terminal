import { prisma } from '@prisma';

class Account {
	constructor() {}

	/**
	 * Colllect an acccount by their username.
	 * @param username Username of the account.
	 * @returns Account model or undefined.
	 */
	public getAccountByUsername = async (username: string) => {
		const account = await prisma.account.findFirst({
			where: {
				username,
			},
		});

		return account ?? undefined;
	};
}

export default Account;
