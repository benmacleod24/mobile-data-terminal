import { Flex } from '@chakra-ui/react';
import * as React from 'react';

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = ({}) => {
	return (
		<Flex
			as={'header'}
			w='full'
			minH='7.5vh'
			maxH='7.5vh'
			bg='brand.700'
		></Flex>
	);
};

export default Header;
