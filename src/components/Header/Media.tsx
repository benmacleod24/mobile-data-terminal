import * as React from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';

interface MediaProps {}

const Media: React.FunctionComponent<MediaProps> = ({}) => {
	return (
		<Flex h='full' align={'center'}>
			<Image src='https://i.imgur.com/AHFKtEZ.png' w='auto' h='75%' />
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
		</Flex>
	);
};

export default Media;
