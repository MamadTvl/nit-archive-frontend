import { Box, Grid } from '@mui/material';
import CourseCard from '../../card/CourseCard';
import CourseSkeletonCard from '../../card/CourseSkeletonCard';
import { Course } from '../../../types';
import React from 'react';

const CourseCollection: React.FC<{
    courses?: Course[] | undefined[];
}> = ({ courses = Array.from({ length: 3 }) }) => (
    <>
        <Grid container sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {courses.map((course, index) => (
                <Grid item xs={4} key={index}>
                    {course ? (
                        <CourseCard course={course} sx={{ m: 'auto' }} />
                    ) : (
                        <CourseSkeletonCard />
                    )}
                </Grid>
            ))}
        </Grid>
        <Box
            sx={{
                display: { xs: 'flex', sm: 'none' },
                overflow: 'auto',
                ml: '-20px',
                mr: '-20px',
            }}>
            {courses.map((course, index) => (
                <React.Fragment key={index}>
                    {course ? (
                        <CourseCard
                            course={course}
                            sx={{
                                ml: 3,
                                mr: 1,
                            }}
                        />
                    ) : (
                        <CourseSkeletonCard
                            sx={{
                                ml: 3,
                                mr: 1,
                            }}
                        />
                    )}
                </React.Fragment>
            ))}
        </Box>
    </>
);
export default CourseCollection;
