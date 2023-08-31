import { IconButton, Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useMemo } from 'react';
import EditIcon from '../../../../icons/EditIcon';
import { InfoBoxProps, UserInfoType } from '../types';
import useSwr from 'swr';
import { Api } from '@/api/index';

const InfoBox: React.FC<InfoBoxProps> = ({ title, editable, onEdit, type }) => {
    const { data: info, isLoading } = useSwr('my-info', () =>
        Api.Instance.getUserInfo()
    );

    const data = useMemo(() => {
        if (!info) {
            return undefined;
        }
        const user = info.user;
        switch (type) {
            case UserInfoType.NAME:
                return `${user.firstName || ''} ${user?.lastName || ''}`;
            case UserInfoType.EMAIL:
                return user.email || null;
            case UserInfoType.PHONE:
                return user.phone || null;
            case UserInfoType.PASSWORD:
                return '********';
        }
    }, [info, type]);

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
                {isLoading ? (
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
