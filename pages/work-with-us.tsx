import { GetStaticProps, GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import Section from '../src/components/layout/section/Section';
import Wall from '../src/components/layout/utils/Wall';
import { Typography } from '@mui/material';
import WorkWithUsForm from '../src/components/form/WorkWithUsForm';

const WorkWithUs: NextPage<WorkWithUsProps> = (props) => (
    <>
        <Head>
            <title>{props.seo.title}</title>
            <meta name='description' content={props.seo.description} />
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
            }}>
            <WorkWithUsForm form={props.form} />
        </Section>
    </>
);

export const getStaticProps: GetStaticProps =
    (): GetStaticPropsResult<WorkWithUsProps> => {
        return {
            props: {
                seo: {
                    title: 'درباره ما',
                    description: 'درباره ما',
                },
                subtitle: 'درباره ما',
                title: 'درباره ما',
                body: 'درباره ما',
                form: [
                    {
                        title: 'نام و نام خانوادگی',
                        type: WorkWithUsFormType.name,
                    },
                    {
                        title: 'شماره تماس',
                        type: WorkWithUsFormType.phone,
                    },
                    {
                        title: 'متن پیام',
                        type: WorkWithUsFormType.message,
                    },
                ],
            },
        };
    };

export default WorkWithUs;

export enum WorkWithUsFormType {
    name = 'name',
    phone = 'phone',
    message = 'message',
}

export interface WorkWithUsTextField {
    title: string;
    type: WorkWithUsFormType;
    placeholder?: string;
}

interface WorkWithUsProps {
    seo: {
        title: string;
        description: string;
    };
    subtitle: string;
    title: string;
    body: string;
    form: WorkWithUsTextField[];
}
