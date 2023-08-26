import {
    Box,
    CircularProgress,
    Grid,
    SxProps,
    Typography,
} from '@mui/material';
import { Theme } from '@mui/system';
import Image from 'next/image';
import { useCallback } from 'react';
import usePost from '../../../../hooks/usePost';
import { Course } from '../../../../types';
import { separateDigit } from '../../../../utils/convertDigits';
import { getCookie } from '../../../../utils/cookie';
import ClockIcon from '../../../icons/ClockIcon';
import PriceIcon from '../../../icons/PriceIcon';
import TrashIcon from '../../../icons/TrashIcon';
import { setCart } from '../../context/action';
import { RemoveFromCartApiResult } from '../../context/types';
import { useUser } from '../../context/UserContext';
import { useSnackbar } from 'notistack';

const CartItem: React.FC<CartItemProps> = ({ course }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { store, dispatch } = useUser();
    const { post, loading } = usePost<
        RemoveFromCartApiResult,
        RemoveFromCartApiResult
    >({
        url: `/purchase/cart/remove/${course.id}`,
        onSuccess: (data) => {
            dispatch(
                setCart(
                    store.cartDetails.localCart.filter(
                        (item) => item.id !== course.id
                    )
                )
            );
            enqueueSnackbar(data.message, { variant: 'success' });
        },
        onError: (data) => {
            enqueueSnackbar(data?.message || 'unexpected error', {
                variant: 'error',
            });
        },
        body: {},
        config: {
            headers: {
                Authorization: `Bearer ${getCookie(
                    'shenovid-token',
                    document.cookie
                )}`,
            },
        },
    });

    const handleRemoveFromCart = useCallback(() => {
        if (!loading && !store.isLoading) {
            if (store.isLoggedIn) {
                post(true);
            } else {
                dispatch(
                    setCart(
                        store.cartDetails.localCart.filter(
                            (item) => item.id !== course.id
                        )
                    )
                );
            }
        }
    }, [
        course.id,
        dispatch,
        loading,
        post,
        store.cartDetails.localCart,
        store.isLoading,
        store.isLoggedIn,
    ]);

    const priceContainerSx: SxProps<Theme> = (theme) => ({
        '& path': {
            fill: theme.palette.text.light,
        },
        '& svg': {
            width: 15,
            height: 16,
        },
    });

    return (
        <Grid
            container
            sx={{
                pl: {
                    xs: 1.5,
                    sm: 4,
                },
                pr: {
                    xs: 1.5,
                    sm: 2.2,
                },
                mb: { xs: 1.5, sm: 2 },
                height: 100,
                width: '100%',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'primary.main',
            }}>
            <Grid item xs={4} sm={1} display={'flex'} alignItems={'center'}>
                <Box display={{ xs: 'flex', sm: 'none' }}>
                    <Image
                        src={course.media_urls.featured_images?.main || ''}
                        alt={''}
                        width={72}
                        height={72}
                        objectFit={'cover'}
                        className={'image-border-8'}
                    />
                </Box>
                <Box display={{ xs: 'none', sm: 'flex' }}>
                    <Image
                        src={course.media_urls.featured_images?.main || ''}
                        alt={''}
                        width={64}
                        height={64}
                        objectFit={'cover'}
                        className={'image-border-8'}
                    />
                </Box>
            </Grid>
            <Grid
                item
                xs={6}
                sm={4}
                display={'flex'}
                flexDirection={{ xs: 'column', sm: 'row' }}
                justifyContent={{ xs: 'space-evenly', sm: 'flex-start' }}
                alignItems={{ xs: 'flex-start', sm: 'center' }}>
                <Typography
                    sx={{ mr: { sm: 4.85 } }}
                    variant='h5'
                    color={'text.dark'}>
                    {course.title}
                </Typography>
                <Box
                    sx={priceContainerSx}
                    display={{ xs: 'flex', sm: 'none' }}
                    alignItems={'center'}>
                    <PriceIcon />
                    <Typography
                        sx={{ mr: 1 }}
                        variant='body2'
                        color={'text.secondary'}>
                        {`${separateDigit(course.price)} تومان`}
                    </Typography>
                </Box>
            </Grid>
            <Grid
                item
                xs={3}
                display={{ xs: 'none', sm: 'flex' }}
                alignItems={'center'}>
                <ClockIcon />
                <Typography
                    sx={{ mr: 1 }}
                    variant='body2'
                    color={'text.secondary'}>
                    {`${Math.round(course.length / 3600)} ساعت`}
                </Typography>
            </Grid>
            <Grid
                sx={priceContainerSx}
                item
                xs={3}
                display={{ xs: 'none', sm: 'flex' }}
                alignItems={'center'}>
                <PriceIcon />
                <Typography
                    sx={{ mr: 1 }}
                    variant='body2'
                    color={'text.secondary'}>
                    {`${separateDigit(course.price)} تومان`}
                </Typography>
            </Grid>
            <Grid
                item
                xs={2}
                sm={1}
                display={'flex'}
                alignItems={'flex-end'}
                justifyContent={{ xs: 'flex-end', sm: 'center' }}
                flexDirection={'column'}>
                <Box
                    onClick={handleRemoveFromCart}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    sx={{
                        cursor: 'pointer',
                        borderRadius: 2,
                        width: {
                            xs: 32,
                            sm: 40,
                        },
                        height: {
                            xs: 32,
                            sm: 40,
                        },
                        '& .trash': {
                            width: {
                                xs: 12.8,
                                sm: 16,
                            },
                            height: {
                                xs: 16,
                                sm: 20,
                            },
                        },
                        backgroundColor: 'text.BG',
                        transition: 'all .3s',
                        mb: {
                            xs: 1.5,
                            sm: 0,
                        },
                        '&:hover': {
                            backgroundColor: 'text.light',
                        },
                    }}>
                    {loading ? (
                        <CircularProgress
                            sx={{
                                width: {
                                    xs: '20px!important',
                                    sm: '24px!important',
                                },
                                height: {
                                    xs: '20px!important',
                                    sm: '24px!important',
                                },
                            }}
                        />
                    ) : (
                        <TrashIcon />
                    )}
                </Box>
            </Grid>
        </Grid>
    );
};

interface CartItemProps {
    course: Course;
}

export default CartItem;
