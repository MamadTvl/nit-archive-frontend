import { Box, BoxProps, SxProps } from '@mui/material';
import { Theme } from '@mui/system';

const Section: React.FC<SectionProps> = ({ boxProps, sx, children }) => {
    return (
        <Box
            component={'section'}
            sx={[{ pt: 6, pb: 8 }, ...(Array.isArray(sx) ? sx : [sx])]}
            {...boxProps}>
            {children}
        </Box>
    );
};

export interface SectionProps {
    children: React.ReactNode;
    sx?: SxProps<Theme>;
    boxProps?: BoxProps;
}

export default Section;
