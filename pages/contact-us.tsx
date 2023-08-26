import { GetStaticProps, GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import Section from '../src/components/layout/section/Section';
import { Grid, Skeleton, Typography } from '@mui/material';
import Wall from '../src/components/layout/utils/Wall';
import dynamic from 'next/dynamic';
import ContactBox from '../src/components/box/ContactBox';

const Map = dynamic(() => import('../src/components/map/index'), {
    ssr: false,
    loading: () => (
        <Skeleton
            variant={'rectangular'}
            sx={{
                maxHeight: 400,
                height: '100%',
                width: '100%',
                borderRadius: 8,
                zIndex: 1,
            }}
        />
    ),
});

const Contact: NextPage<ContactProps> = (props) => (
    <>
        <Head>
            <title>{props.seo.title}</title>
            <meta name='description' content={props.seo.description} />
            <link
                rel='stylesheet'
                href='https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'
                integrity='sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=='
                crossOrigin=''
            />
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
            <Typography
                sx={{ mb: 1.375 }}
                variant={'subtitle1'}
                color={'text.light'}
                align={'center'}>
                {props.subtitle}
            </Typography>
            <Typography
                sx={{ mb: 6.25 }}
                variant={'h1'}
                color={'text.secondary'}
                align={'center'}>
                {props.title}
            </Typography>
            <Typography
                variant={'body1'}
                color={'text.secondary'}
                align={'center'}>
                {props.body}
            </Typography>
        </Section>
        <Section
            sx={{
                maxWidth: '744px!important',
                pl: '0px!important',
                pr: '0px!important',
                m: 'auto',
                pt: 8.75,
                pb: 8.75,
            }}>
            {/* @ts-ignore*/}
            <Map />
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
            <Grid container spacing={5} justifyContent={'space-between'}>
                {props.contactOptions.map((option, index) => (
                    <Grid
                        key={index}
                        item
                        xs={12}
                        sm={option.type === ContactOptionType.ADDRESS ? 12 : 6}>
                        <ContactBox {...option} />
                    </Grid>
                ))}
            </Grid>
        </Section>
    </>
);

export const getStaticProps: GetStaticProps =
    (): GetStaticPropsResult<ContactProps> => {
        return {
            props: {
                seo: {
                    title: 'درباره ما',
                    description: 'درباره ما',
                },
                subtitle: 'درباره ما',
                title: 'درباره ما',
                body: 'درباره ما',
                contactOptions: [
                    {
                        type: ContactOptionType.ONLINE_SUPPORT,
                        title: 'پشتیبانی آنلاین',
                        data: 'برو به پشتیبانی',
                    },
                    {
                        type: ContactOptionType.PHONE,
                        title: 'شماره تماس',
                        data: '021-77147367',
                    },
                    {
                        type: ContactOptionType.ADDRESS,
                        title: 'آدرس دفتر',
                        data: '',
                    },
                ],
            },
        };
    };

export default Contact;

export enum ContactOptionType {
    ONLINE_SUPPORT = 'ONLINE_SUPPORT',
    PHONE = 'PHONE',
    ADDRESS = 'ADDRESS',
}

export interface ContactOption {
    type: ContactOptionType;
    title: string;
    data: string;
}

export interface ContactProps {
    seo: {
        title: string;
        description: string;
    };
    subtitle: string;
    title: string;
    body: string;
    contactOptions: Array<ContactOption>;
}
