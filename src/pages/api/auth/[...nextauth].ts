import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';

// OAuth Providers.
import Discord from 'next-auth/providers/discord';
import Credentials from 'next-auth/providers/credentials';
import { Account, Password } from '@/backend/services';

export const nextAuthConfig: NextAuthOptions = {
	providers: [
		Discord({
			clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
			clientId: process.env.DISCORD_CLIENT_ID as string,
		}),
		Credentials({
			name: 'Login Page',
			credentials: {
				username: {
					label: 'username',
					type: 'text',
					placeholder: 'username',
				},
				password: {
					label: 'password',
					type: 'password',
					placeholder: 'password',
				},
			},
			authorize: async (credentials, req) => {
				//@ts-ignore
				// username and password will always be there.
				const { username, password } = credentials;

				/* Collect user logic. */
				let account = await Account.getAccountByUsername(username);

				// Return if the account is not found.
				if (!account) {
					throw new Error("Account Doesn't Exist");
				}

				/**
				 * Password service & verification.
				 * @todo Make sure the password valid var works.
				 */
				const { isPasswordValid } = new Password({
					plaintext: password,
					hashed: account.password,
				});

				/**
				 * Return null if the password is incorrect.
				 * @todo Add logging for failed password attempts.
				 */
				if (!isPasswordValid) {
					throw new Error('Invalid credentials, please try again.');
				}

				//@ts-ignore.
				// Ignore this because we already check for this.
				delete account.password;

				// Return the account after everything passed correctly.
				return account;
			},
		}),
	],

	// Session config.
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days,
	},

	secret: 'SECRET_LOL',

	// Pages
	pages: {
		signIn: '/auth/login',
		// signOut: '/auth/signout',
		error: '/auth/login', // Error code passed in query string as ?error=
		// verifyRequest: '/auth/verify-request', // (used for check email message)
		// newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
	},

	/**
	 * Callbacks for actions.
	 */
	callbacks: {
		/**
		 * @todo Login attempt logs.
		 */
		signIn: async ({ profile, credentials, account }) => {
			// Verify the provider is discord, logic check for creds is above.
			if (account && account.provider === 'discord') {
				// Make sure the discord profile exist.
				if (!profile) {
					throw new Error('An error occured while processing.');
				}

				// Grab the discord id from the profile object.
				const discord_id = account.providerAccountId ?? undefined;

				// Find an account with the associated discord id.
				const foundAccount = await Account.getAccountByDiscordId(
					discord_id
				);

				// If there is not a linked account return an error.
				if (foundAccount === undefined) {
					return `/auth/login?${new URLSearchParams({
						error: 'Could not find account associated with this discord, please login with your credentials.',
					})}`;
				}

				// Return true is all checks pass.
				return true;
			}

			return true;
		},
		/**
		 * Session handling, collect our data for the frontend session here.
		 * Important to try and keep it as small as possible.
		 */
		session: async ({ session, token, user }) => {
			let newSession = { ...session };

			// Collect account for session data.
			const { getAccount } = new Account(token.accountId);
			const account = await getAccount();

			// If an account wasn't found return old session.
			if (!account) {
				return session;
			}

			/* Setting Session Values */
			newSession.user.accountId = token.accountId;
			newSession.user.username = account.username;

			return newSession;
		},
		/**
		 * This is where we pass data to the jwt token before it's sign.
		 * Very important to keep it as small as possible.
		 */
		jwt: async ({ token, account, user, profile }) => {
			let newToken = { ...token };
			let accountId: number = 0;

			// If account or user param doesn't exist, return old token.
			if (!account || !user) {
				return token;
			}

			/* Remove Token Value */
			// For whatever reason next-auth comes with predefined token values.
			delete newToken.name;
			delete newToken.email;
			delete newToken.picture;
			delete newToken.sub;

			const { type, providerAccountId } = account;

			// If the auth type is credentails the accountId will be passed.
			if (type === 'credentials') {
				accountId = Number(providerAccountId);
			}

			// If auth type is oauth collect the account.
			if (type === 'oauth') {
				const accountRecord = await Account.getAccountByDiscordId(
					providerAccountId
				);

				// If the account wasn't found, return old token.
				if (!accountRecord) {
					return token;
				}

				// Set the account id.
				accountId = accountRecord.id;
			}

			/* Set Token Value */
			newToken.accountId = accountId;
			newToken.authenticatedBy = type;

			return newToken;
		},
	},
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	/* Any pre-auth logic we want to run. */
	return await NextAuth(req, res, nextAuthConfig);
};

export default handler;
