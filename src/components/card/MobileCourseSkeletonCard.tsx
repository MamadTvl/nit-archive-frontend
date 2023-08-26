import { Box, Divider, Paper, Skeleton, SxProps, Theme } from '@mui/material';

const MobileCourseSkeletonCard: React.FC<{ sx?: SxProps<Theme> }> = ({
    sx,
}) => {
    return (
        <Paper
            sx={[
                {
                    display: 'flex',
                    height: 120,
                    width: 1,
                    p: 2,
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}>
            <Skeleton
                animation={'wave'}
                variant='rectangular'
                height={90}
                width={90}
                sx={{ borderRadius: 2 }}
            />
            <Box
                flexGrow={1}
                sx={{ pr: 2 }}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}>
                <Skeleton
                    animation={'wave'}
                    variant='text'
                    width={90}
                    height={14}
                />
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}>
                    <Skeleton
                        animation={'wave'}
                        variant='text'
                        width={77}
                        height={14}
                    />
                    <Box display={'flex'} alignItems={'center'}>
                        <Skeleton
                            animation={'wave'}
                            variant='text'
                            width={20}
                            height={14}
                            sx={{ ml: 0.5 }}
                        />
                        <Skeleton
                            animation={'wave'}
                            variant={'circular'}
                            width={12}
                            height={12}
                        />
                    </Box>
                </Box>
                <Divider sx={{ color: 'text.light', height: '1px' }} />
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}>
                    <Box display={'flex'} alignItems={'center'}>
                        <Skeleton
                            animation={'wave'}
                            variant={'circular'}
                            width={20}
                            height={20}
                        />
                        <Skeleton
                            animation={'wave'}
                            variant='text'
                            width={44}
                            height={14}
                            sx={{ mr: 1 }}
                        />
                    </Box>
                    <Skeleton
                        animation={'wave'}
                        variant='text'
                        width={44}
                        height={14}
                        sx={{ mr: 0.5 }}
                    />
                </Box>
            </Box>
        </Paper>
    );
};

export default MobileCourseSkeletonCard;
