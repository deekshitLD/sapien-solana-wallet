import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { FC, ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { AppProvider } from "../src/context/app";
import WithAuth from "../src/components/HOC/withAuth";
import "../src/api/interceptor";
import { theme } from "../src/styles/theme";
import { NextPage } from "next";
//next script import. Yet to check dependency section
import Script from "next/script";
// Use require instead of import, and order matters
require("../styles/globals.css");
require("@solana/wallet-adapter-react-ui/styles.css");

const WalletConnectionProvider = dynamic<{ children: ReactNode }>(
  () =>
    import("../src/components/WalletConnectionProvider").then(
      ({ WalletConnectionProvider }) => WalletConnectionProvider
    ),
  {
    ssr: false,
  }
);

const App: FC<AppProps> = ({ Component, pageProps }: any) => {
  const [selectedNews, setSelectedNews] = useState(null);
  const getLayout = Component.getLayout || ((page: NextPage) => page);

  return (
    <>
    <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}/>

      <Script id="google-analytics" strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}',{
              page_path: window.location.pathname,
            });
         `}
    </Script>
    <WalletConnectionProvider>
      <WalletModalProvider>
        <ChakraProvider theme={theme}>
          <AppProvider value={{ selectedNews, setSelectedNews }}>
            <WithAuth>{getLayout(<Component {...pageProps} />)}</WithAuth>
          </AppProvider>
        </ChakraProvider>
      </WalletModalProvider>
    </WalletConnectionProvider>
    </>
  );
};

export default App;
