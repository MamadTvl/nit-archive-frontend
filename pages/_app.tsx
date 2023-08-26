import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '../src/theme/context/ThemeContext';
import CssBaseline from '@mui/material/CssBaseline';
import { EmotionCache } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';
import Layout from '../src/components/layout';
import NProgress from 'nprogress';
import Router from 'next/dist/client/router';
import 'swiper/css';
import '../styles/globals.css';
import '../styles/font.css';
import '../styles/video.css';
import '../styles/nprogress.css';
import ProvideUser from '../src/components/user/context/UserContext';
import { SnackbarProvider } from 'notistack';
import Script from 'next/script';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

Router.events.on('routeChangeStart', () => {
    NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
    NProgress.done();
});

Router.events.on('routeChangeError', () => {
    NProgress.done();
});

export default function MyApp(props: MyAppProps) {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps,
    } = props;
    return (
        <>
            <Head>
                <meta
                    name='viewport'
                    content='initial-scale=1, width=device-width'
                />
                <link rel='icon' href='/favicon/favicon.ico' />

                <link
                    rel='icon'
                    type='image/png'
                    href='/favicon/favicon-16x16.png'
                    sizes='16x16'
                />
                <link
                    rel='icon'
                    type='image/png'
                    href='/favicon/favicon-32x32.png'
                    sizes='32x32'
                />
                <link
                    rel='icon'
                    type='image/png'
                    href='/favicon/android-chrome-192x192.png'
                    sizes='192x192'
                />
                <link
                    rel='icon'
                    type='image/png'
                    href='/favicon/android-chrome-512x512.png'
                    sizes='512x512'
                />

                <link
                    rel='apple-touch-icon'
                    href='/favicon/apple-touch-icon.png'
                    sizes='180x180'
                />

                <link
                    rel='shortcut icon'
                    href='/favicon/android-chrome-512x512.png'
                    sizes='192x192'
                />
                <meta
                    name='apple-mobile-web-app-status-bar-style'
                    content='default'
                />
            </Head>
            <ThemeProvider>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <ProvideUser>
                    {/* @ts-ignore*/}
                    <SnackbarProvider
                        preventDuplicate
                        maxSnack={3}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}>
                        <Layout>
                            {/* @ts-ignore */}
                            <Component {...pageProps} />
                        </Layout>
                    </SnackbarProvider>
                </ProvideUser>
            </ThemeProvider>
        </>
    );
}
