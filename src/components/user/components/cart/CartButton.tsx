import {
    Box,
    BoxProps,
    IconButton,
    IconButtonProps,
    Typography,
} from '@mui/material';
import { useMemo } from 'react';
import CartIcon from '../../../icons/CartIcon';
import Link from '../../../link/Link';
import { useUser } from '../../context/UserContext';

const CartButton: React.FC<Props> = ({ iconButtonProps, badgeBoxProps }) => {
    const { store } = useUser();
    const { user, cartDetails } = store;

    const cartItemsCount = useMemo(() => {
        return user?.cart_model?.courses.length || cartDetails.localCart.length;
    }, [user, cartDetails]);
    return (
        <Link href={'/cart'}>
            <IconButton {...iconButtonProps}>
                <Box display={'flex'} position={'relative'}>
                    <CartIcon />
                    <Box
                        position={'absolute'}
                        bottom={-4}
                        right={-7}
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        sx={{
                            backgroundColor: 'secondary.main',
                            borderRadius: '50%',
                            transition: '.3s all',
                            width: 14,
                            height: 14,
                        }}
                        style={{
                            visibility:
                                cartItemsCount > 0 ? 'visible' : 'hidden',
                            transform:
                                cartItemsCount > 0 ? 'scale(1)' : 'scale(0)',
                        }}
                        {...badgeBoxProps}>
                        <Typography color={'white'} variant={'caption'}>
                            {cartItemsCount > 99 ? '99+' : cartItemsCount}
                        </Typography>
                    </Box>
                </Box>
            </IconButton>
        </Link>
    );
};

export default CartButton;

interface Props {
    iconButtonProps?: IconButtonProps;
    badgeBoxProps?: BoxProps;
}
