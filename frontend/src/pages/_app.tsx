import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

// APOLLO
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

// MUI
import { Roboto } from 'next/font/google';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});
const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/',
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
