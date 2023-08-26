import { Box, Divider, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import { CourseStatus } from '../../types';
import { separateDigit } from '../../utils/convertDigits';
import Avatar from '../avatar/Avatar';
import CourseChip from '../chip/CourseChip';
import ClockIcon from '../icons/ClockIcon';
import Link from '../link/Link';
import Rate from '../styled-components/Rating';
import { CourseCardProps } from './types';

const CourseCard: React.FC<CourseCardProps> = ({ course, paperProps, sx }) => {
    return (
        <Link disabled={course.status.id === 1} href={`/course/${course.slug}`}>
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
                        position: 'relative',
                        border: '1px solid',
                        borderColor: 'transparent',
                        transition: 'border-color 0.3s ease-in-out',
                        '&:hover': {
                            borderColor: 'primary.main',
                        },
                    },
                    ...(Array.isArray(sx) ? sx : [sx]),
                ]}
                {...paperProps}>
                <CourseChip status={course.status} />
                <Image
                    src={course.media.featuredUri ?? '/not-found'}
                    alt={course.title}
                    width={222}
                    height={126}
                    className={'image-border'}
                />
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}>
                    <Typography variant='caption' color={'text.light'}>
                        {course.category?.title}
                    </Typography>
                    <Rate
                        size={'small'}
                        value={course.averageRating}
                        precision={0.5}
                        readOnly
                    />
                </Box>
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}>
                    <Typography noWrap variant='h6' color={'text.primary'}>
                        {course.title}
                    </Typography>
                    <Box
                        display={'flex'}
                        sx={{ '& svg': { width: 12, height: 12 } }}
                        alignItems={'center'}>
                        <Typography
                            noWrap
                            variant='caption'
                            color={'text.dark'}
                            sx={{ ml: 0.5 }}>{`${Math.round(
                            course.duration / 3600
                        )} ساعت`}</Typography>
                        <ClockIcon />
                    </Box>
                </Box>
                {course.instructor && (
                    <>
                        <Divider sx={{ color: 'text.light', height: '1px' }} />
                        <Box
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'space-between'}>
                            <Box display={'flex'} alignItems={'center'}>
                                <Avatar
                                    imageProps={{
                                        src:
                                            course.instructor.media.avatarUri ??
                                            '/not-found',
                                        alt: `${course.instructor.firstName} ${course.instructor.lastName}`,
                                        width: 20,
                                        height: 20,
                                    }}
                                />
                                <Typography
                                    noWrap
                                    variant='caption'
                                    color={'text.secondary'}
                                    sx={{ mr: 0.5 }}>
                                    {`${course.instructor.firstName} ${course.instructor.lastName}`}
                                </Typography>
                            </Box>
                        </Box>
                    </>
                )}
            </Paper>
        </Link>
    );
};

export default CourseCard;
