import { Paper, PaperProps, SxProps, Theme, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Rating } from '../../types';
import Avatar from '../avatar/Avatar';
import Rate from '../styled-components/Rating';

const RatingCard: React.FC<{
    rating: Rating;
    paperProps?: PaperProps;
    sx?: SxProps<Theme>;
}> = ({ rating, paperProps, sx }) => {
    return (
        <Paper
            sx={[
                {
                    height: 153,
                    width: '100%',
                    maxWidth: 498,
                    p: 2.375,
                    pb: 1.75,
                    display: 'flex',
                    borderRadius: 2,
                    flexDirection: 'column',
                    boxSizing: 'border-box',
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...paperProps}>
            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                sx={(theme) => ({
                    [theme.breakpoints.down('sm')]: {
                        flexDirection: 'column',
                    },
                })}>
                <Box
                    sx={{ mt: { xs: 2, sm: 0 } }}
                    display={'flex'}
                    alignItems={'center'}>
                    <Avatar
                        imageProps={{
                            src: rating.user.media.avatarUri || '',
                            width: 36,
                            height: 36,
                        }}
                    />
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        sx={{ display: { sm: 'none' }, mr: 2 }}>
                        <Typography variant='body1' color={'text.dark'}>
                            {`${rating.user.firstName} ${rating.user.lastName}`}
                        </Typography>
                        <Rate size='small' readOnly value={rating.rating} />
                    </Box>
                    <Typography
                        variant='body1'
                        color={'text.dark'}
                        sx={{ mr: 2, display: { xs: 'none', sm: 'flex' } }}>
                        {`${rating.user.firstName} ${rating.user.lastName}`}
                    </Typography>
                </Box>
                <Rate
                    sx={{ display: { xs: 'none', sm: 'flex' } }}
                    size='medium'
                    readOnly
                    value={rating.rating}
                />
            </Box>
            <Typography
                sx={{
                    textAlign: { xs: 'center', sm: 'inherit' },
                    mt: 1.5,
                }}
                variant={'body2'}
                color={'text.secondary'}>
                {rating.description}
            </Typography>
        </Paper>
    );
};

export default RatingCard;
