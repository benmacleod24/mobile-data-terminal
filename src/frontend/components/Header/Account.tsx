import { PermissionKeys } from '@/config';
import { usePermissions } from '@/frontend/state/permission.state';
import {
	Button,
	Flex,
	Icon,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import * as React from 'react';
import { HiChevronDown, HiLogin, HiLogout } from 'react-icons/hi';
import { FaBookOpen } from 'react-icons/fa';
import { GiRank3 } from 'react-icons/gi';
import Link from 'next/link';

interface AccountProps {}

const Account: React.FunctionComponent<AccountProps> = ({}) => {
	const { data, status } = useSession();
	const { state } = usePermissions();

	if (!data) {
		return (
			<Flex>
				<Link href={'/auth/login'}>
					<Button
						leftIcon={<HiLogin />}
						variant='brand.blue'
						size='sm'
					>
						Login
					</Button>
				</Link>
			</Flex>
		);
	}

	return (
		<Flex>
			<Menu>
				{({ isOpen }) => {
					return (
						<React.Fragment>
							<MenuButton
								as={Button}
								size='sm'
								variant='ghost'
								rightIcon={
									<Icon
										as={HiChevronDown}
										transition='0.25s ease-in-out'
										transform={`rotate(${
											isOpen ? '180' : '0'
										}deg)`}
									/>
								}
								textTransform='capitalize'
							>
								Welcome {data?.user.username}!
							</MenuButton>
							<MenuList bg='brand.700'>
								<MenuItem icon={<FaBookOpen />}>
									Profile
								</MenuItem>
								{state[PermissionKeys.CommandPanel] && (
									<MenuItem icon={<GiRank3 />}>
										Command Panel
									</MenuItem>
								)}
								<MenuDivider />
								<MenuItem
									icon={<HiLogout />}
									color='yellow.700'
									onClick={() =>
										signOut({ callbackUrl: '/auth/login' })
									}
								>
									Logout
								</MenuItem>
							</MenuList>
						</React.Fragment>
					);
				}}
			</Menu>
		</Flex>
	);
};

export default Account;
