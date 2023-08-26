import React from 'react';
import PropTypes from 'prop-types';
import {
    createTheme,
    ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import { useRouter } from 'next/router';
import { themeInitialOptions } from '..';

export const DispatchContext = React.createContext(() => {
    throw new Error('Forgot to wrap component in `ThemeProvider`');
});

if (process.env.NODE_ENV !== 'production') {
    DispatchContext.displayName = 'ThemeDispatchContext';
}

export function ThemeProvider(props) {
    const router = useRouter();
    const { children } = props;
    const [themeOptions, dispatch] = React.useReducer(
        (state, action) => {
            switch (action.type) {
                case 'CHANGE':
                    return {
                        ...state,
                        direction: action.payload.direction || state.direction,
                    };
                default:
                    throw new Error(`Unrecognized type ${action.type}`);
            }
        },
        { ...themeInitialOptions }
    );

    const theme = React.useMemo(() => {
        return createTheme(
            {
                ...themeOptions,
            },
            { index: 1 }
        );
    }, [themeOptions]);

    return (
        <MuiThemeProvider theme={theme}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </MuiThemeProvider>
    );
}

ThemeProvider.propTypes = {
    children: PropTypes.node,
};

export function useChangeTheme() {
    const dispatch = React.useContext(DispatchContext);
    return React.useCallback(
        (options) => dispatch({ type: 'CHANGE', payload: options }),
        [dispatch]
    );
}
