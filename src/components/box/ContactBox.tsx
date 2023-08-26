import { ContactOption, ContactOptionType } from '../../../pages/contact-us';
import React, { useCallback, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import SupportIcon from '../icons/SupportIcon';
import CallIcon from '../icons/CallIcon';
import AddressIcon from '../icons/AddressIcon';

const ContactBox: React.FC<ContactOption> = ({ type, title, data }) => {
    const icon = useMemo(() => {
        switch (type) {
            case ContactOptionType.ONLINE_SUPPORT:
                return <SupportIcon />;
            case ContactOptionType.PHONE:
                return <CallIcon />;
            case ContactOptionType.ADDRESS:
                return <AddressIcon />;
            default:
                return null;
        }
    }, [type]);

    const onClick = useCallback(() => {
        switch (type) {
            case ContactOptionType.ONLINE_SUPPORT: {
                return;
            }
            case ContactOptionType.PHONE: {
                window.location.href = `tel:${data}`;
                return;
            }
            case ContactOptionType.ADDRESS: {
                window.location.href = `https://www.google.com/maps/search/?api=1&query=${data}`;
                return;
            }
        }
    }, [type, data]);

    return (
        <Box
            display={'flex'}
            flexDirection={{
                xs: 'column',
                sm: 'row',
            }}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}>
                {icon}
                <Typography
                    sx={{ mr: 1 }}
                    variant={'h5'}
                    color={'text.secondary'}>
                    {title}
                </Typography>
            </Box>
            <Box
                onClick={onClick}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                sx={{
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'secondary.main',
                    height: 48,
                    width: {
                        xs: '100%',
                        sm: 'auto',
                    },
                    mt: {
                        xs: 2,
                        sm: 0,
                    },
                    boxSizing: 'inherit',
                    p: 3,
                    cursor: 'pointer',
                }}>
                <Typography
                    align={'center'}
                    variant={'h6'}
                    color={'secondary.main'}>
                    {data}
                </Typography>
            </Box>
        </Box>
    );
};

export default ContactBox;
