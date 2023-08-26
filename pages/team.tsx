import { GetStaticProps, GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import Section from '../src/components/layout/section/Section';
import { TextBox } from '../src/types';
import { Box, Grid, Typography } from '@mui/material';
import Wall from '../src/components/layout/utils/Wall';
import Image from 'next/image';

const Team: NextPage<TeamProps> = ({ seo, members, textBoxes }) => (
    <>
        <Head>
            <title>{seo.title}</title>
            <meta name='description' content={seo.description} />
        </Head>
        <Section
            sx={{
                maxWidth: '744px!important',
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
                pl: '0px!important',
                pr: '0px!important',
                m: 'auto',
                position: 'relative',
            }}>
            <Grid
                container
                columnSpacing={{ xs: 1.5, sm: 2.25 }}
                rowSpacing={{ xs: 2, sm: 5.375 }}>
                {members.map((member, index) => (
                    <Grid
                        item
                        // container
                        key={index}
                        xs={6}
                        sm={3}>
                        <Image
                            src={member.image.src}
                            alt={member.image.alt}
                            height={171}
                            width={171}
                            objectFit={'cover'}
                            className={'image-border-8'}
                        />
                        <Box
                            sx={{
                                mt: {
                                    xs: 1.5,
                                    sm: 2.25,
                                },
                            }}
                            display={'flex'}
                            alignItems={'center'}
                            flexDirection={'column'}
                            justifyContent={'space-between'}>
                            <Typography variant={'h5'} color={'text.secondary'}>
                                {member.name}
                            </Typography>
                            <Typography
                                sx={{ mt: '5px' }}
                                variant={'subtitle2'}
                                color={'text.secondary'}>
                                {member.position}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Section>
        <Section
            sx={{
                maxWidth: '744px!important',
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
    </>
);

export const getStaticProps: GetStaticProps =
    (): GetStaticPropsResult<TeamProps> => {
        return {
            props: {
                seo: {
                    title: 'درباره ما',
                    description: 'درباره ما',
                },
                textBoxes: [
                    {
                        subtitle: 'تیم تولید',
                        subtitleProps: {
                            variant: 'subtitle1',
                            color: 'text.light',
                            mb: 1.375,
                            align: 'center',
                        },
                        title: 'تیم تولید',
                        titleProps: {
                            variant: 'h1',
                            color: 'text.secondary',
                            mb: 6.25,
                            align: 'center',
                        },
                        body: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
                        bodyProps: {
                            variant: 'body1',
                            color: 'text.secondary',
                            align: 'center',
                        },
                    },
                    {
                        title: 'تیم تولید',
                        titleProps: {
                            variant: 'h3',
                            color: 'text.secondary',
                            mb: 6.25,
                            align: 'center',
                        },
                        body: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
                        bodyProps: {
                            variant: 'body1',
                            color: 'text.secondary',
                            align: 'center',
                        },
                    },
                ],
                members: [
                    {
                        image: {
                            src: 'https://api.shenovid.com/storage/820/excel.jpg',
                            alt: '',
                        },
                        name: 'محمد حسین زاده',
                        position: 'بازرسی و توسعه',
                    },
                    {
                        image: {
                            src: 'https://api.shenovid.com/storage/820/excel.jpg',
                            alt: '',
                        },
                        name: 'محمد حسین زاده',
                        position: 'بازرسی و توسعه',
                    },
                    {
                        image: {
                            src: 'https://api.shenovid.com/storage/820/excel.jpg',
                            alt: '',
                        },
                        name: 'محمد حسین زاده',
                        position: 'بازرسی و توسعه',
                    },
                    {
                        image: {
                            src: 'https://api.shenovid.com/storage/820/excel.jpg',
                            alt: '',
                        },
                        name: 'محمد حسین زاده',
                        position: 'بازرسی و توسعه',
                    },
                    {
                        image: {
                            src: 'https://api.shenovid.com/storage/820/excel.jpg',
                            alt: '',
                        },
                        name: 'محمد حسین زاده',
                        position: 'بازرسی و توسعه',
                    },
                ],
            },
        };
    };

export default Team;

interface Member {
    name: string;
    position: string;
    image: {
        src: string;
        alt: string;
    };
}

interface TeamProps {
    seo: {
        title: string;
        description: string;
    };
    textBoxes: Array<TextBox>;
    members: Array<Member>;
}
