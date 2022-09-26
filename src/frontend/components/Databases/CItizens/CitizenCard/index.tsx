import Dropdown from '@/frontend/components/Dropdown';
import { Button, Flex, Image, MenuItem, Text } from '@chakra-ui/react';
import { Citizens } from '@prisma/client';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { BsBook, BsPerson } from 'react-icons/bs';

interface CitizenCardProps {
	citizen: Citizens;
}

const CitizenCard: React.FunctionComponent<CitizenCardProps> = ({
	citizen,
}) => {
	// Session Varibles.
	const { data } = useSession();
	const isAuthed = data && data.user && data.user.accountId;

	// Destruct citizen prop.
	const { first_name, last_name, date_of_birth, mugshot } = citizen;

	return (
		<Flex
			border='1px solid #30363d'
			bg='brand.700'
			w='full'
			rounded={'md'}
			overflow='hidden'
		>
			<Image
				src={mugshot}
				w='28'
				h='28'
				objectFit={'cover'}
				objectPosition='center center'
			/>
			<Flex px='3.5' w='full' justify={'space-between'}>
				<Flex flexDir={'column'} justify='center'>
					<Text fontWeight={'bold'}>
						{first_name} {last_name}
					</Text>
					<Text fontSize={'sm'} color='whiteAlpha.500'>
						{dayjs(date_of_birth).format('MM.DD.YYYY')}
					</Text>
				</Flex>
				<Flex justify={'center'} flexDir='column'>
					{!isAuthed && <Button size='sm'>Profile</Button>}
					{isAuthed && (
						<Dropdown title='Actions'>
							<MenuItem icon={<BsPerson />}>
								View Profile
							</MenuItem>
							<MenuItem icon={<BsBook />}>
								Start Booking
							</MenuItem>
						</Dropdown>
					)}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default CitizenCard;
