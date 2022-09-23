import Header from '@/components/Header';
import { Flex } from '@chakra-ui/react';
import * as React from 'react';

interface CitizensProps {}

const Citizens: React.FunctionComponent<CitizensProps> = ({}) => {
	return (
		<Flex flexDir={'column'} h='100vh' w='100vw' align={'center'}>
			<Header />
			<Flex w='container.lg' pt='5'></Flex>
		</Flex>
	);
};

export default Citizens;
