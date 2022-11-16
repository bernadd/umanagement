import "normalize.css";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient, Hydrate } from "react-query";
import { ReactElement, ReactNode, useState } from "react";
import { NextPage } from "next";
import { GlobalStyles } from "../styles/globalStyles";
import { ThemeProvider } from "@/styles/theme/ThemeProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider>
          <GlobalStyles />
          {getLayout(<Component {...pageProps} />)}
          <ToastContainer />
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
