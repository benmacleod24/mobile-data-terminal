import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import theme from '../styles/theme';
import { PermissionProvider } from '@/frontend/state/permission.state';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
	return (
		// Next Auth Session Provider
		<SessionProvider session={pageProps.session}>
			{/* React Query Client Provider */}
			<QueryClientProvider client={queryClient}>
				<PermissionProvider>
					{/* Chakra Theme Provider */}
					<ChakraProvider resetCSS theme={theme}>
						<Component {...pageProps} />
					</ChakraProvider>
				</PermissionProvider>
			</QueryClientProvider>
		</SessionProvider>
	);
}

export default MyApp;
