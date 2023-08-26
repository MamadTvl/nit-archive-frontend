import * as yup from 'yup';
import { toEnDigit } from '../../../../../utils/convertDigits';

export const identifierSchema = yup.object().shape({
    identifier: yup
        .string()
        // .email("Enter a valid email")
        .required('ایمیل یا شماره‌موبایل خود را وارد کنید')
        .test('isValid', 'ایمیل یا شماره‌موبایل اشتباه است', function (value) {
            const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            const phoneRegex = /[0][9][0-9]{9}/;
            let isValidEmail = emailRegex.test(toEnDigit(value || ''));
            let isValidPhone = phoneRegex.test(toEnDigit(value || ''));
            return !(!isValidEmail && !isValidPhone);
        }),
});

export const verificationCodeSchema = yup.object().shape({
    verificationCode: yup.string().required('کد را وارد کنید'),
});

export const recoverySchema = yup.object().shape({
    recoveryCode: yup.string().required('کد را وارد کنید'),
});

export const passwordSchema = yup.object().shape({
    password: yup
        .string()
        .required('رمز عبور را وارد کنید')
        .min(6, 'رمز عبور حداقل باید ۶ کاراکتر باشد'),
});

export const newPasswordSchema = yup.object().shape({
    newPassword: yup
        .string()
        .required('رمز عبور را وارد کنید')
        .min(6, 'رمز عبور حداقل باید ۶ کاراکتر باشد'),
});
