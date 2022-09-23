import { Flex } from '@chakra-ui/react';
import * as React from 'react';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {}

const Layout: React.FunctionComponent<
	React.PropsWithChildren<LayoutProps>
> = ({ children }) => {
	return (
		<Flex flexDir={'column'} h='100vh' w='100vw' align={'center'}>
			<Header />
			<Flex w='container.lg' pt='5' flexGrow={2}>
				{children}
			</Flex>
			<Footer />
		</Flex>
	);
};

export default Layout;
