import {
	Button,
	Flex,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import path from 'path';
import * as React from 'react';
import { HiChevronDown } from 'react-icons/hi';

interface Option {
	title: string;
	pathname?: string[];
	href?: string;
	isPrivate?: boolean;
	children?: Option[];
}

/**
 * Array of navigation options.
 * @todo Possibly move this into a config directory.
 */
const options: Option[] = [
	{
		pathname: ['/'],
		title: 'Home',
		href: '/',
	},
	{
		pathname: ['/database', '/database/citizens', '/database/vehicles'],
		title: 'Databases',
		children: [
			{ title: 'Citizens', href: '/database/citizens' },
			{ title: 'Vehicles', href: '/database/vehicles', isPrivate: true },
		],
	},
	{
		pathname: ['/reports'],
		href: '/reports',
		title: 'Reports',
		isPrivate: true,
	},
	{
		pathname: ['/penal-code'],
		href: '/penal-code',
		title: 'Penal Code',
	},
];

/**
 * Navigation component.
 */
const Options: React.FunctionComponent = ({}) => {
	const { status } = useSession();
	const { pathname } = useRouter();

	return (
		<Flex as={'nav'} h='full' gap={2} flex={1} ml='16' align={'center'}>
			{options.map((option, index) => {
				// Determine if the url is the active one.
				const isActiveUrl = option.pathname?.includes(pathname);

				// If the route is private and user isn't logged in return.
				if (status !== 'authenticated' && option.isPrivate) {
					return null;
				}

				// If the option has children create a select menu.
				if (option && option.children && option.children.length >= 1) {
					return (
						<Menu key={index}>
							{({ isOpen }) => {
								return (
									<React.Fragment>
										<MenuButton
											as={Button}
											rightIcon={
												<Icon
													as={HiChevronDown}
													transition='0.25s ease-in-out'
													mt='0.5'
													transform={`rotate(${
														isOpen ? '180' : '0'
													}deg)`}
												/>
											}
											variant={
												isActiveUrl
													? 'outline'
													: 'ghost'
											}
											size='sm'
										>
											{option.title}
										</MenuButton>
										<MenuList bg='brand.700'>
											{/* @ts-ignore */}
											{option.children.map((o) => {
												if (
													status !==
														'authenticated' &&
													o.isPrivate
												) {
													return null;
												}

												return (
													<Link href={o.href || '/'}>
														<MenuItem>
															{o.title}
														</MenuItem>
													</Link>
												);
											})}
										</MenuList>
									</React.Fragment>
								);
							}}
						</Menu>
					);
				}

				// Return a normal options if no chilren.
				return (
					<Link href={option.href || '/'} key={index}>
						<Button
							variant={isActiveUrl ? 'outline' : 'ghost'}
							size='sm'
						>
							{option.title}
						</Button>
					</Link>
				);
			})}
		</Flex>
	);
};

export default Options;
