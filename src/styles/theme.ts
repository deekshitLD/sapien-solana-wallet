import { extendTheme } from "@chakra-ui/react";
import { Button } from "./Button";
// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      greyDark: "#1E1E1E",
      greyBorder: "#555555",
      greyText: "#696969",
      grey: "#9A9A9A",
      primaryBG: "#5B5B5B",
      primaryRed: "#FF0000",
      purpleLight: "#DED9FF",
      purpleDark: "#4C4096",
      white: "#FFFFFF",
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
      100: "#f7fafc",
      // 900: "#1a202c",
      lightBlack: "#242625",
    },
  },
  components: {
    Button: {
      variants: {
        white: {
          bg: "white",
          _hover: {
            background: "rgba(255, 255, 255, 0.5)",
          },
        },
        transparent: {
          bg: "white",
          color: "white",
          background: "rgba(255, 255, 255, 0.3)",
          _hover: {
            background: "rgba(255, 255, 255, 0.4)",
          },
        },
        red: {
          bg: "red",
          color: "white",
          _hover: {
            background: "rgba(255, 0, 0, 0.8)",
          },
        },
      },
    },
  },
  // components: {
  //   Button,
  // },
  fonts: {
    heading: "Playfair Display",
    body: "Playfair Display",
  },
});
