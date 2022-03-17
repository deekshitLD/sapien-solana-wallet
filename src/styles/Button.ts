import type { ComponentStyleConfig } from "@chakra-ui/theme";

// You can also use the more specific type for
// a single part component: ComponentSingleStyleConfig
export const Button: ComponentStyleConfig = {
  // The styles all button have in common
  baseStyle: {
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    borderRadius: "base", // <-- border radius is same for all variants and sizes
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: "md",
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      color: "white",
      _hover: { bg: "#444", color: "white" },
    },
    solid: {
      color: "white",
    },
  },
  // The default size and variant values
  defaultProps: {
    //   @ts-ignore
    size: "md",
    //   @ts-ignore
    variant: "outline",
  },
};
