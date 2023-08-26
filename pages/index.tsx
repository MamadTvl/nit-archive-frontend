import type { GetStaticProps, GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import { Category, Course, Rating } from '../src/types';
import getConfig from 'next/config';
import HomeMeta from '../src/components/home/meta/HomeMeta';
import CoursesSlider from '../src/components/slider/CoursesSlider';
import Attributes from '../src/components/home/meta/Attributes';
import CategorySection from '../src/components/category/container';
import { Api } from '@/api/index';

const { serverRuntimeConfig } = getConfig();

const Home: NextPage<HomeProps> = (props) => {
    return (
        <>
            <Head>
                <title>{props.seo.title}</title>
                <meta name='description' content={props.seo.description} />
            </Head>
            <HomeMeta {...props.header} />
            <CoursesSlider
                title={props.latestCourses.title}
                courses={props.latestCourses.courses}
            />
            <Attributes {...props.meta} />
            <CoursesSlider
                title={props.popularCourses.title}
                courses={props.popularCourses.courses}
            />
            <CategorySection
                categories={props.categories}
                title={'موضوعات منتخب'}
            />
            <HomeMeta {...props.footer} />
        </>
    );
};

export const getStaticProps: GetStaticProps = async (
    context
): Promise<GetStaticPropsResult<HomeProps>> => {
    const [newestCourses, popularCourses, categories] = await Promise.all([
        Api.Instance.getCourseSlider('newest'),
        Api.Instance.getCourseSlider('most-wanted'),
        Api.Instance.getCategories(),
    ]);

    return {
        props: {
            seo: {
                title: 'نیت‌آرشیو |‌ فرکانس یادگیری بدون مرز',
                description:
                    'نیت‌آرشیو یک پلتفرم یادگیریه که به صورت تخصصی  طراحی شده. ایجاد حس خوب آموزش و پیشرفت در کنار هم مهم‌ترین هدفیه که ما با برای رسیدن به اون تلاش می‌کنیم.',
            },
            header: {
                title: 'فرکانس یادگیری بدون مرز',
                subtitle: 'پلتفرمی برای ایجاد حس خوب',
                description:
                    'نیت‌آرشیو یک پلتفرم یادگیریه که به صورت تخصصی  طراحی شده. ایجاد حس خوب آموزش و پیشرفت در کنار هم مهم‌ترین هدفیه که ما با برای رسیدن به اون تلاش می‌کنیم.',
                ctaButton: {
                    href: '/courses',
                    text: 'ﭼﯽ دوﺳﺖ داری ﯾﺎد ﺑﮕﯿﺮی؟',
                    width: 240,
                },
                image: {
                    src: '/img/home/head.svg',
                    alt: '',
                    priority: true,
                },
            },
            latestCourses: {
                title: 'آخرین دوره‌ها',
                courses: newestCourses || [],
            },
            categories: categories,
            footer: {
                title: 'بهترین خودت باش!',
                subtitle: 'یادگرفتن هیچ پایانی نداره',
                description:
                    'از الان شروع کن یه مهارت جدید رو با نیـــت‌آرشیو یاد بگیر. ما هم پا به پای تو باهات پیش می‌آیم تا بتونی علمت رو کامل کنی و بتونی ازش استفاده و کسب درآمد کنی. ',
                ctaButton: {
                    href: '/courses',
                    text: 'بزن بریم!',
                    width: 110,
                },
                image: {
                    src: '/img/home/bottom.svg',
                    alt: '',
                    priority: false,
                },
            },
            meta: {
                title: 'بهترین خودت باش',
                attributes: [
                    {
                        title: 'یادگیری گام به گام',
                        description:
                            'همۀ دوره‌های نیت‌آرشیو به صورتی تهیۀ شدن که برای تمام افراد بیشترین بازده رو داشته باشن.',
                        image: {
                            src: '/img/home/attributes/1.svg',
                            alt: 'آموزش قدم به قدم',
                        },
                    },
                    {
                        title: 'همراهی تا مقصد',
                        description:
                            'اگه توی هر جا مشکلی برات به وجود اومد یا سوالی در مورد دوره داشتی می‌تونی از ما به صورت آنلاین بپرسی و خیلی سریع جواب بگیری.',
                        image: {
                            src: '/img/home/attributes/2.svg',
                            alt: 'همراهی تا مقصد',
                        },
                    },
                    {
                        title: 'ضمانت بازگشت وجه',
                        description:
                            'اگر حس کردی دوره‌ای که ثبت‌نام کردی به دردت نمی‌خوره یا به هر دلیلی پشیمون شدی می‌تونی به ما بگی و هزینه رو به طور کامل پس بگیری.',
                        image: {
                            src: '/img/home/attributes/3.svg',
                            alt: 'ضمانت بازگشت وجه',
                        },
                    },
                ],
            },
            popularCourses: {
                title: 'ﻣﺤﺒﻮب‌ﺗﺮﯾﻦ‌ دوره‌ﻫﺎ',
                courses: popularCourses || [],
            },
        },
        revalidate: 60,
    };
};

export interface HomeProps {
    seo: {
        title: string;
        description: string;
    };
    header: {
        title: string;
        subtitle: string;
        description: string;
        ctaButton: {
            href: string;
            text: string;
            width: number;
        };
        image: {
            src: string;
            alt: string;
            priority: boolean;
        };
    };
    latestCourses: {
        title: string;
        courses: Course[];
    };
    meta: {
        title: string;
        attributes: Array<{
            title: string;
            description: string;
            image: {
                src: string;
                alt: string;
            };
        }>;
    };
    popularCourses: {
        title: string;
        courses: Course[];
    };
    categories: Category[];
    footer: {
        title: string;
        subtitle: string;
        description: string;
        ctaButton: {
            href: string;
            text: string;
            width: number;
        };
        image: {
            src: string;
            alt: string;
            priority: boolean;
        };
    };
}

export default Home;
