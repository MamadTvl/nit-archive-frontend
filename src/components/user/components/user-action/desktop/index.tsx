import { Box, Button, CircularProgress } from '@mui/material';
import ProfileIcon from '../../../../icons/ProfileIcon';
import DownArrowIcon from '../../../../icons/DownArrowIcon';
import Menu from '../../dashboard/desktop/Menu';
import { UserActionProps } from '../../UserAction';
import { useUserStore } from '@/components/user/store/store';

const DesktopUserAction: React.FC<UserActionProps> = ({ loginButtonState }) => {
    const [user, openLoginDialog] = useUserStore((s) => [
        s.user,
        s.openLoginDialog,
    ]);
    const menuStyle: React.CSSProperties | undefined =
        loginButtonState !== 'login'
            ? {
                  visibility: 'hidden',
                  opacity: 0,
              }
            : undefined;
    return (
        <Box
            sx={(theme) => ({
                [theme.breakpoints.down('sm')]: {
                    display: 'none',
                    visibility: 'hidden',
                },
            })}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            {loginButtonState === 'logout' ? (
                <Button
                    onClick={() => {
                        openLoginDialog(true);
                    }}
                    variant='text'
                    sx={{ color: 'text.secondary', mr: 0.5, typography: 'h6' }}>
                    {'ورود یا ثبت‌نام'}
                </Button>
            ) : (
                <>
                    <Box
                        onClick={() => {}}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        position={'relative'}
                        sx={(theme) => ({
                            backgroundColor: 'text.BG',
                            height: 28,
                            width: 106,
                            borderRadius: 1,
                            pl: 1,
                            pr: 1,
                            cursor: 'pointer',
                            typography: 'subtitle2',
                            color: 'text.primary',
                            transition: '.3s all',
                            '& .profile-icon, .down-arrow': {
                                '& path': {
                                    transition: '.3s all',
                                    fill: theme.palette.text.secondary,
                                },
                            },
                            '&:hover': {
                                backgroundColor: 'primary.lightest',
                                '& .profile-icon, .down-arrow': {
                                    '& path': {
                                        fill: theme.palette.text.primary,
                                    },
                                },
                                '& .dashboard-menu': {
                                    opacity: 1,
                                    visibility: 'visible',
                                },
                                '& .dashboard-space': {
                                    visibility: 'visible',
                                },
                            },
                        })}>
                        <ProfileIcon />
                        {loginButtonState === 'loading' ? (
                            <CircularProgress color={'primary'} size={21} />
                        ) : (
                            user?.firstName || 'پروفایل'
                        )}
                        <DownArrowIcon />
                        <Box
                            className={'dashboard-space'}
                            style={menuStyle}
                            sx={{
                                position: 'absolute',
                                left: 0,
                                visibility: 'hidden',
                                top: 28,
                                width: 212,
                                height: 185,
                                '&: hover': {
                                    '& .dashboard-menu': {
                                        opacity: 1,
                                        visibility: 'visible',
                                    },
                                },
                            }}
                        />
                        <Menu
                            boxProps={{
                                className: 'dashboard-menu',
                                style: menuStyle,
                            }}
                            sx={{
                                cursor: 'default',
                                visibility: 'hidden',
                                opacity: 0,
                                transition: 'all .3s',
                                zIndex: 1200,
                                position: 'absolute',
                                left: 0,
                                top: 28,
                                transform: 'translateY(14px)',
                                '&: hover': {
                                    visibility: 'visible',
                                    opacity: 1,
                                },
                            }}
                        />
                    </Box>
                </>
            )}
        </Box>
    );
};

export default DesktopUserAction;
