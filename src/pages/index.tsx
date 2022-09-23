import * as React from 'react';
import type { NextPage } from 'next';
import { Flex } from '@chakra-ui/react';
import Header from '../components/Header';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
	const { query } = useRouter();

	// Collect router querys for fun stuff.
	const ref = query.ref ?? undefined;
	const success = query.success ?? false;

	return (
		<Flex flexDir={'column'} h='100vh' w='100vw' align={'center'}>
			<Header />
			<Flex w='container.lg' pt='5'></Flex>
		</Flex>
	);
};

export default Home;
