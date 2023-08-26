import { useRouter } from 'next/router';
import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from 'react';
import axios from '../../../utils/axios';
import { getCookie, setCookie } from '../../../utils/cookie';
import getConfig from 'next/config';
import { useUser } from '../context/UserContext';
import { refetch } from '../context/action';

const { publicRuntimeConfig } = getConfig();

const useLogout = (): { mutate: Dispatch<SetStateAction<boolean>> } => {
    const router = useRouter();
    const [mutate, setMutate] = useState(false);
    const { dispatch } = useUser();
    const logout = useCallback(async () => {
        try {
            await axios.post('/sanctum/logout', undefined, {
                headers: {
                    Authorization: `Bearer ${getCookie(
                        'shenovid-token',
                        document.cookie
                    )}`,
                },
            });
            setCookie('shenovid-token', '', 365, publicRuntimeConfig.domain);
        } catch (error) {}
        dispatch(refetch(true));
        /dashboard/.test(router.asPath) && router.push('/');

        setMutate(false);
    }, [dispatch, router]);
    useEffect(() => {
        mutate && logout();
    }, [logout, mutate]);

    return {
        mutate: setMutate,
    };
};

export default useLogout;
