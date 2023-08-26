import { Course, User } from '../../../types';
import { Action, ActionType, Store } from './types';

export const showLoginDialog = (show: boolean): Action => {
    return {
        payload: show,
        type: ActionType.SHOW_LOGIN_DIALOG,
    };
};

export const logout = (): Action => {
    return {
        payload: null,
        type: ActionType.LOGOUT,
    };
};

export const setUser = (user: User): Action => {
    return {
        payload: user,
        type: ActionType.SET_USER,
    };
};

export const setLoading = (loading: boolean): Action => {
    return {
        payload: loading,
        type: ActionType.SET_LOADING,
    };
};

export const setCart = (cart: Course[]): Action => {
    localStorage.setItem('cart', JSON.stringify(cart));
    return {
        payload: cart,
        type: ActionType.SET_CART,
    };
};

export const refetch = (payload = true): Action => {
    return {
        type: ActionType.REFETCH,
        payload: payload,
    };
};

export const setCartDetails = (
    cartDetails: Partial<Store['cartDetails']>
): Action => {
    return {
        payload: cartDetails,
        type: ActionType.SET_CART_DETAILS,
    };
};
