import { ThemeOptions } from '@mui/material';
import './theme';

export const themeInitialOptions: ThemeOptions = {
    direction: 'rtl',
    breakpoints: {
        values: {
            xs: 0,
            sm: 750,
            md: 900,
            lg: 1200,
            xl: 1366,
        },
    },
    palette: {
        primary: {
            dark: '#1A9E91',
            main: '#2CDDCB',
            light: '#73E8DC',
            lightest: '#EDFCFB',
        },
        secondary: {
            dark: '#7A0018',
            main: '#FF6584',
            light: '#FFD6DE',
            lightest: '#FFF4F6',
        },
        text: {
            primary: '#1B1725',
            secondary: '#444444',
            dark: '#737373',
            light: '#B0B0B0',
            BG: '#E8E8E8',
            disabled: '#C4C4C4',
        },
        success: {
            main: '#00A76B',
        },
        warning: {
            main: '#FF9838',
        },
        error: {
            main: '#EF2253',
        },
        golden: {
            main: '#FFDE00',
        },
        hyperlink: {
            main: '#31A8FF',
        },
        background: {
            default: '#FFFFFF',
            paper: '#F6F6F6',
        },
    },
    typography: {
        fontFamily: 'iranyekan',
        button: {
            fontSize: '16px',
            fontWeight: 800,
            '@media (max-width:750px)': {
                fontSize: '14px',
            },
        },
        subtitle2: {
            fontSize: '12px',
            fontWeight: 700,
        },
        caption: {
            fontSize: '10px',
            fontWeight: 'normal',
        },
        h6: {
            fontSize: '16px',
            fontWeight: 'normal',
            '@media (max-width:750px)': {
                fontSize: '12px',
            },
        },
        h5: {
            fontSize: '18px',
            fontWeight: 700,
            '@media (max-width:750px)': {
                fontSize: '14px',
                fontWeight: 800,
            },
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    direction: 'rtl',
                    fontFamily: 'iranyekan',
                    '@media (max-width:600px)': {
                        fontFamily: 'iranyekan',
                    },
                },
                html: {
                    scrollBehavior: 'smooth',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }) => ({
                    borderRadius: '8px',
                    height: 44,
                    borderColor: theme.palette.text.dark,
                }),
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {},
            },
            variants: [
                // {
                //     props: { variant: 'outlined' },
                //     style: ({ theme }) => {
                //         return {
                //             border: `1px solid ${theme.palette.text.dark}`,
                //             borderRadius: '8px',
                //             background: theme.palette.background.default,
                //             '&:hover': {
                //                 border: `1px solid ${theme.palette.text.secondary}`,
                //             },
                //         };
                //     },
                // },
            ],
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                outlinedPrimary: {},
            },
            variants: [
                {
                    props: { variant: 'contained' },
                    style: ({ theme }) => ({
                        color: '#fff',
                        height: 64,
                        borderRadius: 8,
                        ...theme.typography.button,
                    }),
                },
                {
                    props: { variant: 'outlined', color: 'primary' },
                    style: ({ theme }) => ({
                        height: 64,
                        borderRadius: 8,
                        ...theme.typography.button,
                    }),
                },
            ],
        },
        MuiTypography: {
            variants: [
                {
                    props: { variant: 'h1' },
                    style: ({ theme }) => {
                        return {
                            fontSize: '36px',
                            fontWeight: 800,
                            [theme.breakpoints.down('sm')]: {
                                fontSize: '24px',
                            },
                        };
                    },
                },
                {
                    props: { variant: 'h2' },
                    style: ({ theme }) => {
                        return {
                            fontSize: '30px',
                            fontWeight: 800,
                            [theme.breakpoints.down('sm')]: {
                                fontSize: '20px',
                            },
                        };
                    },
                },
                {
                    props: { variant: 'h3' },
                    style: ({ theme }) => {
                        return {
                            fontSize: '24px',
                            fontWeight: 800,
                            [theme.breakpoints.down('sm')]: {
                                fontSize: '18px',
                            },
                        };
                    },
                },
                {
                    props: { variant: 'h4' },
                    style: ({ theme }) => {
                        return {
                            fontSize: '20px',
                            fontWeight: 800,
                            [theme.breakpoints.down('sm')]: {
                                fontSize: '16px',
                            },
                        };
                    },
                },
                {
                    props: { variant: 'h5' },
                    style: ({ theme }) => {
                        return {
                            fontSize: '18px',
                            fontWeight: 700,
                            [theme.breakpoints.down('sm')]: {
                                fontSize: '14px',
                                fontWeight: 800,
                            },
                        };
                    },
                },
                {
                    props: { variant: 'h6' },
                    style: ({ theme }) => {
                        return {
                            fontSize: '16px',
                            fontWeight: 'normal',
                            [theme.breakpoints.down('sm')]: {
                                fontSize: '12px',
                            },
                        };
                    },
                },
                {
                    props: { variant: 'subtitle1' },
                    style: ({ theme }) => {
                        return {
                            fontSize: '18px',
                            fontWeight: 'normal',
                            [theme.breakpoints.down('sm')]: {
                                fontSize: '16px',
                            },
                        };
                    },
                },
                {
                    props: { variant: 'subtitle2' },
                    style: ({ theme }) => {
                        return {
                            fontSize: '12px',
                            fontWeight: 700,
                        };
                    },
                },
                {
                    props: { variant: 'body1' },
                    style: ({ theme }) => {
                        return {
                            fontSize: '16px',
                            fontWeight: 'normal',
                            lineHeight: '26px',
                            [theme.breakpoints.down('sm')]: {
                                fontSize: '14px',
                            },
                        };
                    },
                },
                {
                    props: { variant: 'body2' },
                    style: ({ theme }) => {
                        return {
                            fontSize: '14px',
                            fontWeight: 'normal',
                            lineHeight: '24px',
                            [theme.breakpoints.down('sm')]: {
                                fontSize: '12px',
                            },
                        };
                    },
                },
                {
                    props: { variant: 'button' },
                    style: ({ theme }) => {
                        return {
                            fontSize: '16px',
                            fontWeight: 800,
                            [theme.breakpoints.down('sm')]: {
                                fontSize: '14px',
                            },
                        };
                    },
                },
                {
                    props: { variant: 'caption' },
                    style: ({ theme }) => {
                        return {
                            fontSize: '10px',
                            fontWeight: 'normal',
                        };
                    },
                },
            ],
        },
    },
};
