import * as React from 'react';
import type { NextPage } from 'next';
import { Flex, Text } from '@chakra-ui/react';
import Header from '../frontend/components/Header';
import { useRouter } from 'next/router';
import Layout from '@/frontend/components/layout';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { getAccountPermissions } from '@/frontend/api/permissions';
import { usePermissions } from '@/frontend/state/permission.state';

const Home: NextPage = () => {
	const { data } = useSession();
	const { state } = usePermissions();

	return (
		<Layout>
			<Flex flexDir={'column'}>
				<Text mb='10'>Welcome {data?.user.username}!</Text>
				{state && (
					<Flex flexDir={'column'}>
						<Text fontWeight={'bold'}>Your Permissions</Text>
						<pre>{JSON.stringify(state, null, 2)}</pre>
					</Flex>
				)}
			</Flex>
		</Layout>
	);
};

export default Home;
