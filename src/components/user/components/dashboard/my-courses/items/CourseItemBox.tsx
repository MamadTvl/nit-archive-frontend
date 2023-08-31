import { Box, Skeleton, Typography } from '@mui/material';
import { Course } from '../../../../../../types';
import ClockIcon from '../../../../../icons/ClockIcon';
import VideoIcon from '../../../../../icons/VideoIcon';

const CourseItemBox: React.FC<{
    course?: Course;
    item: 'duration' | 'videos-count';
}> = ({ course, item }) => (
    <Box
        sx={(theme) => ({
            '& path': { fill: theme.palette.text.light },
            '& svg': { width: 16, height: 16 },
        })}
        display={'flex'}
        alignItems={'center'}>
        {course ? (
            <>
                {item === 'duration' ? <ClockIcon /> : <VideoIcon />}
                <Typography
                    sx={{ mr: 1 }}
                    color={'text.secondary'}
                    variant='body2'>
                    {item === 'duration'
                        ? `${Math.round(course.duration / 3600)} ساعت`
                        : `${course.videosCount} ویدیو`}
                </Typography>
            </>
        ) : (
            <>
                <Skeleton
                    width={16}
                    height={16}
                    sx={{ borderRadius: 2 }}
                    variant={'circular'}
                />
                <Skeleton
                    width={60}
                    height={8}
                    sx={{ mr: 1 }}
                    variant={'rectangular'}
                />
            </>
        )}
    </Box>
);

export default CourseItemBox;
