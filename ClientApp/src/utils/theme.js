import { extendTheme } from '@chakra-ui/react';

const overrides = {
    fonts: {
        heading: `'Poppins', sans-serif`,
        body: `'Poppins', sans-serif`,
    },

};
const theme = extendTheme(overrides);

export default theme;