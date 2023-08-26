import { Box, CircularProgress, Typography } from '@mui/material';
import { UserActionProps } from '../../UserAction';
import Avatar from '../../../../avatar/Avatar';
import { useUser } from '../../../context/UserContext';
import { showLoginDialog } from '../../../context/action';
import CartButton from '../../cart/CartButton';

const MobileUserAction: React.FC<UserActionProps> = ({ loginButtonState }) => {
    const { store, dispatch } = useUser();
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
                    dispatch(showLoginDialog(true));
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
                            src: store.user?.media.avatarUri ?? '/not-found',
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
