declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        };
    }
    // allow configuration using `createTheme`
    interface Palette {
        golden?: PaletteColorOptions;
        hyperlink?: PaletteColorOptions;
    }

    interface PaletteOptions {
        golden?: PaletteColorOptions;
        hyperlink?: PaletteColorOptions;
    }
    interface ThemeOptions {
        status?: {
            danger?: string;
        };
    }
    interface PaletteColorOptions {
        dark?: string;
        main?: string;
        light?: string;
        lightest?: string;
    }


    interface TypeText {
        primary: string;
        secondary: string;
        dark: string;
        light: string;
        BG: string;
    }


}
export {};
