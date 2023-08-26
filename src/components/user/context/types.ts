import { Course, User } from '../../../types';

export interface CartDetails {
    discountCode: string;
    verifiedDiscount: string | null;
    itemsPrice: number;
    discount: number;
    totalPrice: number;
    localCart: Course[];
}
export interface Store {
    user: User | null;
    cartDetails: CartDetails;
    isLoggedIn: boolean;
    isLoading: boolean;
    showLoginDialog: boolean;
    fetch: boolean;
}

export enum ActionType {
    SHOW_LOGIN_DIALOG = 'SHOW_LOGIN_DIALOG',
    LOGOUT = 'LOGOUT',
    SET_USER = 'SET_USER',
    SET_LOADING = 'SET_LOADING',
    SET_CART = 'SET_CART',
    REFETCH = 'REFETCH',
    SET_CART_DETAILS = 'SET_CART_DETAILS',
}

export interface Action {
    type: ActionType;
    payload: any;
}

export interface UserContext {
    store: Store;
    dispatch: React.Dispatch<Action>;
}

export interface AddToCartApiResult {
    items: Array<{
        purchasable: Course;
    }>;
    message: string;
}
export interface AddToCartApiBody {
    ids: string;
}

export interface RemoveFromCartApiResult {
    message: string;
}

export interface ApplyDiscountApiResult {
    message: string;
    discount_amount: number;
}

export interface ApplyDiscountApiBody {
    discount_code: string;
}

export interface FinishOrderApiResult {
    message: string;
    payment_link: string;
}

export interface FinishOrderApiBody {
    discount_code: string;
}
