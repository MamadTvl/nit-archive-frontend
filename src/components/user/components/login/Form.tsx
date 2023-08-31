import {
    Button,
    CircularProgress,
    IconButton,
    InputAdornment,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import FilledInput from '../../../styled-components/FilledInput';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { useForm } from '@mantine/form';
import { Api } from '@/api/index';
import { setToken } from '@/utils/token';
import { useUserStore } from '../../store/store';

const Form = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { values, getInputProps, onSubmit } = useForm({
        initialValues: {
            username: '',
            password: '',
        },
        validate: {
            username: (value) =>
                value.length > 3
                    ? null
                    : 'طول نام‌کاربری باید بیشتر از ۳ کارکتر باشد',
            password: (value) =>
                value.length >= 6
                    ? null
                    : 'طول رمز باید بیشتر از ۶ کارکتر باشد',
        },
    });
    const [formType, setFormType] = useState<'login' | 'sign-up'>('login');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [setUser, openLoginDialog] = useUserStore((s) => [
        s.setUser,
        s.openLoginDialog,
    ]);

    const submitText = formType === 'login' ? 'ورود' : 'ثبت‌نام';

    const login = async () => {
        return Api.Instance.login(values)
            .then((r) => {
                setToken(r.data.token);
                enqueueSnackbar('خوش اومدی', {
                    variant: 'success',
                });
                return true;
            })
            .catch((err) => {
                enqueueSnackbar(err.response?.data.message || 'server error', {
                    variant: 'error',
                });
                return false;
            });
    };

    const signUp = async () => {
        return Api.Instance.singUp(values)
            .then((r) => {
                setToken(r.data.token);
                enqueueSnackbar('ثبت نام با موفقیت انجام شد', {
                    variant: 'success',
                });
                return true;
            })
            .catch((err) => {
                enqueueSnackbar(err.response?.data.message || 'server error', {
                    variant: 'error',
                });
                return false;
            });
    };

    const handleSubmit = async () => {
        setLoading(true);
        let result = false;
        if (formType === 'login') {
            result = await login();
        } else {
            result = await signUp();
        }
        setLoading(false);
        if (result) {
            setUser();
            openLoginDialog(false);
        }
    };

    return (
        <Box
            onSubmit={onSubmit(handleSubmit)}
            sx={{ height: '100%' }}
            display={'flex'}
            gap={3}
            flexDirection={'column'}
            justifyContent={'space-between'}
            component={'form'}>
            <Typography variant={'h4'} color={'primary'} align={'center'}>
                {submitText}
            </Typography>
            <Image
                src={'/img/login/signin.svg'}
                priority
                alt={''}
                height={144}
                width={240}
            />
            <FilledInput
                type={'username'}
                name={'username'}
                fullWidth
                placeholder={'نام‌کاربری'}
                color='primary'
                {...getInputProps('username')}
            />
            <FilledInput
                endAdornment={
                    <InputAdornment
                        sx={{ position: 'absolute', left: 0 }}
                        position='end'>
                        <IconButton
                            onClick={() =>
                                setPasswordVisible((prvState) => !prvState)
                            }>
                            {passwordVisible ? (
                                <VisibilityOff />
                            ) : (
                                <Visibility />
                            )}
                        </IconButton>
                    </InputAdornment>
                }
                type={passwordVisible ? 'text' : 'password'}
                name={'password'}
                fullWidth
                placeholder={'رمزعبور'}
                color='primary'
                {...getInputProps('password')}
            />
            <Button
                disableElevation
                disabled={loading}
                type='submit'
                sx={{ height: 52 }}
                variant={'contained'}
                color='secondary'>
                {loading ? (
                    <CircularProgress color={'secondary'} size={36} />
                ) : (
                    submitText
                )}
            </Button>
            <Button
                onClick={() =>
                    setFormType((prv) =>
                        prv === 'login' ? 'sign-up' : 'login'
                    )
                }
                sx={{ height: 52 }}
                variant='text'>
                {formType === 'login' ? 'ثبت نام نکرده ام' : 'حساب کاربری دارم'}
            </Button>
        </Box>
    );
};

export default Form;
