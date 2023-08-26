import { GetStaticProps, GetStaticPropsResult, NextPage } from 'next';
import { Category, Course } from '../../src/types';
import getConfig from 'next/config';
import Head from 'next/head';
import CourseList from '../../src/components/list/CourseList';
import CategorySection from '../../src/components/category/container';
import CoursesSlider from '../../src/components/slider/CoursesSlider';
import Section from '../../src/components/layout/section/Section';
import Title from '../../src/components/title/Title';
import SuggestionBox from '../../src/components/box/SuggestionBox';
import Wall from '../../src/components/layout/utils/Wall';
import usePost from '../../src/hooks/usePost';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Api } from '@/api/index';

const { serverRuntimeConfig } = getConfig();

const CoursesPage: NextPage<CoursesProps> = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const [suggestionValue, setSuggestionValue] = useState('');
    return (
        <>
            <Head>
                <title>{props.seo.title}</title>
                <meta name='description' content={props.seo.description} />
            </Head>
            <CategorySection
                categories={props.categories.data}
                title={props.categories.title}
            />
            <CoursesSlider
                courses={props.latestCourses.data}
                title={props.latestCourses.title}
            />
            <CoursesSlider
                courses={props.popularCourses.data}
                title={props.popularCourses.title}
                wall
            />
            <Section sx={{ maxWidth: 1313 }} boxProps={{ id: 'list' }}>
                <Title title={props.coursesList.title} />
                <CourseList {...props.coursesList} />
            </Section>
        </>
    );
};

export const getStaticProps: GetStaticProps = async (
    context
): Promise<GetStaticPropsResult<CoursesProps>> => {
    const [newestCourses, popularCourses, courseList, categories] =
        await Promise.all([
            Api.Instance.getCourseSlider('newest'),
            Api.Instance.getCourseSlider('most-wanted'),
            Api.Instance.getCourseList({
                page: '1',
                sort: 'newest',
            }),
            Api.Instance.getCategories(),
        ]);

    if (!courseList) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            seo: {
                title: 'دوره های آموزشی |‌ نیت‌آرشیو',
                description: '',
            },
            categories: {
                title: 'دوره‌های آموزشی',
                data: categories,
            },
            latestCourses: {
                title: 'آخرین دوره‌ها',
                data: newestCourses,
            },
            popularCourses: {
                title: 'محبوب‌ترین دوره‌ها',
                data: popularCourses,
            },
            coursesList: {
                title: 'همۀ دوره‌ها',
                data: courseList.courses.data || [],
                page: courseList.courses.page || 1,
                pageSize: courseList.courses.pageSize,
                totalPages: courseList.courses.pagesCount,
            },
        },
        revalidate: 10,
    };
};

export default CoursesPage;

export interface CoursesApiResult {
    categories: Category[];
    mostSoldCourses: Course[];
    popularCourses: Course[];
    courses: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
        data: Course[];
    };
}

export interface CoursesProps {
    seo: {
        title: string;
        description: string;
    };
    categories: {
        data: Category[];
        title: string;
    };
    latestCourses: {
        data: Course[];
        title: string;
    };
    popularCourses: {
        data: Course[];
        title: string;
    };
    coursesList: {
        title: string;
        data: Course[];
        page: number;
        pageSize: number;
        totalPages: number;
    };
}
