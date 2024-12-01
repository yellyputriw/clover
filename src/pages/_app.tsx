import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { NextPage } from 'next';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import { Inter } from 'next/font/google';
import type { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <div className={`${inter.variable} font-sans`}>
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}
