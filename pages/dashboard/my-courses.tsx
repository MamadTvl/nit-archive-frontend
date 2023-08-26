import { Grid } from '@mui/material';
import { GetStaticProps, GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';
import MetaBox from '../../src/components/box/MetaBox';
import Section from '../../src/components/layout/section/Section';
import Wall from '../../src/components/layout/utils/Wall';
import DashboardCourseBox from '../../src/components/user/components/dashboard/my-courses/DashboardCourseBox';
import { showLoginDialog } from '../../src/components/user/context/action';
import { useUser } from '../../src/components/user/context/UserContext';
import { Course, Video } from '../../src/types';
import axios from '../../src/utils/axios';
import { getCookie } from '../../src/utils/cookie';
import CourseCollection from '../../src/components/course/collection/CourseCollection';
import Title from '../../src/components/title/Title';

const fetcher = async (url: string): Promise<ApiResult> => {
    let token = getCookie('shenovid-token', document.cookie);
    if (token === '') {
        return Promise.reject(new Error('No token found'));
    }
    return axios
        .get<ApiResult>(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.data);
};

interface ApiResult {
    courses: Array<Course & { last_authenticated_user_video: Video }>;
    popularCourses: Course[];
}

const MyCourses: NextPage<MyCoursesProps> = ({ title, meta }) => {
    const { dispatch } = useUser();
    const router = useRouter();
    const { data, error } = useSWR<ApiResult>('/dashboard/courses', fetcher);

    useEffect(() => {
        if (error) {
            dispatch(showLoginDialog(true));
        }
    }, [dispatch, error, router]);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='robots' content='noindex,nofollow' />
            </Head>

            <Section
                sx={{
                    maxWidth: '744px!important',
                    pl: '0px!important',
                    pr: '0px!important',
                    m: 'auto',
                    pt: 7.5,
                    pb: 8.75,
                    position: 'relative',
                }}>
                <Wall />
                <Grid container spacing={7.25} justifyContent={'center'}>
                    <Grid item xs={12}>
                        <Title sx={{ mb: 0 }} title={title} />
                    </Grid>
                    <Grid item xs={12} container spacing={2}>
                        {data?.courses.map((course, index) => {
                            return (
                                <Grid item xs={12} key={index}>
                                    <DashboardCourseBox course={course} />
                                </Grid>
                            );
                        })}
                        {!data &&
                            Array.from({ length: 1 }).map((_, index) => (
                                <Grid item xs={12} key={index}>
                                    <DashboardCourseBox />
                                </Grid>
                            ))}
                    </Grid>
                </Grid>
            </Section>
            <Section
                sx={{
                    maxWidth: '744px!important',
                    pl: '0px!important',
                    pr: '0px!important',
                    m: 'auto',
                }}>
                <Title title={'دوره‌های پیشنهادی'} />
                <CourseCollection courses={data?.popularCourses} />
            </Section>
            <Section
                sx={{
                    maxWidth: '744px!important',
                    pl: '0px!important',
                    pr: '0px!important',
                    m: 'auto',
                    pt: {
                        xs: 0,
                        sm: 7.5,
                    },
                    pb: 8.75,
                }}
                boxProps={{ position: 'relative' }}>
                <Wall />
                <Grid container spacing={{ xs: 4, sm: 1 }}>
                    {meta.map((item, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                            <MetaBox sx={{ maxWidth: 'unset' }} meta={item} />
                        </Grid>
                    ))}
                </Grid>
            </Section>
        </>
    );
};

export const getStaticProps: GetStaticProps =
    (): GetStaticPropsResult<MyCoursesProps> => {
        return {
            props: {
                title: 'دوره های من',
                meta: [
                    {
                        image: {
                            src: '/img/cart/meta/1.svg',
                            alt: '',
                        },
                        title: 'ضمانت بازگشت وجه',
                    },
                    {
                        image: {
                            src: '/img/cart/meta/2.svg',
                            alt: '',
                        },
                        title: 'پشتیبانی کامل',
                    },
                    {
                        image: {
                            src: '/img/cart/meta/3.svg',
                            alt: '',
                        },
                        title: 'همگام با ناشنوایان',
                    },
                ],
            },
        };
    };
export default MyCourses;

export interface MyCoursesProps {
    title: string;
    meta: Array<{
        image: {
            src: string;
            alt: string;
        };
        title: string;
    }>;
}
