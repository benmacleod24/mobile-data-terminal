import { extendTheme } from '@chakra-ui/react';
import { components } from './components';

// Theme Imports
import { config } from './config';
import { colors } from './config/colors';
import { styles } from './config/global-styles';

const theme = extendTheme({ config, colors, styles, components });

// Expor theme as default
export default theme;
