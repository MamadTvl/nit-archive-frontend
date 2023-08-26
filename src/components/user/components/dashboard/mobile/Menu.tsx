import { Backdrop, Button, Divider } from '@mui/material';
import { Box } from '@mui/system';
import { Dispatch, SetStateAction } from 'react';
import CourseIcon from '../../../../icons/CourseIcon';
import BlogIcon from '../../../../icons/BlogIcon';
import InfoIcon from '../../../../icons/InfoIcon';
import ExitIcon from '../../../../icons/ExitIcon';
import PlaylistIcon from '../../../../icons/PlaylistIcon';
import { useUser } from '../../../context/UserContext';
import { DashboardItem } from '../types';
import UserBox from '../UserBox';
import HandshakeIcon from '../../../../icons/HandshakeIcon';
import PhoneIcon from '../../../../icons/PhoneIcon';
import ItemBox from '../ItemBox';
import SkipIcon from '../../../../icons/SkipIcon';
import { showLoginDialog } from '../../../context/action';
import Link from '../../../../link/Link';
import useLogout from '../../../hooks/useLogout';

const Menu: React.FC<Props> = ({ open, setOpen }) => {
    const { store, dispatch } = useUser();
    const { mutate } = useLogout();
    const authorizedDashboardItems: DashboardItem[] = [
        {
            title: 'دوره‌های من',
            icon: <CourseIcon />,
            href: '/dashboard/my-courses',
            action: () => setOpen(false),
        },
        {
            title: 'اطلاعات کاربری',
            icon: <InfoIcon />,
            href: '/dashboard/info',
            action: () => setOpen(false),
        },
    ];
    const publicDashboardItems: DashboardItem[] = [
        {
            title: 'دوره‌ها',
            icon: <PlaylistIcon />,
            href: '/courses',
            action: () => setOpen(false),
        },
        {
            title: 'همکاری با ما',
            icon: <HandshakeIcon />,
            href: '/work-with-us',
            action: () => setOpen(false),
        },
        {
            title: 'تماس با ما',
            icon: <PhoneIcon />,
            href: '/contact-us',
            action: () => setOpen(false),
        },
    ];

    const exitItem: DashboardItem = {
        title: 'خروج از حساب',
        icon: <ExitIcon />,
        action: () => {
            mutate(true);
            setOpen(false);
        },
    };
    return (
        <>
            <Box
                onClick={() => setOpen(false)}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                position={'absolute'}
                top={6}
                right={0}
                sx={{
                    width: 32,
                    height: 32,
                    border: '1px solid',
                    borderColor: 'text.secondary',
                    '& svg': {
                        width: 12,
                        height: 12,
                    },
                    zIndex: 2000,
                    borderRadius: 1,
                    cursor: 'pointer',

                    backgroundColor: '#fff',
                    transition: '.2s all',
                }}
                style={{
                    transform: open ? 'scale(1)' : 'scale(0)',
                    visibility: open ? 'visible' : 'hidden',
                }}>
                <SkipIcon />
            </Box>
            <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}
                position={'absolute'}
                top={54}
                sx={{
                    transition: 'all .3s',
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    p: 1.5,
                    pb: 2,
                    width: 236,
                    border: '1px solid',
                    borderColor: 'text.dark',
                    zIndex: 2000,
                    transformOrigin: 'top right',
                }}
                style={{
                    height: store.isLoggedIn ? 418 : 249,
                    visibility: open ? 'visible' : 'hidden',
                    transform: open ? 'scale(1)' : 'scale(0)',
                }}>
                {store.isLoggedIn ? (
                    <UserBox />
                ) : (
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'space-between'}>
                        <Button
                            onClick={() => {
                                setOpen(false);
                                dispatch(showLoginDialog(true));
                            }}
                            sx={{ width: 100, height: 32, borderRadius: 1 }}
                            variant={'contained'}
                            color={'secondary'}>
                            {'ثبت‌نام'}
                        </Button>
                        <Button
                            onClick={() => {
                                setOpen(false);
                                dispatch(showLoginDialog(true));
                            }}
                            sx={{ width: 100, height: 32, borderRadius: 1 }}
                            variant={'outlined'}
                            color={'secondary'}>
                            {'ورود'}
                        </Button>
                    </Box>
                )}
                <Divider
                    sx={{
                        borderColor: 'text.light',
                        mt: '-10px',
                    }}
                />
                {store.isLoggedIn && (
                    <>
                        {authorizedDashboardItems.map((item, index) => (
                            <Link key={index} href={item.href || ''}>
                                <ItemBox item={item} />
                            </Link>
                        ))}
                        <Divider
                            sx={{
                                borderColor: 'text.light',
                            }}
                        />
                    </>
                )}
                {publicDashboardItems.map((item, index) => (
                    <Link key={index} href={item.href || ''}>
                        <ItemBox item={item} />
                    </Link>
                ))}
                {store.isLoggedIn && (
                    <>
                        <Divider
                            sx={{
                                borderColor: 'text.light',
                            }}
                        />
                        <ItemBox item={exitItem} />
                    </>
                )}
            </Box>
            <Backdrop
                onClick={() => setOpen(false)}
                sx={{ zIndex: 1 }}
                open={open}
            />
        </>
    );
};

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export default Menu;
