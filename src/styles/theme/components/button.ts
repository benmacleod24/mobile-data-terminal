import { ComponentStyleConfig } from '@chakra-ui/react';

export const Button: ComponentStyleConfig = {
	variants: {
		'brand.blue': {
			bg: 'blue.800',
			_hover: {
				bg: 'blue.700',
			},
			_focus: {
				bg: 'blue.900',
			},
		},
		'brand.yellow': {
			bg: 'yellow.800',
			_hover: {
				bg: 'yellow.700',
			},
			_focus: {
				bg: 'yellow.900',
			},
		},
		link: {
			border: 'none',
		},
		ghost: {
			border: 'none',
		},
	},
	baseStyle: {
		border: '1px solid',
		borderColor: 'whiteAlpha.400',
	},
};
