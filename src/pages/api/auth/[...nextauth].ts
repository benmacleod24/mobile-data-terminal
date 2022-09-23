import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';

// OAuth Providers.
import Discord from 'next-auth/providers/discord';
import Credentials from 'next-auth/providers/credentials';
import Password from '@/backend/services/password';
import Account from '@/backend/services/account';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	/* Any pre-auth logic we want to run. */
	return await NextAuth(req, res, {
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
					const { getAccountByUsername } = new Account();
					let account = await getAccountByUsername(username);

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
						throw new Error(
							'Invalid credentials, please try again.'
						);
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
					const { getAccountByDiscordId } = new Account();
					const foundAccount = await getAccountByDiscordId(
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
			session: async ({ session, token, user }) => {
				const username = token.username;
				const userId = token.id;

				console.log(user);

				if (!userId || !username) {
					/* Run Discord Collection Logic. */
				}

				/* Setting Session Varibles. */
				session.user.username = username;

				return session;
			},
			/**
			 * @todo Find which varible provides discord stuff.
			 * @param user Provides the username and password when accepted.
			 */
			jwt: async ({ token, account, user, profile }) => {
				/**
				 * If user is present set the token values.
				 * @note User is only from username and password sign in.
				 */

				if (user) {
					token.id = user.id;
					token.username = user.username;
				}
				return token;
			},
		},
	});
};

export default handler;
