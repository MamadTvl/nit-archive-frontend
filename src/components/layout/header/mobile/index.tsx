import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import { useState } from 'react';
import DrawerIcon from '../../../icons/DrawerIcon';
import Link from '../../../link/Link';
import Menu from '../../../user/components/dashboard/mobile/Menu';
import UserAction from '../../../user/components/UserAction';

const MobileHeader = () => {
    const [open, setOpen] = useState(false);
    return (
        <Box
            component={'header'}
            left={0}
            top={0}
            right={0}
            sx={(theme) => ({
                p: '20px',
                background: "url('/img/background/wall.png')",
                height: '56px',
                zIndex: 1000,
                [theme.breakpoints.up('sm')]: {
                    display: 'none',
                },
                borderBottom: '1px solid',
                borderColor: 'primary.main',
            })}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            position={'fixed'}>
            <Box
                sx={{ position: 'relative', width: '100%' }}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}>
                <IconButton
                    onClick={() => setOpen(true)}
                    sx={{ mr: -1, height: 40 }}>
                    <DrawerIcon />
                </IconButton>
                <Menu open={open} setOpen={setOpen} />
                <Link
                    href={'/'}
                    sx={{ marginRight: '46px', marginTop: '10px' }}>
                    <Image
                        src={'/logo.png'}
                        alt={'نیت‌آرشیو'}
                        width={50}
                        height={65}
                    />
                </Link>
                <UserAction />
            </Box>
        </Box>
    );
};

export default MobileHeader;
