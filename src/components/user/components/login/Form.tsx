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
import { useFormik } from 'formik';
import {
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {
    identifierSchema,
    newPasswordSchema,
    passwordSchema,
    recoverySchema,
    verificationCodeSchema,
} from './validation';
import usePost from '../../../../hooks/usePost';
import { toEnDigit } from '../../../../utils/convertDigits';
import { setCookie } from '../../../../utils/cookie';
import getConfig from 'next/config';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    FormField,
    FormProps,
    PostApiError,
    PostApiResponse,
    Step,
    userStatus,
} from './types';
import { useUser } from '../../context/UserContext';
import { refetch, showLoginDialog } from '../../context/action';
import { useSnackbar } from 'notistack';

const { publicRuntimeConfig } = getConfig();
const emailRegex =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

const Form = <P extends unknown>(props: PropsWithChildren<P & FormProps>) => {
    const {
        imageSrc,
        title,
        inputLabel,
        inputPlaceholder,
        buttonText,
        formType,
        loginParams,
        setStep,
        isResetPassword,
        setIsResetPassword,
    } = props;
    const { store, dispatch } = useUser();
    const { enqueueSnackbar } = useSnackbar();

    const formik = useFormik({
        initialValues: {
            ...(formType === FormField.identifier
                ? { [FormField.identifier]: '' }
                : {}),
            ...(formType === FormField.newPassword
                ? { [FormField.newPassword]: '' }
                : {}),
            ...(formType === FormField.password
                ? { [FormField.password]: '' }
                : {}),
            ...(formType === FormField.recoveryCode
                ? { [FormField.recoveryCode]: '' }
                : {}),
            ...(formType === FormField.verificationCode
                ? { [FormField.verificationCode]: '' }
                : {}),
        },
        validationSchema: () => {
            switch (formType) {
                case FormField.identifier:
                    return identifierSchema;
                case FormField.newPassword:
                    return newPasswordSchema;
                case FormField.password:
                    return passwordSchema;
                case FormField.recoveryCode:
                    return recoverySchema;
                case FormField.verificationCode:
                    return verificationCodeSchema;
                default:
                    return undefined;
            }
        },
        onSubmit: () => {
            post(true);
        },
    });

    const body = useMemo(() => {
        switch (formType) {
            case FormField.identifier:
                return {
                    identifier: toEnDigit(
                        loginParams.current[FormField.identifier] ??
                            (formik.values[FormField.identifier] || '')
                    ),
                };
            case FormField.newPassword:
                return {
                    identifier: toEnDigit(
                        loginParams.current[FormField.identifier] ??
                            (formik.values[FormField.identifier] || '')
                    ),
                    password: toEnDigit(
                        loginParams.current[FormField.newPassword] ??
                            (formik.values[FormField.newPassword] || '')
                    ),
                    password_confirmation: toEnDigit(
                        loginParams.current[FormField.newPassword] ??
                            (formik.values[FormField.newPassword] || '')
                    ),
                    verification_code: toEnDigit(
                        loginParams.current[
                            isResetPassword
                                ? FormField.recoveryCode
                                : FormField.verificationCode
                        ] ||
                            formik.values[
                                isResetPassword
                                    ? FormField.recoveryCode
                                    : FormField.verificationCode
                            ] ||
                            ''
                    ),
                };
            case FormField.verificationCode:
                return {
                    identifier: toEnDigit(
                        loginParams.current[FormField.identifier] ??
                            (formik.values[FormField.identifier] || '')
                    ),

                    verification_code: toEnDigit(
                        loginParams.current[FormField.verificationCode] ||
                            formik.values[FormField.verificationCode] ||
                            ''
                    ),
                };
            case FormField.password:
                return {
                    identifier: toEnDigit(
                        loginParams.current[FormField.identifier] ??
                            (formik.values[FormField.identifier] || '')
                    ),
                    password: toEnDigit(
                        loginParams.current[FormField.password] ??
                            (formik.values[FormField.password] || '')
                    ),
                    password_confirmation: '',
                    verification_code: '',
                };
            case FormField.recoveryCode:
                return {
                    identifier: toEnDigit(
                        loginParams.current[FormField.identifier] ??
                            (formik.values[FormField.identifier] || '')
                    ),

                    verification_code: toEnDigit(
                        loginParams.current[FormField.recoveryCode] ||
                            formik.values[FormField.recoveryCode] ||
                            ''
                    ),
                };
            default:
                throw new Error('Invalid form type');
        }
    }, [formType, formik.values, loginParams, isResetPassword]);

    const postUrl = useMemo(() => {
        switch (formType) {
            case FormField.identifier:
                return '/sanctum/sendVerifyCode';
            case FormField.newPassword:
                return `/sanctum/token?reset_password=${
                    isResetPassword ? 1 : 0
                }`;
            case FormField.password:
                return '/sanctum/token';
            case FormField.recoveryCode:
                return '/sanctum/checkVerifyCode';
            case FormField.verificationCode:
                return '/sanctum/checkVerifyCode';
            default:
                throw new Error('Invalid form type');
        }
    }, [formType, isResetPassword]);

    const onSuccess = useCallback(
        (data: PostApiResponse) => {
            loginParams.current = {
                ...loginParams.current,
                ...(formType === FormField.identifier
                    ? { identifier: formik.values[FormField.identifier] }
                    : {}),
                ...(formType === FormField.newPassword
                    ? { newPassword: formik.values[FormField.newPassword] }
                    : {}),
                ...(formType === FormField.password
                    ? { password: formik.values[FormField.password] }
                    : {}),
                ...(formType === FormField.recoveryCode
                    ? { recoveryCode: formik.values[FormField.recoveryCode] }
                    : {}),
                ...(formType === FormField.verificationCode
                    ? {
                          verificationCode:
                              formik.values[FormField.verificationCode],
                      }
                    : {}),
            };
            switch (formType) {
                case FormField.identifier: {
                    if (
                        data.user_status === userStatus.newUser ||
                        data.user_status === userStatus.oldUser
                    ) {
                        setStep(Step.verificationCode);
                        enqueueSnackbar(data.message, {
                            variant: 'success',
                        });
                    } else {
                        setStep(Step.password);
                    }
                    break;
                }
                case FormField.verificationCode: {
                    setIsResetPassword(false);
                    setStep(Step.newPassword);
                    enqueueSnackbar(data.message, {
                        variant: 'success',
                    });
                    break;
                }
                case FormField.password:
                case FormField.newPassword: {
                    data.token &&
                        setCookie(
                            'shenovid-token',
                            data.token,
                            365,
                            publicRuntimeConfig.domain
                        );
                    dispatch(refetch(true));
                    dispatch(showLoginDialog(false));
                    break;
                }
                // set token in Cookie
                case FormField.recoveryCode: {
                    setIsResetPassword(true);
                    setStep(Step.newPassword);
                    break;
                }
            }
        },
        [
            dispatch,
            enqueueSnackbar,
            formType,
            formik.values,
            loginParams,
            setStep,
            setIsResetPassword,
        ]
    );

    const onError = useCallback(
        (error: PostApiError | undefined) => {
            if (error && error.errors) {
                // iterate through errors
                let snackbarMessage = '';
                for (const [, messages] of Object.entries(error.errors)) {
                    for (const message of messages) {
                        snackbarMessage += `${message}\n`;
                    }
                }
                enqueueSnackbar(snackbarMessage, {
                    variant: 'error',
                });
            }
        },
        [enqueueSnackbar]
    );

    const { loading, post } = usePost<PostApiResponse, PostApiError>({
        url: postUrl,
        body: body,
        onError: onError,
        onSuccess: onSuccess,
    });

    const { loading: resetPasswordLoading, post: resetPassword } = usePost<
        PostApiResponse,
        PostApiError
    >({
        url: '/sanctum/sendVerifyCode?reset_password=1',
        body: {
            identifier: toEnDigit(
                loginParams.current[FormField.identifier] ??
                    (formik.values[FormField.identifier] || '')
            ),
        },
        onError: (data) => {
            enqueueSnackbar(data?.message || 'server error', {
                variant: 'error',
            });
        },
        onSuccess: (data) => {
            setStep(Step.recoveryCode);
            enqueueSnackbar(data.message, {
                variant: 'success',
            });
        },
    });

    const identifierType = emailRegex.test(
        toEnDigit(
            loginParams.current[FormField.identifier] ??
                (formik.values[FormField.identifier] || '')
        )
    )
        ? 'ایمیل'
        : 'شماره';

    const [inputType, setInputType] = useState(
        [FormField.password, FormField.newPassword].includes(formType)
            ? 'password'
            : 'text'
    );

    const autoCompleteAttribute = useMemo(() => {
        switch (formType) {
            case FormField.password:
                return 'current-password';
            case FormField.newPassword:
                return 'new-password';
            case FormField.identifier:
                return 'username';
            default:
                return 'off';
        }
    }, [formType]);

    useEffect(() => {
        return () => {
            if (!store.showLoginDialog) {
                formik.resetForm();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.showLoginDialog]);

    return (
        <Box
            onSubmit={formik.handleSubmit}
            sx={{ height: '100%' }}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
            component={'form'}>
            <Typography variant={'h4'} color={'primary'} align={'center'}>
                {title}
            </Typography>
            <Image src={imageSrc} priority alt={''} height={144} width={240} />
            {formType === FormField.recoveryCode && (
                <Typography align='center' variant={'subtitle2'}>
                    {`رمز عبور یک‌بار مصرف شما به ${identifierType} ${loginParams.current.identifier} ارسال شد.`}
                    <Typography
                        onClick={() => setStep(Step.identifier)}
                        sx={{ cursor: 'pointer' }}
                        align='center'
                        variant={'subtitle2'}
                        color={'hyperlink.main'}>
                        {`\n(ویرایش ${identifierType})`}
                    </Typography>
                </Typography>
            )}
            <Box>
                <Typography
                    sx={{ mb: 1.5 }}
                    variant={'h6'}
                    color={'text.secondary'}>
                    {inputLabel}
                </Typography>
                {(formType === FormField.password ||
                    formType === FormField.newPassword) && (
                    <input
                        value={loginParams.current.identifier || ''}
                        type={'username'}
                        hidden
                    />
                )}
                <FilledInput
                    autoComplete={autoCompleteAttribute}
                    endAdornment={
                        [FormField.password, FormField.newPassword].includes(
                            formType
                        ) && (
                            <InputAdornment
                                sx={{ position: 'absolute', left: 0 }}
                                position='end'>
                                <IconButton
                                    onClick={() =>
                                        setInputType((prvState) =>
                                            prvState === 'password'
                                                ? 'text'
                                                : 'password'
                                        )
                                    }>
                                    {inputType === 'password' ? (
                                        <Visibility />
                                    ) : (
                                        <VisibilityOff />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                    type={inputType}
                    name={FormField[formType]}
                    value={formik.values[FormField[formType]]}
                    onChange={formik.handleChange}
                    error={
                        formik.touched[FormField[formType]] &&
                        Boolean(formik.errors[FormField[formType]])
                    }
                    fullWidth
                    placeholder={inputPlaceholder}
                    color='primary'
                />
                {formik.touched[FormField[formType]] &&
                    Boolean(formik.errors[FormField[formType]]) && (
                        <Typography
                            sx={{ mt: 1 }}
                            variant={'caption'}
                            color={'error.main'}>
                            {formik.touched[FormField[formType]] &&
                                formik.errors[FormField[formType]]}
                        </Typography>
                    )}
                {formType === FormField.password && (
                    <Typography
                        onClick={() => resetPassword(true)}
                        sx={{ mt: 1, cursor: 'pointer' }}
                        color={'hyperlink.main'}
                        variant={'subtitle2'}>
                        {'رمز عبور خود را فراموش کردید؟'}
                    </Typography>
                )}
            </Box>
            <Button
                disableElevation
                disabled={loading || resetPasswordLoading}
                type='submit'
                sx={{ height: 52 }}
                variant={'contained'}
                color='secondary'>
                {loading || resetPasswordLoading ? (
                    <CircularProgress color={'secondary'} size={36} />
                ) : (
                    buttonText
                )}
            </Button>
        </Box>
    );
};

export default Form;
