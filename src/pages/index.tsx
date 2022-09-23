import * as React from 'react';
import type { NextPage } from 'next';
import { Flex } from '@chakra-ui/react';
import Header from '../frontend/components/Header';
import { useRouter } from 'next/router';
import Layout from '@/frontend/components/layout';

const Home: NextPage = () => {
	const { query } = useRouter();

	// Collect router querys for fun stuff.
	const ref = query.ref ?? undefined;
	const success = query.success ?? false;

	return <Layout></Layout>;
};

export default Home;
