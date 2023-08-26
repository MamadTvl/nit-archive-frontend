import { Grid, Typography } from '@mui/material';
import { GetStaticProps, GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Section from '../src/components/layout/section/Section';
import Wall from '../src/components/layout/utils/Wall';
import { TextBox } from '../src/types';

const AboutUs: NextPage<AboutUsProps> = ({
    seo,
    coverImage,
    images,
    textBoxes,
}) => (
    <>
        <Head>
            <title>{seo.title}</title>
            <meta name='description' content={seo.description} />
        </Head>
        <Section
            sx={{
                maxWidth: '744px!important',
                pt: 6.625,
                pb: 6.625,
                pl: '0px!important',
                pr: '0px!important',
                m: 'auto',
                position: 'relative',
            }}>
            <Wall />
            <Typography {...textBoxes[0].subtitleProps}>
                {textBoxes[0].subtitle}
            </Typography>
            <Typography {...textBoxes[0].titleProps}>
                {textBoxes[0].title}
            </Typography>
            <Typography {...textBoxes[0].bodyProps}>
                {textBoxes[0].body}
            </Typography>
        </Section>
        <Section
            sx={{
                maxWidth: '744px!important',
                pt: 8.75,
                pb: 8.75,
                pl: '0px!important',
                pr: '0px!important',
                m: 'auto',
            }}>
            <Grid container spacing={{ xs: 2, md: 2.5 }}>
                {images.map((image, index) => (
                    <Grid item key={index} xs={6} sm={3}>
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={171}
                            height={171}
                            objectFit={'cover'}
                            className={'image-border-8'}
                        />
                    </Grid>
                ))}
            </Grid>
        </Section>
        <Section
            sx={{
                maxWidth: '744px!important',
                pt: 5,
                pb: 8.75,
                pl: '0px!important',
                pr: '0px!important',
                m: 'auto',
                position: 'relative',
            }}>
            <Wall />
            <Typography {...textBoxes[1].titleProps}>
                {textBoxes[1].title}
            </Typography>
            <Typography {...textBoxes[1].bodyProps}>
                {textBoxes[1].body}
            </Typography>
        </Section>
        <Section
            sx={{
                maxWidth: '744px!important',
                pt: 8.75,
                pb: 8.75,
                pl: '0px!important',
                pr: '0px!important',
                m: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Image
                src={coverImage.src}
                alt={coverImage.alt}
                width={744}
                height={171}
                objectFit={'cover'}
                className={'image-border-4'}
            />
        </Section>
        <Section
            sx={{
                maxWidth: '744px!important',
                pt: 5,
                pb: 8.75,
                pl: '0px!important',
                pr: '0px!important',
                m: 'auto',
                position: 'relative',
            }}>
            <Wall />
            <Typography {...textBoxes[2].titleProps}>
                {textBoxes[2].title}
            </Typography>
            <Typography {...textBoxes[2].bodyProps}>
                {textBoxes[2].body}
            </Typography>
        </Section>
    </>
);

export const getStaticProps: GetStaticProps = (): GetStaticPropsResult<AboutUsProps> => {
    return {
        props: {
            seo: {
                title: 'درباره ما',
                description: 'درباره ما',
            },
            textBoxes: [
                {
                    subtitle: 'درباره ما',
                    subtitleProps: {
                        sx: { pb: 1.375 },
                        align: 'center',
                        variant: 'subtitle1',
                        color: 'text.light',
                    },
                    title: 'آموزشی که یکسانه...',
                    titleProps: {
                        sx: { pb: 6.25 },
                        align: 'center',
                        variant: 'h1',
                        color: 'text.secondary',
                    },
                    body:
                        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
                    bodyProps: {
                        variant: 'body1',
                        align: 'center',
                        color: 'text.secondary',
                    },
                },
                {
                    title: 'آموزشی که یکسانه...',
                    titleProps: {
                        sx: { pb: 2.5 },
                        align: 'center',
                        variant: 'h3',
                        color: 'text.secondary',
                    },
                    body:
                        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
                    bodyProps: {
                        variant: 'body1',
                        align: 'center',
                        color: 'text.secondary',
                    },
                },
                {
                    title: 'آموزشی که یکسانه...',
                    titleProps: {
                        sx: { pb: 2.5 },
                        align: 'center',
                        variant: 'h3',
                        color: 'text.secondary',
                    },
                    body:
                        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
                    bodyProps: {
                        variant: 'body1',
                        align: 'center',
                        color: 'text.secondary',
                    },
                },
            ],
            images: [
                {
                    src: 'https://api.shenovid.com/storage/820/excel.jpg',
                    alt: '',
                },
                {
                    src: 'https://api.shenovid.com/storage/820/excel.jpg',
                    alt: '',
                },
                {
                    src: 'https://api.shenovid.com/storage/820/excel.jpg',
                    alt: '',
                },
                {
                    src: 'https://api.shenovid.com/storage/820/excel.jpg',
                    alt: '',
                },
            ],
            coverImage: {
                src: 'https://api.shenovid.com/storage/820/excel.jpg',
                alt: '',
            },
        },
    };
};

export default AboutUs;

interface AboutUsProps {
    seo: {
        title: string;
        description: string;
    };
    textBoxes: TextBox[];
    images: Array<{
        src: string;
        alt: string;
    }>;
    coverImage: { src: string; alt: string };
}
