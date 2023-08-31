import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper';
import { Course } from '../../types';
import CourseCard from '../card/CourseCard';
import Arrow from './Arrow';
import Wall from '../layout/utils/Wall';

const CoursesSlider: React.FC<{
    courses: Course[];
    title: string;
    wall?: boolean;
}> = ({ courses, title, wall = false }) => {
    
    return (
        <Box
            component={'section'}
            position={wall ? 'relative' : undefined}
            sx={{ pt: 6, pb: 10 }}>
            {wall && <Wall />}
            <Typography
                variant='h4'
                sx={{ color: 'text.primary', mb: 5 }}
                align={'center'}>
                {title}
            </Typography>
            <Box sx={{ p: 4 }} position={'relative'}>
                <Swiper
                    style={{ position: 'unset' }}
                    dir='rtl'
                    modules={[Navigation, Scrollbar]}
                    allowTouchMove
                    draggable
                    spaceBetween={0}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    slidesPerView={4}
                    breakpoints={{
                        1366: {
                            slidesPerView: 4,
                        },
                        1200: {
                            slidesPerView: 3,
                        },
                        900: {
                            slidesPerView: 3,
                        },
                        750: {
                            slidesPerView: 2,
                        },
                        0: {
                            slidesPerView: 1,
                        },
                    }}>
                    {courses.map((course, index) => (
                        <SwiperSlide key={index}>
                            <CourseCard
                                paperProps={{ style: { margin: 'auto' } }}
                                course={course}
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

export default CoursesSlider;
