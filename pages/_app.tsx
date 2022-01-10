import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { FC, ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { AppProvider } from "../src/context/app";

// Use require instead of import, and order matters
require("../styles/globals.css");
require("@solana/wallet-adapter-react-ui/styles.css");

const WalletConnectionProvider = dynamic<{ children: ReactNode }>(
  () =>
    import("../components/WalletConnectionProvider").then(
      ({ WalletConnectionProvider }) => WalletConnectionProvider
    ),
  {
    ssr: false,
  }
);

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [selectedNews, setSelectedNews] = useState(null);
  return (
    <WalletConnectionProvider>
      <WalletModalProvider>
        <ChakraProvider>
          <AppProvider value={{ selectedNews, setSelectedNews }}>
            <Component {...pageProps} />
          </AppProvider>
        </ChakraProvider>
      </WalletModalProvider>
    </WalletConnectionProvider>
  );
};

export default App;
