import { Box, CircularProgress, Typography } from '@mui/material';
import { UserActionProps } from '../../UserAction';
import Avatar from '../../../../avatar/Avatar';
import CartButton from '../../cart/CartButton';
import { useUserStore } from '@/components/user/store/store';

const MobileUserAction: React.FC<UserActionProps> = ({ loginButtonState }) => {
    const [user, openLoginDialog] = useUserStore((s) => [
        s.user,
        s.openLoginDialog,
    ]);
    return (
        <Box
            sx={(theme) => ({
                display: 'none',
                [theme.breakpoints.down('sm')]: {
                    display: 'flex',
                    alignItems: 'center',
                },
            })}>
            <Box
                onClick={() => {
                    openLoginDialog(true);
                }}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                sx={{ p: 1, cursor: 'pointer' }}>
                {loginButtonState === 'logout' ? (
                    <Typography variant={'h6'} color={'text.primary'}>
                        {'ورود'}
                    </Typography>
                ) : loginButtonState === 'loading' ? (
                    <CircularProgress size={20} />
                ) : (
                    <Avatar
                        imageProps={{
                            src: user?.media.avatarUri ?? '/not-found',
                            alt: '',
                            width: 20,
                            height: 20,
                        }}
                    />
                )}
            </Box>
        </Box>
    );
};

export default MobileUserAction;
