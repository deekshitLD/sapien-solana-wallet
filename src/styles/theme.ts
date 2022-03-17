import { extendTheme } from "@chakra-ui/react";
import { Button } from "./Button";
// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
      lightBlack: "#242625",
    },
  },
  components: {
    Button,
  },
  fonts: {
    heading: "Playfair Display",
    body: "Playfair Display",
  },
});
