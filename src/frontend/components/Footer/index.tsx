import { Flex } from '@chakra-ui/react';
import * as React from 'react';

interface FooterProps {}

const Footer: React.FunctionComponent<FooterProps> = ({}) => {
	return (
		<Flex minH='16' maxH='16' bg='brand.700' w='full'>
			<Flex
				h='full'
				align={'center'}
				mx='auto'
				minW='container.xl'
				maxW='container.xl'
			></Flex>
		</Flex>
	);
};

export default Footer;
