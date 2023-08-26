import { IconButton, Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useMemo } from 'react';
import EditIcon from '../../../../icons/EditIcon';
import { useUser } from '../../../context/UserContext';
import { InfoBoxProps, UserInfoType } from '../types';

const InfoBox: React.FC<InfoBoxProps> = ({ title, editable, onEdit, type }) => {
    const { store } = useUser();

    const data = useMemo(() => {
        if (!store.isLoading && store.isLoggedIn) {
            switch (type) {
                case UserInfoType.NAME:
                    return `${store.user?.first_name || ''} ${
                        store.user?.last_name || ''
                    }`;
                case UserInfoType.EMAIL:
                    return store.user?.email || null;
                case UserInfoType.PHONE:
                    return store.user?.phone || null;
                case UserInfoType.PASSWORD:
                    return '********';
            }
        } else {
            return undefined;
        }
    }, [
        store.isLoading,
        store.isLoggedIn,
        store.user?.email,
        store.user?.first_name,
        store.user?.last_name,
        store.user?.phone,
        type,
    ]);

    return (
        <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            sx={{
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: 2,
                p: 1.75,
                pt: 0.75,
                height: 80,
            }}>
            <Box
                display={'flex'}
                flexDirection={'column'}
                height={'100%'}
                justifyContent={'space-between'}>
                <Typography variant='body1' color='text.dark'>
                    {title}
                </Typography>
                {store.isLoading || !store.isLoggedIn ? (
                    <Skeleton width={40} height={16} />
                ) : (
                    <Typography variant='body1' color='text.primary'>
                        {data || '-'}
                    </Typography>
                )}
            </Box>
            {editable && (
                <IconButton onClick={onEdit}>
                    <EditIcon />
                </IconButton>
            )}
        </Box>
    );
};

export default InfoBox;
