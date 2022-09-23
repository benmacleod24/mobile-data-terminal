import NextAuth from 'next-auth';
import { ProviderType } from 'next-auth/providers';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			accountId: number;
			username?: string;
		};
	}

	interface User {
		username: string;
		id?: number;
	}
}

declare module 'next-auth/jwt' {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT {
		accountId: number;
		authenticatedBy: ProviderType;
	}
}
