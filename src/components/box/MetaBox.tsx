import { SxProps, Typography } from '@mui/material';
import { Box, BoxProps } from '@mui/system';
import Image from 'next/image';

interface Meta {
    title: string;
    description?: string;
    image: {
        src: string;
        alt: string;
    };
}

const MetaBox: React.FC<{
    meta: Meta;
    boxProps?: BoxProps;
    sx?: SxProps;
}> = ({ boxProps, meta, sx }) => {
    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            {...boxProps}
            sx={{
                maxWidth: '266px',
                width: '100%',
                ...sx,
            }}>
            <Box
                display={'flex'}
                alignItems={'center'}
                flexDirection={{
                    xs: meta.description ? 'row' : 'column',
                    sm: 'row',
                }}
                sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                <Image
                    src={meta.image.src}
                    alt={meta.image.alt}
                    width={meta.description ? 61 : 54}
                    height={meta.description ? 50 : 54}
                />
                <Typography
                    variant='h5'
                    sx={{
                        mr: meta.description ? 3 : { xs: 0, sm: 1.5 },
                        mt: !meta.description ? { xs: 2, sm: 0 } : {},
                    }}
                    color={'text.primary'}>
                    {meta.title}
                </Typography>
            </Box>
            {meta.description && (
                <Typography
                    sx={{ mt: 4, textAlign: 'center' }}
                    variant={'body2'}
                    color={'text.secondary'}>
                    {meta.description}
                </Typography>
            )}
        </Box>
    );
};
export default MetaBox;
