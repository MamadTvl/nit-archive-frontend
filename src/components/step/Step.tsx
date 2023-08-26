import { Box, SxProps, Theme } from '@mui/material';
import React from 'react';

interface StepProps {
    children: React.ReactNode;
    index: number;
    step: number;
    sx?: SxProps<Theme>;
}

const Step: React.FC<StepProps> = ({ children, index, step, sx }) => {
    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            style={{
                display: step !== index ? 'none' : 'flex',
            }}
            hidden={step !== index}
            sx={sx}>
            {children}
        </Box>
    );
};
export default Step;
