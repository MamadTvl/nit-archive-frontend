import { useMemo } from 'react';
import { useUser } from '../context/UserContext';
import { getCookie } from '../../../utils/cookie';
import DesktopUserAction from './user-action/desktop';
import MobileUserAction from './user-action/mobile';

export type loginButtonStateType = 'login' | 'logout' | 'loading';

const UserAction = () => {
    const { store } = useUser();
    const loginButtonState: loginButtonStateType = useMemo(() => {
        let token;
        if (typeof document !== 'undefined') {
            token = getCookie('shenovid-token', document.cookie);
        }
        if (!token || (!store.isLoggedIn && !store.isLoading)) {
            return 'logout';
        }
        if (store.isLoggedIn && !store.isLoading) {
            return 'login';
        }
        return 'loading';
    }, [store.isLoggedIn, store.isLoading]);

    return (
        <>
            <DesktopUserAction loginButtonState={loginButtonState} />
            <MobileUserAction loginButtonState={loginButtonState} />
        </>
    );
};

export interface UserActionProps {
    loginButtonState: loginButtonStateType;
}

export default UserAction;
