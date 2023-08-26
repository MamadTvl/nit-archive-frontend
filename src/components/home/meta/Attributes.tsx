import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { HomeProps } from '../../../../pages';
import MetaBox from '../../box/MetaBox';
import Wall from '../../layout/utils/Wall';

const Attributes: React.FC<HomeProps['meta']> = (props) => {
    return (
        <Box component={'section'} sx={{ pb: 7, pt: 6 }} position={'relative'}>
            <Wall />
            <Typography
                sx={{ mb: 8 }}
                align={'center'}
                variant={'h4'}
                color={'text.primary'}>
                {props.title}
            </Typography>
            <Grid container spacing={{ md: 0, xs: 4 }}>
                {props.attributes.map((attribute, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <MetaBox meta={attribute} sx={{ m: 'auto' }} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
export default Attributes;
