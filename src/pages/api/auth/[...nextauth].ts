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
						return null;
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
						return null;
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
		// pages: {
		// 	signIn: '/auth/signin',
		// 	signOut: '/auth/signout',
		// 	error: '/auth/error', // Error code passed in query string as ?error=
		// 	verifyRequest: '/auth/verify-request', // (used for check email message)
		// 	newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
		// },

		/**
		 * Callbacks for actions.
		 */
		callbacks: {
			session: async ({ session, token, user }) => {
				const username = token.username;
				const userId = token.id;

				if (!userId || !username) {
					/* Run Discord Collection Logic. */
				}

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
