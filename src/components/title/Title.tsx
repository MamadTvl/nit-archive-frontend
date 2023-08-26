import { SxProps, Theme, Typography, TypographyProps } from '@mui/material';

const Title: React.FC<{
    title: string;
    typographyProps?: TypographyProps;
    sx?: SxProps<Theme>;
}> = ({ title, typographyProps, sx }) => {
    return (
        <Typography
            variant={'h4'}
            align={'center'}
            sx={[{ mb: 8 }, ...(Array.isArray(sx) ? sx : [sx])]}
            color={'text.primary'}
            {...typographyProps}>
            {title}
        </Typography>
    );
};

export default Title;
