import { PaperProps, SxProps } from '@mui/material';
import { Theme } from '@mui/system';
import { Course } from '../../../types';

export interface CourseCardProps {
    course: Course;
    paperProps?: PaperProps;
    sx?: SxProps<Theme>;
}
