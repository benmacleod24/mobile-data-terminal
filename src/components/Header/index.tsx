import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import * as React from 'react';
import Media from './Media';
import Options from './Options';

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = ({}) => {
	const { status } = useSession();
	// Determine login status from sesh status.
	const isLoggedIn = status === 'authenticated';

	return (
		<Flex as={'header'} minH='16' maxH='16' bg='brand.700' w='full'>
			<Flex
				w='full'
				h='full'
				mx='auto'
				minW='container.xl'
				maxW='container.xl'
				align={'center'}
			>
				<Media />
				<Options />
				<Flex align={'center'}>
					{!isLoggedIn && (
						<Link href={'/auth/login'}>
							<Button
								type='submit'
								bg='#0284C7'
								size='sm'
								_hover={{
									bg: '#0EA5E9',
								}}
								_focus={{
									bg: '#0369A1',
								}}
								border={'1px solid #38BDF8'}
							>
								Login
							</Button>
						</Link>
					)}
					{isLoggedIn && (
						<Button
							type='submit'
							bg='#EAB308'
							size='sm'
							onClick={() =>
								signOut({ callbackUrl: '/auth/login' })
							}
							_hover={{
								bg: '#FACC15',
							}}
							_focus={{
								bg: '#CA8A04',
							}}
							border={'1px solid #FDE047'}
						>
							Logout
						</Button>
					)}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Header;
