import { Box, Collapse, Theme, Typography } from '@mui/material';
import { SxProps, useTheme } from '@mui/system';
import { useState } from 'react';
import SmallArrowIcon from '../../../icons/SmallArrowIcon';
import LinkBox, { LinkBoxProps } from './LinkBox';
// NOTICE: the shittiest interface in the world
const LinkAccordion: React.FC<LinkBoxProps & { sx?: SxProps<Theme> }> = ({
    title,
    links,
    sx,
}) => {
    const [expanded, setExpanded] = useState(false);
    const theme = useTheme();
    return (
        <>
            <Box
                onClick={() => setExpanded(!expanded)}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                sx={[
                    {
                        borderTop: '1px solid',
                        borderBottom: '1px solid',
                        borderColor: 'text.light',
                        cursor: 'pointer',
                        height: 39,
                        p: '0px 8px',
                    },
                    ...(Array.isArray(sx) ? sx : [sx]),
                ]}>
                <Typography color={'text.secondary'} variant={'h6'}>
                    {title}
                </Typography>
                <SmallArrowIcon
                    color={theme.palette.text.secondary}
                    style={{
                        transform: `rotate(${expanded ? 180 : 0}deg)`,
                        transition: 'all .3s',
                    }}
                />
            </Box>
            <Collapse in={expanded}>
                <Box sx={{ pt: 2 }} />
                <LinkBox links={links} />
                <Box sx={{ pb: 2 }} />
            </Collapse>
        </>
    );
};

export default LinkAccordion;
