import { domain } from './config';
import { getCookie, setCookie } from './cookie';

export const getToken = () => {
    if (typeof window === 'undefined') {
        return '';
    }
    return 'Bearer ' + getCookie('_NIT_token', document.cookie);
};

export const setToken = (token: string) => {
    if (typeof window === 'undefined') {
        return;
    }
    setCookie('_NIT_token', token, 365, domain);
};
