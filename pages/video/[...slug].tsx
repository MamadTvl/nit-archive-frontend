import type {
    GetStaticPaths,
    GetStaticPathsResult,
    GetStaticProps,
    GetStaticPropsResult,
    NextPage,
} from 'next';
import Head from 'next/head';
import { Course, Video } from '../../src/types';
import getConfig from 'next/config';
import { Box } from '@mui/system';
import { Grid, Skeleton, Typography } from '@mui/material';
import ProvidePlayer from '../../src/components/player/context/PlayerContext';
import Wall from '../../src/components/layout/utils/Wall';
import Title from '../../src/components/title/Title';
import VideoText from '../../src/components/video/video-text/VideoText';
import Section from '../../src/components/layout/section/Section';
import AccordionItem from '../../src/components/accordion/AccordionItem';
import CourseAccordionContent from '../../src/components/accordion/CourseAccordionContent';
import dynamic from 'next/dynamic';
import useSWR, { SWRConfig } from 'swr';
import axios from '../../src/utils/axios';
import { getCookie } from '../../src/utils/cookie';
import Image from 'next/image';
import { Api } from '@/api/index';
import React from 'react';

const Player = dynamic(
    () => import('../../src/components/player/components/Player'),
    {
        ssr: false,
        loading: () => <VideoSkeleton />,
    }
);

const VideoSkeleton = () => {
    return (
        <Skeleton
            variant='rectangular'
            width={'100%'}
            sx={{
                borderRadius: 2,
                height: {
                    xs: 213,
                    sm: 418,
                },
            }}
        />
    );
};
const { serverRuntimeConfig } = getConfig();

const VideoPage: NextPage<VideoProps> = (props) => {
    const videoId = props.video.id.toString();
    const videoSrcKey = Api.Instance.getUrl((e) => e.video.src, {
        slug: videoId,
    });
    const { data, error, isLoading } = useSWR(videoSrcKey, () =>
        Api.Instance.getVideoSrc(props.video.id)
    );

    return (
        <>
            <Head>
                <title>{props.seo.title}</title>
                <meta name='description' content={props.seo.description} />
            </Head>
            <ProvidePlayer>
                <Section
                    sx={{
                        maxWidth: '744px!important',
                        pl: '0px!important',
                        pr: '0px!important',
                        m: 'auto',
                    }}
                    boxProps={{ position: 'relative' }}>
                    <Wall />
                    <Typography
                        align={'center'}
                        variant='subtitle1'
                        color={'text.light'}>
                        {props.course.title}
                    </Typography>
                    <Typography
                        align={'center'}
                        sx={{ mt: 1.5 }}
                        variant='h3'
                        color={'text.secondary'}>
                        {props.video.title}
                    </Typography>
                    <Box display={'block'} sx={{ mt: 6 }}>
                        {data?.videoFile ? (
                            // @ts-ignore
                            <Player
                                src={data?.videoFile || ''}
                                poster={
                                    props.course.media.featuredUri ??
                                    '/not-found'
                                }
                            />
                        ) : data?.aparatIframe ? (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: data.aparatIframe,
                                }}></div>
                        ) : isLoading ? (
                            <VideoSkeleton />
                        ) : (
                            <Box
                                position={'relative'}
                                width={'100%'}
                                display={'flex'}
                                justifyContent={'center'}
                                flexDirection={'column'}
                                height={{
                                    xs: 200,
                                    sm: 418,
                                }}>
                                <Image
                                    src={
                                        props.course.media.featuredUri ??
                                        '/not-found'
                                    }
                                    alt={props.video.title}
                                    objectFit={'cover'}
                                    layout={'fill'}
                                    className={'image-border'}
                                />
                                <Box
                                    sx={{
                                        inset: 0,
                                        filter: 'blur(5px)',
                                        position: 'absolute',
                                        zIndex: 1,
                                        backgroundColor: 'rgba(15,23,42,0.6)',
                                        borderRadius: 2,
                                    }}
                                />
                                <Typography
                                    variant={'h5'}
                                    color={'white'}
                                    sx={{ zIndex: 2 }}
                                    align={'center'}>
                                    {`برای مشاهدۀ این ویدیو، عضو دوره شوید`}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Section>
                <Section
                    sx={{
                        maxWidth: '744px!important',
                        pl: '0px!important',
                        pr: '0px!important',
                        m: 'auto',
                    }}>
                    <Title title={props.staticContent.topicTitle} />
                    <Grid container spacing={1}>
                        {props.course.topics.map((topic, index) => (
                            <Grid item xs={12} key={index}>
                                <AccordionItem
                                    topic={topic}
                                    index={index}
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
            </ProvidePlayer>
        </>
    );
};

const fetcher = async (url: string, isClientSide = false): Promise<Video> => {
    let token = '';
    if (isClientSide) {
        token = getCookie('shenovid-token', document.cookie);
        if (token === '') {
            return Promise.reject(new Error('No token found'));
        }
    }
    return axios
        .get<VideoApiResult>(url, {
            headers: {
                Authorization: isClientSide && `Bearer ${token}`,
            },
        })
        .then((res) => res.data.video);
};

export const getStaticPaths: GetStaticPaths = (): GetStaticPathsResult => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async (
    context
): Promise<GetStaticPropsResult<VideoProps>> => {
    const { params } = context;
    if (!params) {
        return {
            notFound: true,
        };
    }
    const [courseSlug, videoSlug] = params['slug'] as string[];
    const [video, course] = await Promise.all([
        Api.Instance.getVideo(+videoSlug),
        Api.Instance.getCourse(courseSlug),
    ]);
    if (!video || !course) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            seo: {
                title: video.title,
                description: '',
            },
            video,
            course,
            staticContent: {
                videoTextTitle: 'متن ویدیو',
                collapsedButtonText: 'مشاهده جزئیات',
                expandedButtonText: 'بستن',
                topicTitle: 'سرفصل‌ها',
            },
        },
        revalidate: 120,
    };
};

export interface VideoProps {
    seo: {
        title: string;
        description: string;
    };
    staticContent: {
        videoTextTitle: string;
        collapsedButtonText: string;
        expandedButtonText: string;
        topicTitle: string;
    };
    video: Video;
    course: Required<Course>;
}

interface VideoApiResult {
    video: Video;
}

export default VideoPage;
