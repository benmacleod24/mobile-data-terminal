import { PermissionKeys } from '@/config';
import { usePermissions } from '@/frontend/state/permission.state';
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import * as React from 'react';
import Account from './Account';
import Media from './Media';
import Options from './Options';

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = ({}) => {
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
				<Account />
			</Flex>
		</Flex>
	);
};

export default Header;
