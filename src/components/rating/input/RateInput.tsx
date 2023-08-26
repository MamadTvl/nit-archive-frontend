import { useUser } from '../../user/context/UserContext';
import {
    Box,
    Button,
    CircularProgress,
    Divider,
    Grid,
    ThemeProvider,
    Typography,
} from '@mui/material';
import Avatar from '../../avatar/Avatar';
import Rate from '../../styled-components/Rating';
import useSWR from 'swr';
import getConfig from 'next/config';
import { Course, UserRate, Video } from '../../../types';
import { useCallback, useMemo, useState } from 'react';
import OutlinedInput from '../../styled-components/OutlinedInput';
import usePost from '../../../hooks/usePost';
import { useSnackbar } from 'notistack';
import { getCookie } from '../../../utils/cookie';
import { AuthCourseApiResult } from '../../course/head/AddToCartBox';

const { publicRuntimeConfig } = getConfig();

const RateInput: React.FC<{ course: Course }> = ({ course }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { store } = useUser();
    const { user } = store;
    const { data: authCourse, error } = useSWR<AuthCourseApiResult>(
        `${publicRuntimeConfig.baseUrl}/course/${course.slug}`
    );
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');
    const body = useMemo(() => {
        return {
            rating: authCourse?.user_rate?.rating || rating,
            description: authCourse?.user_rate?.description || description,
        };
    }, [
        authCourse?.user_rate?.description,
        authCourse?.user_rate?.rating,
        description,
        rating,
    ]);
    const { post, loading } = usePost<
        { message: string },
        { message?: string }
    >({
        url: `${publicRuntimeConfig.baseUrl}/course/rate/${course.slug}`,
        body: body,
        config: {
            headers: {
                ...(typeof window !== 'undefined'
                    ? {
                          Authorization: `Bearer ${getCookie(
                              'shenovid-token',
                              document.cookie
                          )}`,
                      }
                    : {}),
            },
        },
        onSuccess: (data) => {
            enqueueSnackbar(data.message, { variant: 'success' });
        },
        onError: (data) => {
            enqueueSnackbar(data?.message || 'Unexpected Error', {
                variant: 'error',
            });
        },
    });

    const handleSubmit = useCallback(() => {
        if (
            authCourse?.user_rate?.rating &&
            authCourse?.user_rate?.description
        ) {
            return;
        }
        if (authCourse?.user_rate?.rating && description === '') {
            enqueueSnackbar('نظر خود را وارد کنید', { variant: 'error' });
            return;
        } else if (
            authCourse?.user_rate?.description &&
            !authCourse?.user_rate?.rating &&
            rating === 0
        ) {
            enqueueSnackbar('امتیاز خود را وارد کنید', { variant: 'error' });
            return;
        } else if (
            !authCourse?.user_rate?.description &&
            description !== '' &&
            !authCourse?.user_rate?.rating &&
            rating === 0
        ) {
            enqueueSnackbar('امتیاز خود را وارد کنید', { variant: 'error' });
            return;
        }
        post(true);
    }, [
        authCourse?.user_rate?.description,
        authCourse?.user_rate?.rating,
        description,
        enqueueSnackbar,
        post,
        rating,
    ]);

    if (error || !authCourse?.course.user_owns) {
        return null;
    }
    return (
        <Grid container spacing={2} alignItems={'center'}>
            <Grid item xs={6} sm={3}>
                <Box display={'flex'} alignItems={'center'}>
                    <Avatar
                        imageProps={{
                            src: user?.media_urls.avatars?.main || '',
                            alt: '',
                            width: 40,
                            height: 40,
                        }}
                    />
                    <Typography
                        variant={'h5'}
                        color={'text.secondary'}
                        sx={{ mr: 1.75 }}>
                        {user?.first_name || ''} {user?.last_name || ''}
                    </Typography>
                    <Box
                        sx={{
                            border: '1px solid',
                            borderColor: 'text.dark',
                            height: 32,
                            mr: 4,
                            display: { xs: 'none', sm: 'inherit' },
                        }}
                    />
                </Box>
            </Grid>
            <Grid item xs={6} sm={5}>
                <Box display={'flex'} alignItems={'center'}>
                    <Typography
                        sx={{ ml: 2, display: { xs: 'none', sm: 'inherit' } }}
                        variant={'body1'}
                        color={'text.dark'}>
                        {'امتیاز شما به دوره:'}
                    </Typography>
                    <ThemeProvider theme={{ direction: 'ltr' }}>
                        <Rate
                            sx={{
                                '& .MuiSvgIcon-fontSizeMedium': {
                                    fontSize: {
                                        xs: '2rem',
                                        sm: '1.5rem',
                                    },
                                },
                            }}
                            size={'medium'}
                            value={
                                authCourse?.user_rate?.rating
                                    ? authCourse.user_rate.rating
                                    : rating
                            }
                            readOnly={!!authCourse?.user_rate?.rating}
                            //@ts-ignore
                            onChange={(e) => setRating(e.target.value)}
                        />
                    </ThemeProvider>
                </Box>
            </Grid>
            <Grid
                display={{ xs: 'none', sm: 'flex' }}
                justifyContent={'flex-end'}
                item
                sm={4}>
                <Button
                    onClick={handleSubmit}
                    disabled={
                        !!(
                            authCourse?.user_rate?.rating &&
                            authCourse?.user_rate?.description
                        ) || loading
                    }
                    sx={{ width: 134, height: 40 }}
                    variant={'outlined'}
                    color={'secondary'}>
                    {loading ? <CircularProgress size={20} /> : 'ثبت نظر'}
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography
                    sx={{ mb: 2, display: { xs: 'none', sm: 'inherit' } }}
                    variant={'h6'}
                    color={'text.dark'}>
                    {'متن نظر:'}
                </Typography>
                <OutlinedInput
                    disabled={
                        !!(
                            authCourse?.user_rate?.rating &&
                            authCourse?.user_rate?.description
                        ) || loading
                    }
                    value={
                        authCourse?.user_rate?.description
                            ? authCourse.user_rate.description
                            : description
                    }
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    sx={{
                        '& .MuiInputBase-input': { borderColor: 'text.light' },
                    }}
                />
            </Grid>
            <Grid
                display={{ xs: 'flex', sm: 'none' }}
                justifyContent={'flex-end'}
                item
                xs={12}>
                <Button
                    onClick={handleSubmit}
                    disabled={
                        !!(
                            authCourse?.user_rate?.rating &&
                            authCourse?.user_rate?.description
                        ) || loading
                    }
                    sx={{ height: 40 }}
                    variant={'contained'}
                    fullWidth
                    color={'secondary'}>
                    {loading ? <CircularProgress size={20} /> : 'ثبت نظر'}
                </Button>
            </Grid>
        </Grid>
    );
};
export default RateInput;
