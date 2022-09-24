import * as React from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';

interface MediaProps {}

/**
 * Logo and heading for the header.
 */
const Media: React.FunctionComponent<MediaProps> = ({}) => {
	return (
		<Flex h='full' align={'center'} cursor='pointer' userSelect={'none'}>
			<Link href={'/'}>
				<React.Fragment>
					<Image
						src='https://i.imgur.com/AHFKtEZ.png'
						w='auto'
						h='75%'
					/>
					<Flex flexDir={'column'} lineHeight='none' ml='4' gap={1}>
						<Text fontSize={'sm'} color='blue.400'>
							San Andreas
						</Text>
						<Text
							fontSize={'sm'}
							fontWeight='medium'
							color='whiteAlpha.900'
						>
							Mobile Data Terminal
						</Text>
					</Flex>
				</React.Fragment>
			</Link>
		</Flex>
	);
};

export default Media;
