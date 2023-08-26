import { Box, Divider, Paper, Skeleton, SxProps, Theme } from '@mui/material';

const CourseSkeletonCard: React.FC<{ sx?: SxProps<Theme> }> = ({ sx }) => {
    return (
        <Paper
            sx={[
                {
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    p: '9px',
                    width: 240,
                    minWidth: 240,
                    height: 230,
                    justifyContent: 'space-between',
                    borderRadius: 2,
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}>
            <Skeleton
                animation={'wave'}
                variant='rectangular'
                width={'100%'}
                height={126}
                sx={{ borderRadius: 2 }}
            />
            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}>
                <Skeleton
                    animation={'wave'}
                    variant='text'
                    width={44}
                    height={14}
                />
                <Skeleton
                    animation={'wave'}
                    variant='text'
                    width={72}
                    height={12}
                />
            </Box>
            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}>
                <Skeleton
                    animation={'wave'}
                    variant='text'
                    width={88}
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
        </Paper>
    );
};

export default CourseSkeletonCard;
