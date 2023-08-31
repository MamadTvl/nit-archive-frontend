import { Button, Grid, Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import { Course, Video } from '../../../../../types';
import Link from '../../../../link/Link';
import CourseItemBox from './items/CourseItemBox';

const DashboardCourseBox: React.FC<DashboardCourseBoxProps> = ({ course }) => {
    return (
        <Grid
            container
            alignItems={'center'}
            sx={{
                border: '1px solid',
                borderColor: 'primary.main',
                height: 100,
                p: { xs: 1.5, sm: 2.25 },
                borderRadius: 2,
            }}>
            <Grid item xs={9} sm={5}>
                <Box display={'flex'} alignItems={'center'}>
                    {course ? (
                        <>
                            <Link href={`/course/${course.slug}`}>
                                <Image
                                    width={64}
                                    height={64}
                                    src={course.media.featuredUri || '/not-found'}
                                    alt={''}
                                    objectFit={'cover'}
                                    className={'image-border'}
                                />
                            </Link>
                            <Typography
                                sx={{
                                    mr: 4.75,
                                    display: { xs: 'none', sm: 'inherit' },
                                }}
                                variant={'h5'}
                                color={'text.dark'}>
                                {course.title}
                            </Typography>
                            <Box
                                sx={{ mr: 2, height: 51 }}
                                display={{ xs: 'flex', sm: 'none' }}
                                flexDirection={'column'}
                                justifyContent={'space-between'}>
                                <Typography variant={'h5'} color={'text.dark'}>
                                    {course.title}
                                </Typography>
                                <CourseItemBox
                                    course={course}
                                    item={'videos-count'}
                                />
                            </Box>
                        </>
                    ) : (
                        <>
                            <Skeleton
                                width={64}
                                height={64}
                                sx={{ borderRadius: 2 }}
                                variant={'rectangular'}
                            />
                            <Skeleton
                                width={220}
                                height={12}
                                sx={{
                                    mr: 4.75,
                                    minWidth: 64,
                                    display: { xs: 'none', sm: 'block' },
                                }}
                                variant={'rectangular'}
                            />
                            <Box
                                sx={{ mr: 2, height: 51 }}
                                display={{ xs: 'flex', sm: 'none' }}
                                flexDirection={'column'}
                                justifyContent={'space-between'}>
                                <Skeleton
                                    width={120}
                                    height={12}
                                    sx={{
                                        minWidth: 64,
                                    }}
                                    variant={'rectangular'}
                                />
                                <CourseItemBox
                                    course={course}
                                    item={'videos-count'}
                                />
                            </Box>
                        </>
                    )}
                </Box>
            </Grid>
            <Grid item xs={1} display={{ xs: 'none', sm: 'block' }} />
            <Grid item xs={2} display={{ xs: 'none', sm: 'block' }}>
                <CourseItemBox course={course} item={'duration'} />
            </Grid>
            <Grid item xs={2} display={{ xs: 'none', sm: 'block' }}>
                <CourseItemBox course={course} item={'videos-count'} />
            </Grid>
            <Grid
                item
                xs={3}
                sm={2}
                display={{ xs: 'block', sm: 'flex' }}
                justifyContent={'flex-end'}
                alignSelf={{ xs: 'flex-end', sm: 'center' }}>
                {course ? (
                    <>
                        <Link
                            href={`/course/${course.slug}`}>
                            <Button
                                sx={{
                                    height: { xs: 32, sm: 44 },
                                    width: { xs: 75, sm: 114 },
                                    borderRadius: { xs: 1, sm: 2 },
                                }}
                                variant={'outlined'}
                                color={'primary'}>
                                {'ادامه'}
                            </Button>
                        </Link>
                    </>
                ) : (
                    <Skeleton
                        sx={{
                            borderRadius: { xs: 1, sm: 2 },
                            height: { xs: 32, sm: 44 },
                            width: { xs: 75, sm: 114 },
                        }}
                        variant={'rectangular'}
                    />
                )}
            </Grid>
        </Grid>
    );
};

export default DashboardCourseBox;

export interface DashboardCourseBoxProps {
    course?: Course;
}
