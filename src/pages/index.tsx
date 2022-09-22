import type { NextPage } from 'next';
import { Flex } from '@chakra-ui/react';
import Header from '../components/Header';
const Home: NextPage = () => {
	return (
		<Flex>
			<Header />
		</Flex>
	);
};

export default Home;
