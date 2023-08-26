import { FormEvent, useCallback, useEffect, useState } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    InputAdornment,
    Typography,
} from '@mui/material';
import usePost from '../../../../hooks/usePost';
import { separateDigit } from '../../../../utils/convertDigits';
import FilledInput from '../../../styled-components/FilledInput';
import {
    ApplyDiscountApiResult,
    FinishOrderApiResult,
} from '../../context/types';
import { useUser } from '../../context/UserContext';
import { AxiosRequestConfig } from 'axios';
import { getCookie } from '../../../../utils/cookie';
import { setCartDetails, showLoginDialog } from '../../context/action';
import { useSnackbar } from 'notistack';

const CartAction = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { store, dispatch } = useUser();
    const [discountCode, setDiscountCode] = useState('');
    const [config, setConfig] = useState<AxiosRequestConfig>({});
    const [showDiscountSnackbar, setShowDiscountSnackbar] = useState(true);
    // ADVISE: you can use just one usePost hook for all the api calls (but this works just fine)
    const { post: postDiscountCode, loading: postDiscountLoading } = usePost<
        ApplyDiscountApiResult,
        { message?: string }
    >({
        url: '/purchase/cart/discount',
        body: {
            discount_code: discountCode,
        },
        config: config,
        onSuccess: (data) => {
            showDiscountSnackbar &&
                enqueueSnackbar(data.message, { variant: 'success' });
            const totalPrice =
                store.cartDetails.itemsPrice - data.discount_amount;
            dispatch(
                setCartDetails({
                    verifiedDiscount: discountCode,
                    discount: data.discount_amount,
                    totalPrice: totalPrice < 0 ? 0 : totalPrice,
                })
            );
        },
        onError: (data) => {
            enqueueSnackbar(data?.message || 'unexpected error', {
                variant: 'error',
            });
        },
    });

    const { post: finishOrder, loading: finishOrderLoading } = usePost<
        FinishOrderApiResult,
        { message: string }
    >({
        url: '/purchase/cart/order',
        body: {
            discount_code: store.cartDetails.verifiedDiscount || '',
        },
        config: config,
        onSuccess: (data) => {
            enqueueSnackbar(data.message, { variant: 'success' });
            window.location.href = data.payment_link;
        },
        onError: (data) => {
            enqueueSnackbar(data?.message || 'unexpected error', {
                variant: 'error',
            });
        },
    });

    useEffect(() => {
        if (store.cartDetails.verifiedDiscount) {
            setConfig({
                headers: {
                    Authorization: `Bearer ${getCookie(
                        'shenovid-token',
                        document.cookie
                    )}`,
                },
            });
            postDiscountCode(true);
            setShowDiscountSnackbar(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.cartDetails.localCart]);

    useEffect(() => {
        return () => {
            dispatch(
                setCartDetails({
                    verifiedDiscount: null,
                })
            );
        };
    }, [dispatch, store.cartDetails.verifiedDiscount]);

    const handleSubmitDiscountCode = (event: FormEvent) => {
        event.preventDefault();
        setConfig({
            headers: {
                Authorization: `Bearer ${getCookie(
                    'shenovid-token',
                    document.cookie
                )}`,
            },
        });
        postDiscountCode(true);
    };

    const handleFinishOrder = useCallback(() => {
        if (store.isLoggedIn) {
            const utm_source = getCookie('utm_source', document.cookie);
            setConfig({
                headers: {
                    Authorization: `Bearer ${getCookie(
                        'shenovid-token',
                        document.cookie
                    )}`,
                    ...(utm_source ? { 'X-Utm-Source': utm_source } : {}),
                },
            });
            finishOrder(true);
        } else {
            dispatch(showLoginDialog(true));
        }
    }, [dispatch, finishOrder, store.isLoggedIn]);

    const discountDisabled =
        postDiscountLoading ||
        store.isLoading ||
        !store.isLoggedIn ||
        store.user?.cart_model?.courses.length === 0 ||
        store.cartDetails.localCart.length === 0;

    const orderButtonDisabled =
        postDiscountLoading ||
        finishOrderLoading ||
        store.isLoading ||
        store.user?.cart_model?.courses.length === 0 ||
        store.cartDetails.localCart.length === 0;
    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Box
                height={{ xs: 128, sm: 'auto' }}
                sx={{
                    pt: {
                        xs: 3,
                        sm: 2.5,
                    },
                    pb: {
                        xs: 3,
                        sm: 2.5,
                    },
                    mt: { xs: 1.5, sm: 3 },
                    borderTop: '2px solid',
                    borderBottom: '2px solid',
                    borderColor: 'text.light',
                }}
                display={'flex'}
                flexDirection={{ xs: 'column', sm: 'row' }}
                justifyContent={'space-between'}
                alignItems={'center'}>
                <Box
                    display={'flex'}
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    justifyContent={{ xs: 'space-around', sm: 'space-between' }}
                    width={{ xs: '100%', sm: 'auto' }}
                    flexBasis={{ xs: '100%', sm: '45%' }}
                    maxWidth={{ xs: '100%', sm: '45%' }}>
                    <Typography color={'text.primary'} variant='body2'>
                        {'هزینۀ دوره‌ها:'}
                        <Typography
                            sx={{ mr: { xs: 1.5, sm: 1.75 } }}
                            color={'text.dark'}
                            variant='body2'
                            component={'span'}>
                            {`${separateDigit(
                                store.cartDetails.itemsPrice
                            )} تومان`}
                        </Typography>
                    </Typography>
                    <Typography color={'text.primary'} variant='body2'>
                        {'تخفیف:'}
                        <Typography
                            sx={{ mr: { xs: 1.5, sm: 1.75 } }}
                            color={'text.dark'}
                            variant='body2'
                            component={'span'}>
                            {`${separateDigit(
                                store.cartDetails.discount
                            )} تومان`}
                        </Typography>
                    </Typography>
                </Box>
                <Box
                    onSubmit={handleSubmitDiscountCode}
                    component={'form'}
                    display={'flex'}
                    width={{ xs: '100%', sm: 250 }}>
                    <FilledInput
                        fullWidth
                        disabled={discountDisabled}
                        value={discountCode}
                        onChange={(event) =>
                            !discountDisabled &&
                            setDiscountCode(event.target.value)
                        }
                        required
                        color={'primary'}
                        placeholder={'کد تخفیف'}
                        sx={{
                            '& input': {
                                pl: '78px!important',
                            },
                        }}
                        endAdornment={
                            <InputAdornment
                                position={'end'}
                                sx={{
                                    position: 'absolute',
                                    left: 0,
                                }}>
                                <Button
                                    disabled={discountDisabled}
                                    type={'submit'}
                                    sx={{
                                        width: 70,
                                        height: 32,
                                        typography: 'subtitle2',
                                    }}
                                    variant='contained'
                                    color={'primary'}>
                                    {'اعمال'}
                                </Button>
                            </InputAdornment>
                        }
                    />
                </Box>
            </Box>
            <Box
                sx={{ mt: 2.5 }}
                display={'flex'}
                flexDirection={{ xs: 'column', sm: 'row' }}
                alignItems={'center'}
                justifyContent={'space-between'}>
                <Typography
                    sx={{
                        mb: { xs: 3, sm: 0 },
                        typography: { xs: 'h5', sm: 'h6' },
                    }}
                    color={'text.primary'}
                    variant='h6'>
                    {'مجموع هزینه:'}
                    <Typography
                        sx={{
                            mr: { xs: 1.5, sm: 1.75 },
                            typography: { xs: 'h5', sm: 'h6' },
                        }}
                        color={'text.secondary'}
                        variant='h6'
                        component={'span'}>
                        {`${separateDigit(store.cartDetails.totalPrice)} تومان`}
                    </Typography>
                </Typography>
                <Button
                    onClick={handleFinishOrder}
                    disabled={orderButtonDisabled}
                    sx={{ width: { xs: '100%', sm: 250 }, height: 48 }}
                    variant={'contained'}
                    color={'secondary'}>
                    {finishOrderLoading ? (
                        <CircularProgress color={'secondary'} size={32} />
                    ) : (
                        'تکمیل و خرید'
                    )}
                </Button>
            </Box>
        </Box>
    );
};

export default CartAction;
