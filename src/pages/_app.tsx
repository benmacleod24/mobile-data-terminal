import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import theme from '../styles/theme';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
	return (
		// Next Auth Session Provider
		<SessionProvider session={pageProps.session}>
			{/* React Query Client Provider */}
			<QueryClientProvider client={queryClient}>
				{/* Chakra Theme Provider */}
				<ChakraProvider resetCSS theme={theme}>
					<Component {...pageProps} />
				</ChakraProvider>
			</QueryClientProvider>
		</SessionProvider>
	);
}

export default MyApp;
