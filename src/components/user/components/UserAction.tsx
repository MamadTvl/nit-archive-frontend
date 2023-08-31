import { useEffect, useMemo } from 'react';
import DesktopUserAction from './user-action/desktop';
import MobileUserAction from './user-action/mobile';
import { useUserStore } from '../store/store';
import { Api } from '@/api/index';

export type loginButtonStateType = 'login' | 'logout' | 'loading';

const UserAction = () => {
    const [user, setUser, loading] = useUserStore((s) => [
        s.user,
        s.setUser,
        s.loading,
    ]);
    const loginButtonState: loginButtonStateType = useMemo(() => {
        if (loading) {
            return 'loading';
        }
        if (user) {
            return 'login';
        }
        return 'logout';
    }, [user, loading]);

    useEffect(() => {
        setUser();
        Api.Instance.getUserCourses().then((c) => {
            console.log(c);
        });
    }, [setUser]);

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
