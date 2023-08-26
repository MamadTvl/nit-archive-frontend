import {
    Box,
    Button,
    CircularProgress,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { Theme, useTheme } from '@mui/system';
import { DownloadItem, Video } from '../../types';
import ClockIcon from '../icons/ClockIcon';
import Link from '../link/Link';
import { dlBaseUrl } from '@/utils/config';
import { useRouter } from 'next/router';

const TitleBox = ({ title, number }: { title: string; number: number }) => (
    <Box display={'flex'} alignItems={'center'}>
        <Box display={'inline-flex'} position={'relative'}>
            <CircularProgress
                variant='determinate'
                value={100}
                sx={{
                    width: {
                        xs: '20px!important',
                        sm: '32px!important',
                    },
                    height: {
                        xs: '20px!important',
                        sm: '32px!important',
                    },
                }}
                color={'primary'}
            />
            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                position={'absolute'}
                top={0}
                left={0}
                right={0}
                bottom={0}>
                <Typography
                    variant={'h6'}
                    component={'span'}
                    color={'text.dark'}
                    sx={{
                        lineHeight: 0,
                        transition: 'all .3s',
                    }}>
                    {number}
                </Typography>
            </Box>
        </Box>
        <Typography
            sx={{
                mr: { xs: 1, sm: 2 },
                transition: 'all .3s',
                typography: {
                    xs: 'caption',
                    sm: 'h6',
                },
            }}
            variant='h6'
            color={'text.secondary'}>
            {title}
        </Typography>
    </Box>
);

const CourseAccordionContent: React.FC<{
    videos: Video[];
    downloadItems: DownloadItem[];
    courseSlug: string;
}> = ({ videos, downloadItems, courseSlug }) => {
    const theme = useTheme();
    const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const minuteUnit = isXs ? '’' : 'دقیقه';
    return (
        <Box sx={{ mt: 5, pl: 2, pr: 2 }}>
            {videos.map((video, index) => {
                return (
                    <Link
                        href={`/video/${courseSlug}/${video.id}`}
                        key={index}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mb: 5,
                            textDecoration: 'none',
                            '&:hover': {
                                h6: {
                                    color: 'primary.main',
                                },
                                span: {
                                    color: 'primary.main',
                                },
                                path: {
                                    fill: theme.palette.primary.main,
                                    transition: 'all .3s',
                                },
                            },
                        }}>
                        <TitleBox title={video.title} number={index + 1} />
                        <Box display={'flex'} alignItems={'center'}>
                            <Typography
                                sx={{
                                    ml: {
                                        xs: 0.7,
                                        sm: 2,
                                    },
                                    transition: 'all .3s',
                                    typography: {
                                        xs: 'caption',
                                        sm: 'subtitle2',
                                    },
                                }}
                                variant='subtitle2'
                                color={'text.dark'}>
                                {isXs
                                    ? `${minuteUnit}${Math.round(
                                          video.length / 60
                                      )}`
                                    : `${Math.round(
                                          video.length / 60
                                      )} ${minuteUnit}`}
                            </Typography>
                            <ClockIcon />
                        </Box>
                    </Link>
                );
            })}
            {downloadItems.map((item, index) => {
                return (
                    <Link
                        href={dlBaseUrl + item.url}
                        target='_blank'
                        download
                        key={index}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mb: 5,
                            textDecoration: 'none',
                            '&:hover': {
                                h6: {
                                    color: 'primary.main',
                                },
                                span: {
                                    color: 'primary.main',
                                },
                                path: {
                                    fill: theme.palette.primary.main,
                                    transition: 'all .3s',
                                },
                            },
                        }}>
                        <TitleBox
                            title={item.title}
                            number={videos.length + index + 1}
                        />
                        <Button
                            sx={{ height: 36 }}
                            variant='contained'
                            color='secondary'>
                            {'دانلود'}
                        </Button>
                    </Link>
                );
            })}
        </Box>
    );
};

export default CourseAccordionContent;
