import React from 'react';
import { Divider } from '@mui/material';
import { Box, BoxProps, SxProps } from '@mui/system';
import Link from '../../../../link/Link';
import CourseIcon from '../../../../icons/CourseIcon';
import InfoIcon from '../../../../icons/InfoIcon';
import ExitIcon from '../../../../icons/ExitIcon';
import { DashboardItem } from '../types';
import UserBox from '../UserBox';
import ItemBox from '../ItemBox';
import useLogout from '../../../hooks/useLogout';

interface MenuProps {
    boxProps?: BoxProps;
    sx?: SxProps;
}

const Menu: React.FC<MenuProps> = ({ sx, boxProps }) => {
    const { mutate } = useLogout();
    const dashboardItems: DashboardItem[] = [
        {
            title: 'دوره‌های من',
            icon: <CourseIcon />,
            href: '/dashboard/my-courses',
        },
        {
            title: 'اطلاعات کاربری',
            icon: <InfoIcon />,
            href: '/dashboard/info',
        },
        {
            title: 'خروج از حساب',
            icon: <ExitIcon />,
            action: () => mutate(true),
        },
    ];
    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
            sx={[
                {
                    border: '1px solid',
                    borderColor: 'primary.main',
                    width: 212,
                    height: 185,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: '#fff',
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...boxProps}>
            <UserBox />
            <Divider sx={{ borderWidth: 1, borderColor: 'text.BG' }} />
            {dashboardItems.map((item, index) => {
                const children = <ItemBox item={item} />;
                const itemComponent = item.href ? (
                    <Link href={item.href} key={index}>
                        {children}
                    </Link>
                ) : (
                    <>{children}</>
                );

                return (
                    <React.Fragment key={index}>
                        {itemComponent}
                        {index !== dashboardItems.length - 1 && (
                            <Divider
                                sx={{
                                    borderColor: 'text.secondary',
                                }}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </Box>
    );
};

export default Menu;
