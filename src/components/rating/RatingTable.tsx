import { Box, Grid, Typography } from '@mui/material';
import { Course, Rate } from '../../types/index';
import BorderLinearProgress from '../styled-components/LinearProgress';
import Rating from '../styled-components/Rating';

const RatingTable: React.FC<{
    rateData: Course['ratingTable'];
    ratingsCount: number;
    ratingAverage: number;
    rateUnit: string;
}> = ({ rateData, ratingAverage, ratingsCount, rateUnit }) => {
    return (
        <Grid container>
            <Grid item xs={12} sm={3}>
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    sx={{
                        height: 1,
                        flexDirection: { xs: 'row', sm: 'column' },
                        justifyContent: {
                            xs: 'space-around',
                            sm: 'space-between',
                        },
                        pb: {
                            xs: 3,
                            sm: 0,
                        },
                    }}>
                    <Typography
                        sx={{ display: 'flex', alignItems: 'center' }}
                        variant='h1'
                        component={'span'}
                        color={'secondary.main'}>
                        {ratingAverage ? (+ratingAverage).toFixed(1) : '0.0'}
                        <Typography
                            sx={{ display: { xs: '', sm: 'none' }, mr: 2 }}
                            component={'span'}
                            variant={'h6'}
                            color={'text.secondary'}>
                            {` (${ratingsCount} ${rateUnit})`}
                        </Typography>
                    </Typography>
                    <Typography
                        sx={{ display: { xs: 'none', sm: 'inherit' } }}
                        variant={'h6'}
                        color={'text.secondary'}>
                        {`${ratingsCount} ${rateUnit}`}
                    </Typography>
                    <Rating
                        size={'medium'}
                        value={ratingAverage ? +ratingAverage : null}
                        precision={0.5}
                        readOnly
                    />
                </Box>
            </Grid>
            {rateData && (
                <Grid item xs={12} sm={9}>
                    <Grid container spacing={1}>
                        {[...Array(5)].map((_, index) => {
                            const rateNumber = 5 - index;
                            const rate: Rate =
                                rateData[
                                    rateNumber as keyof Course['ratingTable']
                                ];
                            return (
                                <Grid item xs={12} key={rateNumber}>
                                    <Box display={'flex'} alignItems={'center'}>
                                        <BorderLinearProgress
                                            variant='determinate'
                                            sx={{
                                                maxWidth: '75%',
                                                flexBasis: '75%',
                                                ml: 2,
                                            }}
                                            value={rate.percentage}
                                        />
                                        <Box
                                            display={'flex'}
                                            alignItems={'center'}>
                                            <Box
                                                flexDirection={'column'}
                                                display={'flex'}
                                                alignItems={'center'}
                                                justifyContent={'center'}
                                                sx={{
                                                    width: 25,
                                                    mt: '3px',
                                                    ml: 0.5,
                                                }}>
                                                <Typography
                                                    variant='subtitle2'
                                                    color={'text.dark'}>
                                                    {rate.percentage?.toFixed(0) || 0}
                                                    %
                                                </Typography>
                                            </Box>
                                            <Rating
                                                size={'small'}
                                                value={rateNumber}
                                                readOnly
                                            />
                                        </Box>
                                    </Box>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

export default RatingTable;
