import { prisma } from '@prisma';
import { Account as TAccount } from '@prisma/client';

class Account {
	private readonly accountId?: number;

	constructor(accountId?: number) {
		this.accountId = accountId;
	}

	/**
	 * Collect account by it's id.
	 * @param accountId Account id if not passed by constructor
	 * @returns Account or undefined.
	 */
	public getAccount = async (
		accountId?: number
	): Promise<TAccount | undefined> => {
		const _id = this.accountId || accountId;
		if (!_id) return undefined;
		const account = await prisma.account.findUnique({
			where: {
				id: _id,
			},
		});
		return account ?? undefined;
	};

	/**
	 * Colllect an acccount by their username.
	 * @param username Username of the account.
	 * @returns Account model or undefined.
	 */
	public static getAccountByUsername = async (
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
	public static getAccountByDiscordId = async (
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

export { Account };
