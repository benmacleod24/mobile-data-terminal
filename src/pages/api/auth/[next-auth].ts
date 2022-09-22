import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';

import Discord from 'next-auth/providers/discord';
import Credentials from 'next-auth/providers/credentials';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	/* Any pre-auth logic we want to run. */
	return await NextAuth(req, res, {
		providers: [
			Credentials({
				credentials: {
					username: { type: 'test' },
					password: { type: 'password' },
				},
				authorize(credentials, req) {
					//@ts-ignore
					// username and password will always be there.
					const { username, password } = credentials;

					return {};
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
