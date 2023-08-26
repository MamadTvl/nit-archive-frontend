import { Box } from '@mui/material';
import { FC } from 'react';
import Footer from './footer';
import Header from './header';

const Layout: FC<{ children: any }> = (props) => {
    return (
        <>
            <Header />
            <Box
                sx={{
                    width: '100%',
                    height: 30,
                    display: { xs: 'block', sm: 'none' },
                }}
            />
            <Box
                component={'main'}
                sx={(theme) => ({
                    overflow: 'hidden',
                    // padding: '0 120px',

                    [theme.breakpoints.up('xl')]: {
                        '& section': {
                            maxWidth: 1366,
                            m: 'auto',
                            pl: '120px',
                            pr: '120px',
                        },
                    },
                    [theme.breakpoints.down('xl')]: {
                        pl: '120px',
                        pr: '120px',
                    },
                    [theme.breakpoints.down('lg')]: {
                        pl: '40px',
                        pr: '40px',
                    },
                    [theme.breakpoints.down('md')]: {
                        pl: '20px',
                        pr: '20px',
                    },
                })}>
                {props.children}
            </Box>
            <Footer />
        </>
    );
};

export default Layout;
