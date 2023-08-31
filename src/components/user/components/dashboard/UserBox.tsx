import { Box, Typography } from '@mui/material';
import Avatar from '../../../avatar/Avatar';
import { useUserStore } from '../../store/store';

const UserBox = () => {
    const user = useUserStore((s) => s.user);
    const fullName = `${user?.firstName || ''} ${user?.lastName || ''}`;
    return (
        <Box display={'flex'} alignItems={'center'}>
            <Avatar
                imageProps={{
                    src: user?.media.avatarUri || '',
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
                    {fullName}
                </Typography>
                <Typography
                    sx={{ mt: 0.5 }}
                    color={'text.light'}
                    variant={'caption'}>
                    {user?.username}
                </Typography>
            </Box>
        </Box>
    );
};

export default UserBox;
