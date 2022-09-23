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

	/**
	 * Colllect an acccount by their discord id.
	 * @param discord_id Discord id of the account.
	 * @returns Account model or undefined.
	 */
	public getAccountByDiscordId = async (
		discord_id?: string
	): Promise<TAccount | undefined> => {
		if (!discord_id) return undefined;
		const account = await prisma.account.findFirst({
			where: {
				discord_id,
			},
		});
		return account ?? undefined;
	};
}

export default Account;
