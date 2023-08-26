import { SxProps, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Rating } from '../../types';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper';
import Arrow from '../slider/Arrow';
import RatingCard from './RatingCard';
import Wall from '../layout/utils/Wall';

const RatingSlider: React.FC<{
    ratings: Rating[];
    title: string;
    swiperProps?: SwiperProps;
    sx?: SxProps;
    ratingCardSx?: SxProps;
    hasWall?: boolean;
}> = ({ ratings, title, swiperProps, sx, ratingCardSx, hasWall = false }) => {
    return (
        <Box
            component={'section'}
            sx={{ pt: 6, pb: 10, ...sx }}
            position={hasWall ? 'relative' : undefined}>
            {hasWall && <Wall />}
            <Typography
                variant='h4'
                sx={{ color: 'text.primary', mb: 5 }}
                align={'center'}>
                {title}
            </Typography>
            <Box sx={{ p: 4 }} position={'relative'}>
                <Swiper
                    style={{ position: 'unset' }}
                    loop
                    dir='rtl'
                    modules={[Navigation, Scrollbar]}
                    allowTouchMove
                    draggable
                    spaceBetween={0}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    slidesPerView={2}
                    breakpoints={{
                        900: {
                            slidesPerView: 2,
                        },
                        0: {
                            slidesPerView: 1,
                        },
                    }}
                    {...swiperProps}>
                    {ratings.map((rating, index) => (
                        <SwiperSlide key={index}>
                            <RatingCard
                                paperProps={{ style: { margin: 'auto' } }}
                                rating={rating}
                                sx={[
                                    (theme) => ({
                                        [theme.breakpoints.down('sm')]: {
                                            maxWidth: 274,
                                            height: 240,
                                        },
                                    }),
                                    ...(Array.isArray(ratingCardSx)
                                        ? ratingCardSx
                                        : [ratingCardSx]),
                                    { mb: 4 },
                                ]}
                            />
                        </SwiperSlide>
                    ))}
                    <Arrow
                        sx={{
                            right: -16,
                            bottom: '41%',
                            position: 'absolute',
                            zIndex: 10,
                        }}
                        className='swiper-button-prev'
                    />
                    <Arrow
                        sx={{
                            transform: 'rotate(180deg)',
                            position: 'absolute',
                            left: -16,
                            bottom: '41%',
                            zIndex: 10,
                        }}
                        className='swiper-button-next'
                    />
                </Swiper>
            </Box>
        </Box>
    );
};

export default RatingSlider;
