import { Button, Icon, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import * as React from 'react';
import { HiChevronDown } from 'react-icons/hi';

interface DropdownProps {
	title: string;
}

const Dropdown: React.FunctionComponent<
	React.PropsWithChildren<DropdownProps>
> = ({ title, children }) => {
	return (
		<Menu>
			{({ isOpen }) => {
				return (
					<React.Fragment>
						<MenuButton
							as={Button}
							size='sm'
							rightIcon={
								<Icon
									as={HiChevronDown}
									transition='0.25s ease-in-out'
									transform={`rotate(${
										isOpen ? '180' : '0'
									}deg)`}
								/>
							}
						>
							{title}
						</MenuButton>
						<MenuList bg='brand.700'>{children}</MenuList>
					</React.Fragment>
				);
			}}
		</Menu>
	);
};

export default Dropdown;
