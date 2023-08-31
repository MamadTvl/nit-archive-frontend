import { Box, Theme, Typography } from '@mui/material';
import { SxProps } from '@mui/system';
import { useMemo } from 'react';
import { CourseStatus } from '../../types';
import ComingSoonIcon from '../icons/ComingSoonIcon';
import Image from 'next/image';

const CourseChip: React.FC<{ status: CourseStatus | null; sx?: SxProps<Theme> }> = ({
    status,
    sx,
}) => {
    if (!status) {
        return null;
    }

    return (
        <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            position={'absolute'}
            sx={[
                {
                    backgroundColor: status.bgColor,
                    height: 20,
                    maxWidth: 81,
                    padding: '0 6px',
                    borderRadius: 1.5,
                    left: 16,
                    top: 16,
                    zIndex: 1,
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}>
            <Image
                src={status.iconSrc ?? '/not-found'}
                width={15}
                height={15}
                alt=''
            />
            <Typography variant={'caption'} color={'white'} sx={{ mr: 0.5 }}>
                {status.title}
            </Typography>
        </Box>
    );
};

export default CourseChip;
