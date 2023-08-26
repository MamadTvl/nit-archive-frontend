import { Grid } from '@mui/material';
import Image, { ImageProps } from 'next/image';

const License: React.FC<{ licenses: ImageProps[] }> = ({ licenses }) => {
    return (
        <Grid
            container
            sx={{
                p: {
                    xs: '16px 57px 0',
                    sm: 0,
                },
            }}>
            {licenses.map((item, index) => (
                <Grid
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    item
                    xs={6}
                    key={index}>
                    {/*  eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image {...item} />
                </Grid>
            ))}
        </Grid>
    );
};

export default License;
