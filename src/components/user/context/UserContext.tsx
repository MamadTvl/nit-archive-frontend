import { AxiosRequestConfig } from 'axios';
import React, {
    FC,
    ReactNode,
    useCallback,
    useEffect,
    useReducer,
    useState,
} from 'react';
import usePost from '../../../hooks/usePost';
import { Course, User } from '../../../types';
import axios from '../../../utils/axios';
import { getCookie } from '../../../utils/cookie';
import { refetch, setCart, setLoading, setUser } from './action';
import {
    Action,
    ActionType,
    AddToCartApiBody,
    AddToCartApiResult,
    Store,
    UserContext,
} from './types';

const initialStates: Store = {
    user: null,
    isLoading: true,
    isLoggedIn: false,
    showLoginDialog: false,
    fetch: true,
    cartDetails: {
        discountCode: '',
        verifiedDiscount: null,
        itemsPrice: 0,
        totalPrice: 0,
        discount: 0,
        localCart: [],
    },
};

const userContext = React.createContext({
    store: initialStates,
    dispatch: () => {},
    refs: undefined,
} as UserContext);

const reducer = (store: Store, action: Action): Store => {
    switch (action.type) {
        case ActionType.SET_USER: {
            return {
                ...store,
                user: action.payload,
                isLoggedIn: true,
                isLoading: false,
            };
        }
        case ActionType.SET_LOADING: {
            return {
                ...store,
                isLoading: action.payload,
            };
        }
        case ActionType.LOGOUT: {
            return {
                ...store,
                user: null,
                isLoggedIn: false,
                isLoading: false,
            };
        }
        case ActionType.SET_CART: {
            const itemsPrice = (action.payload as Course[]).reduce(
                (acc, course) => acc + course.price,
                0
            );
            return {
                ...store,
                ...(store.user
                    ? {
                          user: {
                              ...store.user,
                              cart_model: {
                                  courses: action.payload,
                              },
                          },
                      }
                    : {}),
                cartDetails: {
                    ...store.cartDetails,
                    localCart: action.payload,
                    itemsPrice: itemsPrice,
                    totalPrice:
                        itemsPrice - store.cartDetails.discount < 0
                            ? 0
                            : itemsPrice - store.cartDetails.discount,
                },
            };
        }
        case ActionType.SHOW_LOGIN_DIALOG: {
            return {
                ...store,
                showLoginDialog: action.payload,
            };
        }
        case ActionType.REFETCH: {
            return {
                ...store,
                fetch: action.payload,
            };
        }
        case ActionType.SET_CART_DETAILS: {
            return {
                ...store,
                cartDetails: {
                    ...store.cartDetails,
                    ...action.payload,
                },
            };
        }
        default:
            return store;
    }
};

const useProvideUser = (): UserContext => {
    const [store, dispatch] = useReducer(reducer, initialStates);
    const fetchApi = async () => {
        dispatch(setLoading(true));
        try {
            const response = await axios('/auth/me', {
                headers: {
                    Authorization: `Bearer ${getCookie(
                        'shenovid-token',
                        document.cookie
                    )}`,
                },
            });
            const data: { user: User } = response.data;
            dispatch(setUser(data.user));
        } catch (err) {
            dispatch({ type: ActionType.LOGOUT, payload: null });
        }
        dispatch(setLoading(false));
        dispatch(refetch(false));
    };
    useEffect(() => {
        store.fetch && fetchApi();
    }, [store.fetch]);

    const [apiArgs, setApiArgs] = useState<{
        body: AddToCartApiBody;
        config: AxiosRequestConfig;
    }>({ body: { ids: '' }, config: {} });

    const { post } = usePost<AddToCartApiResult, {}>({
        url: '/purchase/cart/add',
        body: apiArgs.body,
        config: apiArgs.config,
        onSuccess: (data) => {
            dispatch(setCart(data.items.map((item) => item.purchasable)));
        },
        onError: () => {},
    });

    const getLocalCart: () => Array<Course> = useCallback(() => {
        const localStorageCart = JSON.parse(
            localStorage.getItem('cart') || '[]'
        );
        if (!Array.isArray(localStorageCart)) {
            return [];
        }
        const cart: Array<Course> = [];
        for (const item of localStorageCart) {
            if (item && item.price) {
                cart.push(item);
            }
        }
        return cart;
    }, []);

    useEffect(() => {
        if (!store.isLoading) {
            if (store.isLoggedIn) {
                const serverCart = store.user?.cart_model?.courses || [];
                const localCart: Course[] = getLocalCart();

                const serverDiff = localCart.filter(
                    (localCourse) =>
                        !serverCart.find(
                            (serverCourse) => serverCourse.id === localCourse.id
                        )
                );
                const localDiff = serverCart.filter(
                    (serverCourse) =>
                        !localCart.find(
                            (localCourse) => localCourse.id === serverCourse.id
                        )
                );
                const result = new Set([...serverCart, ...localCart]);
                if (serverDiff.length > 0) {
                    setApiArgs({
                        body: {
                            ids: JSON.stringify(
                                Array.from(result).map(
                                    (course) => `${course.id}`
                                )
                            ),
                        },
                        config: {
                            headers: {
                                Authorization: `Bearer ${getCookie(
                                    'shenovid-token',
                                    document.cookie
                                )}`,
                            },
                        },
                    });
                    post(true);
                } else if (localDiff.length > 0) {
                    dispatch(setCart(Array.from(result)));
                }
            }
        } else {
            const localCart = getLocalCart();
            dispatch(setCart(localCart));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.isLoading, store.isLoggedIn]);

    return {
        store,
        dispatch,
    };
};
// TODO: [Refactor] UserProvider is correct!
const ProvideUser: FC<{ children: ReactNode }> = ({ children }) => {
    const value = useProvideUser();
    return (
        <userContext.Provider value={value}>{children}</userContext.Provider>
    );
};

export const useUser = () => {
    const context = React.useContext(userContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export default ProvideUser;
