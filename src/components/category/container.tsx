// todo: refactor
// NOTICE: This component is not sync with project design pattern.

import { Grid, Typography } from '@mui/material';
import { Box, BoxProps } from '@mui/system';
import { Category } from '../../types';
import Wall from '../layout/utils/Wall';
import CategoryCard from './card';

const CategorySection: React.FC<{
    boxProps?: BoxProps;
    categories: Category[];
    title: string;
}> = ({ boxProps, categories, title }) => {
    return (
        <Box
            component={'section'}
            sx={{
                pt: 6,
                pb: 9,
                maxWidth: '1020px!important',
                pl: '0!important',
                pr: '0!important',
            }}
            position={'relative'}
            {...boxProps}>
            <Wall />
            <Typography
                align={'center'}
                sx={{ mb: 6 }}
                variant={'h4'}
                color={'text.primary'}>
                {title}
            </Typography>
            <Grid container justifyContent={'center'} spacing={2.5}>
                {categories.map((category, index) => (
                    <Grid item xs={12} sm={3} key={index}>
                        <CategoryCard category={category} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CategorySection;
