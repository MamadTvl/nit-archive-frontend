import { Paper, PaperProps, Typography } from '@mui/material';
import Image from 'next/image';
import { Category } from '../../types';
import { useSnackbar } from 'notistack';

const CategoryCard: React.FC<{
    paperProps?: PaperProps;
    category: Category;
}> = ({ paperProps, category }) => {
    const { enqueueSnackbar } = useSnackbar();
    return (
        <Paper
            onClick={() => enqueueSnackbar('بزودی!', { variant: 'info' })}
            sx={(theme) => ({
                backgroundColor: 'secondary.lightest',
                display: 'flex',
                alignItems: 'center',
                height: '98px',
                width: '100%',
                maxWidth: 240,
                pr: 4,
                m: 'auto',
                borderRadius: 2,
                cursor: 'pointer',
                [theme.breakpoints.down('sm')]: {
                    maxWidth: 280,
                    height: 70,
                    pr: 10,
                },
            })}
            {...paperProps}>
            <Image
                src={category.media.featuredUri || '/not-found'}
                alt={category.title}
                width={50}
                height={50}
                objectFit={'cover'}
            />
            <Typography variant='h6' sx={{ mr: 3 }} color={'text.primary'}>
                {category.title}
            </Typography>
        </Paper>
    );
};

export default CategoryCard;
