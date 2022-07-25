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
import Script from "next/script";
// glib.js
export const GA_TRACKING_ID = process.env["NEXT_PUBLIC_GOOGLE_ANALYTICS"]
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
        src={`https://www.googletagmanager.com/gtag/js?id=G-WDND2N05K9`}/>

      <Script id="google-analytics" strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WDND2N05K9');
         `}
    </Script>
    <script type='text/javascript'>
        {`window.smartlook||(function(d) {
          var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
          var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
          c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
          })(document);
          smartlook('init', 'e76ca9cc82c02cdc07ead615506798ca9bd94624', { region: 'eu' });
        `}
</script>
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
