import { Grid, Pagination, PaginationItem } from '@mui/material';
import React, { useMemo } from 'react';
import useSWR from 'swr';
import getConfig from 'next/config';
import { CoursesApiResult, CoursesProps } from '../../../pages/courses';
import { useRouter } from 'next/router';
import CourseCard from '../card/CourseCard';
import { Course } from '../../types';
import CourseSkeletonCard from '../card/CourseSkeletonCard';
import Link from '../link/Link';
import MobileCourseCard from '../card/MobileCourseCard';
import MobileCourseSkeletonCard from '../card/MobileCourseSkeletonCard';
import { Api, CourseListResponse } from '@/api/index';

const { publicRuntimeConfig } = getConfig();
const fetcher = (url: string) => fetch(url).then((r) => r.json());

const CourseList: React.FC<CoursesProps['coursesList']> = (props) => {
    const router = useRouter();

    const url = Api.Instance.getUrl((e) => e.course.get, {
        query: {
            page:
                (router.query.page as string | undefined) ||
                props.page.toString(),
            type: 'list',
        },
    });
    //@ts-ignore
    const { data } = useSWR<CourseListResponse | null>(
        url,
        () =>
            Api.Instance.getCourseList({
                page:
                    (router.query.page as string | undefined) ||
                    (props.page as number).toString(),
                sort: 'newest',
            }),
        {
            fallbackData: props.data,
        }
    );

    const currentPage: number = +(router.query.page || props.page);

    const iterableData: Course[] | undefined = useMemo(() => {
        if (currentPage === 1) {
            return props.data;
        } else {
            return data?.courses?.data || undefined;
        }
    }, [currentPage, data?.courses?.data, props.data]);

    return (
        <Grid container columnSpacing={0} rowSpacing={2}>
            {iterableData?.map((course, index) => (
                <React.Fragment key={index}>
                    <Grid
                        display={{ xs: 'none', sm: 'block' }}
                        item
                        xs
                        md
                        sm
                        lg={3}>
                        <CourseCard sx={{ m: 'auto' }} course={course} />
                    </Grid>
                    <Grid display={{ xs: 'block', sm: 'none' }} item xs={12}>
                        <MobileCourseCard sx={{ m: 'auto' }} course={course} />
                    </Grid>
                </React.Fragment>
            ))}
            {!iterableData &&
                Array.from({ length: props.pageSize }).map((_, index) => (
                    <React.Fragment key={index}>
                        <Grid
                            display={{ xs: 'none', sm: 'block' }}
                            item
                            xs
                            md
                            sm
                            lg={3}>
                            <CourseSkeletonCard sx={{ m: 'auto' }} />
                        </Grid>
                        <Grid
                            display={{ xs: 'block', sm: 'none' }}
                            item
                            xs={12}>
                            <MobileCourseSkeletonCard />
                        </Grid>
                    </React.Fragment>
                ))}
            {props.totalPages > 1 && (
                <Grid
                    item
                    xs={12}
                    sx={{ mt: 6.5 }}
                    display={'flex'}
                    justifyContent={'center'}>
                    <Pagination
                        count={props.totalPages}
                        boundaryCount={1}
                        siblingCount={1}
                        defaultPage={currentPage}
                        page={currentPage}
                        variant={'outlined'}
                        color={'primary'}
                        shape={'rounded'}
                        renderItem={(item) => {
                            return (
                                <PaginationItem
                                    component={Link}
                                    href={{
                                        pathname: router.pathname,
                                        query: {
                                            ...router.query,
                                            page: item.page,
                                        },
                                        hash: 'list',
                                    }}
                                    shallow={true}
                                    {...item}
                                    sx={(theme) => ({
                                        borderRadius: 2,
                                        width: 40,
                                        height: 40,
                                        transition: 'all .3s',
                                        ...(item.type === 'page'
                                            ? {
                                                  border: '1px solid',
                                                  borderColor: 'primary.main',
                                                  color: 'text.dark',
                                                  '&:hover': {
                                                      border: '1px solid transparent!important',
                                                      backgroundColor:
                                                          theme.palette.primary
                                                              .main +
                                                          '!important',
                                                      color: 'white!important',
                                                  },
                                              }
                                            : {
                                                  ...((item.type === 'next' ||
                                                      item.type ===
                                                          'previous') && {
                                                      color: item.disabled
                                                          ? 'text.light'
                                                          : 'text.secondary',
                                                      borderRadius: '50%',
                                                  }),
                                              }),
                                        ...(item.selected
                                            ? {
                                                  border: '1px solid transparent!important',
                                                  backgroundColor:
                                                      theme.palette.primary
                                                          .main + '!important',
                                                  color: 'white!important',
                                              }
                                            : {}),
                                    })}
                                    variant={
                                        item.type === 'page'
                                            ? 'outlined'
                                            : 'text'
                                    }
                                />
                            );
                        }}
                    />
                </Grid>
            )}
        </Grid>
    );
};

export default CourseList;
