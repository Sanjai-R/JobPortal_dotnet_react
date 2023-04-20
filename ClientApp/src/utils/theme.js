import { extendTheme } from "@chakra-ui/react";

const overrides = {
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },

  styles: {
    global: {
      body: {
        bg: "gray.100",
      },
      "::-webkit-scrollbar": {
        width: "0.4em",
        backgroundColor: "#F7FAFC", // Set the background color of the scrollbar track
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "#CBD5E0", // Set the color of the scrollbar thumb
      },
      "::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#A0AEC0", // Set the color of the scrollbar thumb on hover
      },
    },
  },
};
const theme = extendTheme(overrides);

export default theme;
