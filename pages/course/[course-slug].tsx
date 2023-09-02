import type { GetStaticProps, GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import getConfig from 'next/config';
import { Course, CourseStatus } from '../../src/types';
import CourseHead from '../../src/components/course/head/CourseHead';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import MetaBox from '../../src/components/box/MetaBox';
import Wall from '../../src/components/layout/utils/Wall';
import Teaser from '../../src/components/styled-components/Teaser';
import AccordionItem from '../../src/components/accordion/AccordionItem';
import CourseAccordionContent from '../../src/components/accordion/CourseAccordionContent';
import RatingSlider from '../../src/components/rating/RatingSlider';
import Title from '../../src/components/title/Title';
import CourseCollection from '../../src/components/course/collection/CourseCollection';
import RatingTable from '../../src/components/rating/RatingTable';
import Section from '../../src/components/layout/section/Section';
import React from 'react';
import { CoursesApiResult } from '../courses';
// import RateInput from '../../src/components/rating/input/RateInput';
import useSWR from 'swr';
import { AuthCourseApiResult } from '../../src/components/course/head/AddToCartBox';
import { Api } from '@/api/index';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const CoursePage: NextPage<CourseProps> = (props) => {
    const { data: authCourse, error } = useSWR<AuthCourseApiResult>(
        `${publicRuntimeConfig.baseUrl}/course/${props.course.slug}`
    );
    return (
        <>
            <Head>
                <title>{props.seo.title}</title>
                <meta name='description' content={props.seo.description} />
            </Head>
            <CourseHead
                course={props.course}
                staticContent={props.staticContent}
            />
            <Section
                sx={{
                    maxWidth: '744px!important',
                    pl: '0px!important',
                    pr: '0px!important',
                    m: 'auto',
                }}>
                <Title title={props.staticContent.topicsTitle} />
                <Grid container spacing={1}>
                    {props.course.topics.map((topic, index) => (
                        <Grid item xs={12} key={index}>
                            <AccordionItem
                                index={index}
                                topic={topic}
                                initialState={index === 0}
                                content={
                                    <CourseAccordionContent
                                        courseSlug={props.course.slug}
                                        videos={topic.videos}
                                        downloadItems={topic.downloadItems}
                                    />
                                }
                            />
                        </Grid>
                    ))}
                </Grid>
            </Section>
            <RatingSlider
                ratings={props.course.ratings}
                title={props.staticContent.ratingsTitle}
                swiperProps={{
                    slidesPerView: 1,
                    breakpoints: {
                        0: {
                            slidesPerView: 1,
                        },
                    },
                }}
                sx={{
                    maxWidth: '744px!important',
                    pl: '0px!important',
                    pr: '0px!important',
                    m: 'auto',
                }}
                ratingCardSx={{ maxWidth: 639, height: 200 }}
                hasWall
            />
            <Section
                boxProps={{ position: 'relative' }}
                sx={{
                    maxWidth: '744px!important',
                    pl: '0px!important',
                    pr: '0px!important',
                    m: 'auto',
                }}>
                <Wall />
                <Title title={props.staticContent.ratingsTableTitle} />
                <RatingTable
                    rateData={props.course.ratingTable}
                    rateUnit={props.staticContent.ratingUnit}
                    ratingAverage={props.course.averageRating}
                    ratingsCount={props.course.ratings.length}
                />
            </Section>
            {/* {authCourse?.course.user_owns && (
                <Section
                    sx={{
                        maxWidth: '744px!important',
                        pl: '0px!important',
                        pr: '0px!important',
                        m: 'auto',
                    }}>
                    <Title title={props.staticContent.rateInputTitle} />
                    <RateInput course={props.course} />
                </Section>
            )} */}
        </>
    );
};

export interface CourseApiResult {
    course: Required<Course>;
}

interface recommendedCoursesApiResult {
    recommended_courses: Course[];
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking',
    };
}

export const getStaticProps: GetStaticProps = async (
    context
): Promise<GetStaticPropsResult<CourseProps>> => {
    const { params } = context;
    if (!params) {
        return {
            notFound: true,
        };
    }
    const course = await Api.Instance.getCourse(
        params['course-slug'] as string
    );
    if (!course) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            seo: {
                title: `آموزش ${course.title}`,
                description: course.description || '',
            },
            course: course,
            staticContent: {
                subtitle: 'دورۀ آموزشی',
                cartButtonText: {
                    addToCart: 'افزودن به سبد خرید',
                    inCart: 'مشاهده سبد خرید',
                    owned: 'ادامه از آخرین قسمت',
                },
                featuresTitle: 'ویژگی‌های برجسته',
                teaserTitle: 'چکیدۀ دوره',
                topicsTitle: 'سرفصل‌ها',
                ratingsTitle: 'نظرات کاربران',
                rateInputTitle: 'بازخورد شما',
                similarCoursesTitle: 'دوره‌های مشابه',
                ratingsTableTitle: 'امتیاز یادگیرندگان',
                ratingUnit: 'بازخورد',
                hourUnit: 'ساعت',
                videoUnit: 'ویدیو',
                sectionUnit: 'بخش',
                currency: 'تومان',
            },
        },
        revalidate: 120,
    };
};

export interface CourseProps {
    seo: {
        title: string;
        description: string;
    };
    course: Required<Course>;
    staticContent: {
        subtitle: string;
        cartButtonText: {
            addToCart: string;
            inCart: string;
            owned: string;
        };
        featuresTitle: string;
        teaserTitle: string;
        topicsTitle: string;
        ratingsTitle: string;
        similarCoursesTitle: string;
        ratingsTableTitle: string;
        rateInputTitle: string;
        ratingUnit: string;
        hourUnit: string;
        videoUnit: string;
        sectionUnit: string;
        currency: string;
    };
}

export default CoursePage;
