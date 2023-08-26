import { Dispatch, SetStateAction } from 'react';
import { User } from '../../../../../types';

export interface FormStep {
    title: string;
    imageSrc: string;
    inputLabel: string;
    inputPlaceholder: string;
    formType: FormType;
    buttonText: string;
}

export interface LoginParams {
    identifier: string | null;
    password: string | null;
    newPassword: string | null;
    verificationCode: string | null;
    recoveryCode: string | null;
}
export interface FormProps {
    title: string;
    imageSrc: string;
    inputLabel: string;
    inputPlaceholder: string;
    buttonText: string;
    formType: FormType;
    loginParams: React.MutableRefObject<LoginParams>;
    setStep: Dispatch<SetStateAction<number>>;
    isResetPassword: boolean;
    setIsResetPassword: Dispatch<SetStateAction<boolean>>;
}

export enum FormField {
    identifier = 'identifier',
    verificationCode = 'verificationCode',
    newPassword = 'newPassword',
    password = 'password',
    recoveryCode = 'recoveryCode',
}

export enum Step {
    identifier = 0,
    verificationCode = 1,
    newPassword = 2,
    password = 3,
    recoveryCode = 4,
}
export type FormType =
    | FormField.identifier
    | FormField.password
    | FormField.newPassword
    | FormField.verificationCode
    | FormField.recoveryCode;

export enum userStatus {
    newUser = 'new_user',
    oldUser = 'old_user',
    user = 'user',
}
export interface PostApiResponse {
    message: string;
    user_status?: string;
    user?: User;
    token?: string;
}

export interface PostApiError {
    message: string;
    errors?: {
        [key: string]: string[];
    };
}
