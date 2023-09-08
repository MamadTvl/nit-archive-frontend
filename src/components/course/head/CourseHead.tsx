import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import { CourseProps } from '../../../../pages/course/[course-slug]';
import { Course } from '../../../types';
import LightClockIcon from '../../icons/LightClockIcon';
import PersonIcon from '../../icons/PersonIcon';
import RatingIcon from '../../icons/RatingIcon';
import VideoIcon from '../../icons/VideoIcon';
import Rate from '../../styled-components/Rating';
import Wall from '../../layout/utils/Wall';
import AddToCartBox from './AddToCartBox';

export enum courseIcon {
    rating = 'rating',
    instructor = 'instructor',
    duration = 'duration',
    videos = 'videos',
}

const CourseIcon = {
    rating: <RatingIcon />,
    instructor: <PersonIcon />,
    duration: <LightClockIcon />,
    videos: <VideoIcon />,
};

const courseBullets: {
    type: courseIcon;
}[] = [
    {
        type: courseIcon.rating,
    },
    {
        type: courseIcon.instructor,
    },
    {
        type: courseIcon.duration,
    },
    {
        type: courseIcon.videos,
    },
];

const CourseHead: React.FC<{
    staticContent: CourseProps['staticContent'];
    course: Required<Course>;
}> = ({ course, staticContent }) => {
    return (
        <Grid
            sx={{ pb: 6, pt: 6 }}
            container
            spacing={0}
            component={'section'}
            position={'relative'}>
            <Wall />
            <Grid item xs={12} sm={7}>
                <Typography variant='subtitle1' color={'text.light'}>
                    {staticContent.subtitle}
                </Typography>
                <Typography
                    sx={{ mt: 1 }}
                    variant='h1'
                    color={'text.secondary'}>
                    {course.title}
                </Typography>
                <Box sx={{ display: { xs: 'block', sm: 'none' }, mt: 4 }}>
                    <Image
                        src={course.media.featuredUri ?? '/not-found'}
                        alt={course.title}
                        width={320}
                        height={180}
                        layout={'responsive'}
                        objectFit={'contain'}
                        className={'image-border-8'}
                        priority
                    />
                </Box>
                <Typography
                    sx={{ mt: 7 }}
                    variant='body2'
                    color={'text.secondary'}>
                    {course.description}
                </Typography>
                <Grid container spacing={2} sx={{ mt: 5 }}>
                    {courseBullets.map((bullet, index) => {
                        let content: string | undefined;
                        if (bullet.type === courseIcon.duration) {
                            content = `${Math.round(course.duration / 3600)} ${
                                staticContent.hourUnit
                            }`;
                        } else if (bullet.type === courseIcon.videos) {
                            content = `${course.videosCount} ${staticContent.videoUnit}`;
                        } else if (
                            bullet.type === courseIcon.instructor &&
                            course.instructor
                        ) {
                            content = `${course.instructor.firstName} ${course.instructor.lastName}`;
                        }

                        return (
                            <Grid item xs={6} key={index}>
                                <Box display={'flex'} alignItems={'center'}>
                                    <Box
                                        display={'flex'}
                                        alignItems={'center'}
                                        justifyContent={'center'}
                                        flexDirection={'column'}
                                        sx={{
                                            width: {
                                                xs: 32,
                                                md: 48,
                                            },
                                            height: {
                                                xs: 32,
                                                md: 48,
                                            },
                                            '& svg': {
                                                width: {
                                                    xs: 16,
                                                    md: 24,
                                                },
                                                height: {
                                                    xs: 16,
                                                    md: 24,
                                                },
                                            },
                                            borderRadius: 2,
                                            backgroundColor: 'primary.lightest',
                                            ml: 2,
                                        }}>
                                        {CourseIcon[bullet.type]}
                                    </Box>
                                    {content ? (
                                        <Typography
                                            color={'text.secondary'}
                                            variant='h6'>
                                            {content}
                                        </Typography>
                                    ) : (
                                        <>
                                            <Rate
                                                size={'small'}
                                                sx={{
                                                    display: {
                                                        xs: 'flex',
                                                        md: 'none',
                                                    },
                                                }}
                                                value={course.averageRating}
                                                precision={0.5}
                                                readOnly
                                            />
                                            <Rate
                                                size={'medium'}
                                                sx={{
                                                    display: {
                                                        xs: 'none',
                                                        md: 'flex',
                                                    },
                                                }}
                                                value={course.averageRating}
                                                precision={0.5}
                                                readOnly
                                            />
                                        </>
                                    )}
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>
            </Grid>
            <Grid
                item
                sx={{ maxWidth: { xs: '4.333%', lg: '8.3333%' } }}
                xs={1}
            />
            <Grid
                item
                xs={4}
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    maxWidth: { xs: '37.333%', lg: '33.3333%' },
                    flexBasis: { xs: '37.333%', lg: '33.3333%' },
                }}>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'space-between'}>
                    <Image
                        src={course.media.featuredUri ?? '/not-found'}
                        alt={course.title}
                        width={362}
                        height={205}
                        objectFit={'contain'}
                        layout={'responsive'}
                        className={'image-border-8'}
                        priority
                    />
                    <AddToCartBox
                        cartButtonText={staticContent.cartButtonText}
                        course={course}
                        currency={staticContent.currency}
                    />
                </Box>
            </Grid>
            <AddToCartBox
                cartButtonText={staticContent.cartButtonText}
                course={course}
                currency={staticContent.currency}
                fixed
            />
        </Grid>
    );
};

export default CourseHead;
