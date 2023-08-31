import { Grid } from '@mui/material';
import { GetStaticProps, GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import useSWR from 'swr';
import Section from '../../src/components/layout/section/Section';
import Wall from '../../src/components/layout/utils/Wall';
import DashboardCourseBox from '../../src/components/user/components/dashboard/my-courses/DashboardCourseBox';
import { Course, Video } from '../../src/types';
import Title from '../../src/components/title/Title';
import { useUserStore } from '@/components/user/store/store';
import { Api } from '@/api/index';

interface ApiResult {
    courses: Array<Course & { last_authenticated_user_video: Video }>;
    popularCourses: Course[];
}

const MyCourses: NextPage<MyCoursesProps> = ({ title, meta }) => {
    const [user, loading, openLoginDialog] = useUserStore((s) => [
        s.user,
        s.loading,
        s.openLoginDialog,
    ]);
    const { data: myCourses, isLoading } = useSWR(
        'my-courses',
        () => Api.Instance.getUserCourses()
    );

    useEffect(() => {
        if (loading) {
            return;
        }
        if (!user) {
            openLoginDialog(true);
        }
    }, [loading, openLoginDialog, user]);

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
                        {myCourses?.map((course, index) => {
                            return (
                                <Grid item xs={12} key={index}>
                                    <DashboardCourseBox course={course} />
                                </Grid>
                            );
                        })}
                        {isLoading &&
                            Array.from({ length: 1 }).map((_, index) => (
                                <Grid item xs={12} key={index}>
                                    <DashboardCourseBox />
                                </Grid>
                            ))}
                    </Grid>
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
