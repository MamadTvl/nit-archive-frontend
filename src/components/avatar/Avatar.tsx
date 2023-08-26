import { Box, SxProps } from '@mui/material';
import Image, { ImageProps } from 'next/image';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Avatar: React.FC<{
    imageProps: ImageProps;
    sx?: SxProps;
    style?: React.CSSProperties;
}> = ({ imageProps, sx, style }) => {
    return (
        <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={sx}
            style={style}>
            {imageProps.src !== '' ? (
                // eslint-disable-next-line jsx-a11y/alt-text
                <Image className={'avatar-image'} {...imageProps} />
            ) : (
                <AccountCircleIcon
                    color={'disabled'}
                    sx={{
                        width: imageProps.width,
                        height: imageProps.height,
                    }}
                    fontSize={'medium'}
                />
            )}
        </Box>
    );
};

export default Avatar;
