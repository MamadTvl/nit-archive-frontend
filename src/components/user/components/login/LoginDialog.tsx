import { Dialog, IconButton } from '@mui/material';
import { useUser } from '../../context/UserContext';
import Form from './Form';
import { FormField, FormStep, LoginParams, Step as LoginStep } from './types';
import Step from '../../../step/Step';
import { useCallback, useEffect, useRef, useState } from 'react';
import BackIcon from '../../../icons/BackIcon';
import SkipIcon from '../../../icons/SkipIcon';
import { showLoginDialog } from '../../context/action';

const formSteps: FormStep[] = [
    {
        imageSrc: '/img/login/signin.svg',
        inputLabel: 'ایمیل یا شمارۀ همراه:',
        title: 'ورود / ثبت‌نام',
        formType: FormField.identifier,
        inputPlaceholder: 'ایمیل یا شمارۀ همراه',
        buttonText: 'بعدی',
    },
    {
        imageSrc: '/img/login/verification.svg',
        inputLabel: 'رمز یک‌بار مصرف:',
        title: 'ثبت‌نام',
        formType: FormField.verificationCode,
        inputPlaceholder: 'رمز یک‌بار مصرف',
        buttonText: 'بعدی',
    },
    {
        imageSrc: '/img/login/newpassword.svg',
        inputLabel: 'تعیین رمز عبور:',
        title: 'ثبت‌نام',
        formType: FormField.newPassword,
        inputPlaceholder: 'تعیین رمز عبور',
        buttonText: 'بعدی',
    },
    {
        imageSrc: '/img/login/password.svg',
        inputLabel: 'رمز عبور:',
        title: 'ورود',
        formType: FormField.password,
        inputPlaceholder: 'رمز عبور',
        buttonText: 'ورود',
    },
    {
        imageSrc: '/img/login/recovery.svg',
        inputLabel: 'رمز یک‌بار مصرف:',
        title: 'بازیابی رمز عبور',
        formType: FormField.recoveryCode,
        inputPlaceholder: 'رمز یک‌بار مصرف',
        buttonText: 'بعدی',
    },
];

const LoginDialog = () => {
    const { store, dispatch } = useUser();
    const [step, setStep] = useState(0);
    const [isResetPassword, setIsResetPassword] = useState(false);
    const loginParamsInitialValue: LoginParams = {
        identifier: null,
        newPassword: null,
        password: null,
        recoveryCode: null,
        verificationCode: null,
    };
    const loginParams = useRef<LoginParams>(loginParamsInitialValue);

    const handleBackButton = useCallback(() => {
        switch (step) {
            case LoginStep.identifier:
                return;
            case LoginStep.newPassword: {
                loginParams.current = loginParamsInitialValue;
                setStep(LoginStep.identifier);
                return;
            }
            case LoginStep.verificationCode: {
                loginParams.current = loginParamsInitialValue;
                setStep(LoginStep.identifier);
                return;
            }
            case LoginStep.recoveryCode: {
                setStep(LoginStep.password);
                return;
            }
            case LoginStep.password: {
                loginParams.current = loginParamsInitialValue;
                setStep(LoginStep.identifier);
                return;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step]);

    useEffect(() => {
        return () => {
            if (!store.showLoginDialog) {
                loginParams.current = loginParamsInitialValue;
                setStep(LoginStep.identifier);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.showLoginDialog]);

    return (
        <Dialog
            onClose={() => dispatch(showLoginDialog(false))}
            PaperProps={{
                sx: {
                    maxHeight: 457,
                    height: '100%',
                    width: 400,
                    p: 2.5,
                    pt: 5,
                    justifyContent: 'space-between',
                    borderRadius: 2,
                    position: 'relative',
                    backgroundColor: '#fff',
                },
            }}
            open={store.showLoginDialog}>
            <IconButton
                disabled={step === LoginStep.identifier}
                style={{
                    ...(step === LoginStep.identifier
                        ? {
                              display: 'none',
                              visibility: 'hidden',
                          }
                        : {}),
                }}
                sx={{ position: 'absolute', left: 8, top: 8 }}
                onClick={handleBackButton}>
                <BackIcon />
            </IconButton>
            <IconButton
                onClick={() => dispatch(showLoginDialog(false))}
                sx={{ position: 'absolute', right: 8, top: 8 }}>
                <SkipIcon />
            </IconButton>
            {formSteps.map((formStep, index) => {
                return (
                    <Step
                        sx={{ height: '100%' }}
                        key={index}
                        index={index}
                        step={step}>
                        <Form
                            isResetPassword={isResetPassword}
                            setIsResetPassword={setIsResetPassword}
                            setStep={setStep}
                            loginParams={loginParams}
                            imageSrc={formStep.imageSrc}
                            inputLabel={formStep.inputLabel}
                            title={formStep.title}
                            formType={formStep.formType}
                            inputPlaceholder={formStep.inputPlaceholder}
                            buttonText={formStep.buttonText}
                        />
                    </Step>
                );
            })}
        </Dialog>
    );
};
export default LoginDialog;
