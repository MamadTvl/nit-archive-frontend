import { Box, Grid } from '@mui/material';
import { ImageProps } from 'next/image';
import Info from './items/Info';
import License from './items/License';
import LinkAccordion from './items/LinkAccordion';
import LinkBox, { LinkBoxProps } from './items/LinkBox';
import { useMemo } from 'react';
import { useUserStore } from '@/components/user/store/store';

const links: LinkBoxProps[] = [
    {
        title: 'دسترسی',
        links: [
            {
                href: '/courses',
                text: 'دوره‌ها',
            },
        ],
    },
    {
        title: 'دربارۀ ما',
        links: [
            {
                href: '/team',
                text: 'خانواده',
            },
            {
                href: '/about-us',
                text: 'داستان',
            },
            {
                href: '/contact-us',
                text: 'تماس',
            },
            {
                href: '/work-with-us',
                text: 'همکاری',
            },
        ],
    },
];

const licenses: ImageProps[] = [
    {
        src: '/img/license/enamad.png',
        alt: 'enamd',
        width: 80,
        height: 80,
    },
    {
        src: '/img/license/pasargad.png',
        alt: 'pasargad',
        width: 80,
        height: 80,
    },
    {
        src: '/img/license/satra.png',
        alt: 'satra',
        width: 80,
        height: 80,
    },
];
const Footer = () => {
    const [user, openLoginDialog] = useUserStore((s) => [
        s.user,
        s.openLoginDialog,
    ]);
    const linkItems: LinkBoxProps[] = useMemo(() => {
        return [
            ...links,
            {
                title: 'کاربران',
                links: [
                    user
                        ? {
                              href: '/dashboard/my-courses',
                              text: 'دوره های من',
                          }
                        : {
                              action: () => {
                                  openLoginDialog(true);
                              },
                              text: 'ورود یا ثبت‌نام',
                          },
                    {
                        text: 'پشتیبانی آنلاین',
                        action: () => {},
                    },
                ],
            },
        ];
    }, [user, openLoginDialog]);
    return (
        <Box
            sx={(theme) => ({
                overflow: 'hidden',
                [theme.breakpoints.up('xl')]: {
                    maxWidth: 1366,
                    m: 'auto',
                    pl: '120px',
                    pr: '120px',
                },
                [theme.breakpoints.down('xl')]: {
                    pl: '120px',
                    pr: '120px',
                },
                [theme.breakpoints.down('lg')]: {
                    pl: '40px',
                    pr: '40px',
                },
                [theme.breakpoints.down('md')]: {
                    pl: '20px',
                    pr: '20px',
                },
                pt: 8,
                pb: 5.5,
            })}
            component={'footer'}>
            <Grid container columnSpacing={5.5}>
                <Grid item xs={12} sm={3}>
                    <Info
                        address='مــازنـدران، بابل، خیـابان شریعتــی، دانشـــگاه صنعتـــی نوشیروانـــی بابل '
                        description='نیـــت‌آرشیو یک پلتفرم آموزشی مختص بچه های ایران است که از ابتدای سال 1402 خدمت‌رسانی خود را آغاز کرده است.'
                        phone='71057814-021'
                        socialMedia={[]}
                    />
                </Grid>
                <Grid
                    item
                    container
                    display={{ xs: 'none', sm: 'flex' }}
                    xs={6}>
                    {linkItems.map((item, index) => (
                        <Grid
                            sx={{
                                ...(index === 0
                                    ? {
                                          borderRight: '1px solid',
                                          borderLeft: '1px solid',
                                          borderColor: 'text.light',
                                      }
                                    : {
                                          borderLeft: '1px solid',
                                          borderColor: 'text.light',
                                      }),
                            }}
                            key={index}
                            item
                            xs={4}>
                            <LinkBox {...item} />
                        </Grid>
                    ))}
                </Grid>
                <Grid
                    sx={{ pt: 2 }}
                    item
                    container
                    xs={12}
                    display={{ xs: 'block', sm: 'none' }}>
                    {linkItems.map((item, index) => (
                        <LinkAccordion
                            key={index}
                            {...item}
                            sx={
                                index % 2 === 1
                                    ? {
                                          border: 'none',
                                      }
                                    : {}
                            }
                        />
                    ))}
                </Grid>
                <Grid item xs={12} sm={3}>
                    <License licenses={licenses} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;
