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
				credentials: {
					username: { type: 'test' },
					password: { type: 'password' },
				},
				authorize: async (credentials, req) => {
					//@ts-ignore
					// username and password will always be there.
					const { username, password } = credentials;

					/* Collect user logic. */
					const { getAccountByUsername } = new Account();
					const account = await getAccountByUsername(username);

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

					// Return the account after everything passed correctly.
					return {
						...account,
						password: null,
					};
				},
			}),
		],

		// Session config.
		session: {
			strategy: 'jwt',
			maxAge: 30 * 24 * 60 * 60, // 30 days,
		},

		// Pages
		pages: {
			signIn: '/auth/signin',
			signOut: '/auth/signout',
			error: '/auth/error', // Error code passed in query string as ?error=
			verifyRequest: '/auth/verify-request', // (used for check email message)
			newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
		},

		/**
		 * Callbacks for actions.
		 */
		callbacks: {
			session: async ({ session }) => {
				return session;
			},
			jwt: async ({ token }) => {
				return token;
			},
		},
	});
};

export default handler;
