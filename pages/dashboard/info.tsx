import { Grid } from '@mui/material';
import { GetStaticProps, GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import Section from '../../src/components/layout/section/Section';
import Wall from '../../src/components/layout/utils/Wall';
import Title from '../../src/components/title/Title';
import {
    InfoBoxProps,
    UserInfoType,
} from '../../src/components/user/components/dashboard/types';
import InfoBox from '../../src/components/user/components/dashboard/info/InfoBox';
import { useUserStore } from '@/components/user/store/store';

const Info: NextPage<InfoProps> = ({ title }) => {
    const [user, loading, openLoginDialog] = useUserStore((s) => [
        s.user,
        s.loading,
        s.openLoginDialog,
    ]);

    useEffect(() => {
        if (loading) {
            return;
        }
        if (!user) {
            openLoginDialog(true);
        }
    }, [loading, openLoginDialog, user]);

    const items: InfoBoxProps[] = [
        {
            title: 'نام و نام خانوادگی',
            type: UserInfoType.NAME,
            editable: true,
            onEdit: () => {},
        },
        {
            title: 'ایمیل',
            type: UserInfoType.EMAIL,
            editable: false,
        },
        {
            title: 'شماره تلفن همراه',
            type: UserInfoType.PHONE,
            editable: false,
        },
        {
            title: 'رمزعبور',
            type: UserInfoType.PASSWORD,
            editable: false,
        },
    ];

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
                    <Grid container item xs={12} spacing={3}>
                        {items.map((item, index) => (
                            <Grid key={index} item xs={12} sm={6}>
                                <InfoBox {...item} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Section>
        </>
    );
};

export const getStaticProps: GetStaticProps =
    (): GetStaticPropsResult<InfoProps> => {
        return {
            props: {
                title: 'اطلاعات کاربری',
            },
        };
    };
export default Info;

export interface InfoProps {
    title: string;
}
