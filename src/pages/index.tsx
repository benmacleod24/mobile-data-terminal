import * as React from 'react';
import type { NextPage } from 'next';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import Header from '../components/Header';
import { signIn, signOut, useSession } from 'next-auth/react';

const Home: NextPage = () => {
	const [username, setUsername] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const { status } = useSession();
	const onSubmit = () => {};

	return (
		<Flex flexDir={'column'}>
			<Header />
			<Flex flexDir={'column'} minW='xs' gap={3} mt='10' mx='auto'>
				<Text mx='auto'>{status}</Text>
				<Input
					placeholder='Username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<Input
					placeholder='Password'
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button
					colorScheme={'blue'}
					onClick={() => {
						signIn('credentials', {
							username,
							password,
							callbackUrl: '/',
						});
					}}
				>
					Sign In
				</Button>
				<Button colorScheme={'blue'} onClick={() => signOut()}>
					Sign Out
				</Button>
			</Flex>
		</Flex>
	);
};

export default Home;
