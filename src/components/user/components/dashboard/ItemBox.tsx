import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DashboardItem } from './types';

const ItemBox: React.FC<Props> = ({ item }) => {
    return (
        <Box
            onClick={item.action}
            sx={(theme) => ({
                cursor: 'pointer',
                '& path': {
                    transition: '.3s all',
                },
                '&:hover': {
                    '& .dashboard-item': {
                        color: 'primary.main',
                    },
                    '& path': {
                        transition: '.3s all',
                        fill: theme.palette.primary.main,
                    },
                },
            })}
            display={'flex'}
            alignItems={'center'}>
            {item.icon}
            <Typography
                className='dashboard-item'
                variant={'subtitle2'}
                color={'text.secondary'}
                sx={{ mr: 1, transition: '.3s all' }}>
                {item.title}
            </Typography>
        </Box>
    );
};

interface Props {
    item: DashboardItem;
}

export default ItemBox;
