import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import { FC } from 'react';
import { HomeProps } from '../../../../pages';
import Wall from '../../layout/utils/Wall';
import Link from '../../link/Link';

const HomeMeta: FC<HomeProps['header'] | HomeProps['footer']> = (props) => {
    return (
        <Grid
            container
            spacing={2}
            component={'section'}
            sx={{ position: 'relative', pb: 6 }}>
            <Wall />
            <Grid item xs={12} md={5}>
                <Grid
                    container
                    spacing={1}
                    justifyContent={'space-between'}
                    sx={{ height: '100%', pt: 8 }}>
                    <Grid item xs={12}>
                        <Typography
                            sx={{ textAlign: { md: 'inherit', xs: 'center' } }}
                            variant='h1'
                            color={'text.secondary'}>
                            {props.title}
                        </Typography>
                        <Typography
                            variant='subtitle1'
                            color={'text.light'}
                            sx={{
                                mt: 1,
                                textAlign: { md: 'inherit', xs: 'center' },
                            }}>
                            {props.subtitle}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Typography variant='body2' color={'text.secondary'}>
                            {props.description}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Link href={props.ctaButton.href}>
                            <Button
                                sx={{
                                    width: props.ctaButton.width,
                                    height: { xs: 42, md: 50 },
                                }}
                                variant='contained'
                                color={'secondary'}
                                disableElevation>
                                {props.ctaButton.text}
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={false} md={1} />
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    display: { xs: 'flex', md: 'block' },
                    justifyContent: { xs: 'center' },
                }}>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Image
                        src={props.image.src}
                        alt={props.image.alt}
                        height={404}
                        width={559}
                    />
                </Box>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <Image
                        src={props.image.src}
                        alt={props.image.alt}
                        height={180}
                        width={248}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} sx={{ display: { xs: 'block', md: 'none' } }}>
                <Typography
                    align={'center'}
                    variant='body2'
                    color={'text.secondary'}>
                    {props.description}
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                sx={{
                    display: { xs: 'flex', md: 'none' },
                    justifyContent: 'center',
                }}>
                <Link href={props.ctaButton.href}>
                    <Button
                        sx={{
                            width: { xs: 210, md: props.ctaButton.width },
                            height: { xs: 42, md: 50 },
                        }}
                        variant='contained'
                        color={'secondary'}>
                        {props.ctaButton.text}
                    </Button>
                </Link>
            </Grid>
        </Grid>
    );
};

export default HomeMeta;
