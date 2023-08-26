import { Box, Typography } from '@mui/material';
import Avatar from '../../../avatar/Avatar';
import { useUser } from '../../context/UserContext';

const UserBox = () => {
    const { store } = useUser();
    return (
        <Box display={'flex'} alignItems={'center'}>
            <Avatar
                imageProps={{
                    src: store.user?.media_urls.avatars?.main || '',
                    alt: '',
                    width: 32,
                    height: 32,
                }}
            />
            <Box sx={{ mr: 1 }}>
                <Typography
                    sx={{ lineHeight: '9px' }}
                    color={'text.dark'}
                    variant={'subtitle2'}>
                    {`${store.user?.first_name || ''} ${
                        store.user?.last_name || ''
                    }`}
                </Typography>
                <Typography
                    sx={{ mt: 0.5 }}
                    color={'text.light'}
                    variant={'caption'}>
                    {store.user?.phone || store.user?.email || ''}
                </Typography>
            </Box>
        </Box>
    );
};

export default UserBox;
