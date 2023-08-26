import { Box, Button, Collapse, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import { useState } from 'react';
import SmallArrowIcon from '../../icons/SmallArrowIcon';

const VideoText: React.FC<VideoTextProps> = (props) => {
    const [expanded, setExpanded] = useState(false);
    const theme = useTheme();
    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Collapse
                sx={{ position: 'relative' }}
                in={expanded}
                collapsedSize={50}>
                <Typography
                    sx={{ lineHeight: '24px' }}
                    variant={'body2'}
                    color={'text.secondary'}>
                    {props.text}
                </Typography>
                <Box
                    style={{
                        opacity: expanded ? 0 : 1,
                        visibility: expanded ? 'hidden' : 'visible',
                    }}
                    sx={{
                        position: 'absolute',
                        bottom: -10,
                        backgroundImage:
                            'linear-gradient(to top, rgba(255, 255, 255, 0.9) 40.76%, rgba(255, 255, 255, 0.5) 69.75%)',
                        width: '100%',
                        height: '50%',
                        display: 'flex',
                        alignItems: 'flex-end',
                        transition: 'all 0.3s ease-in-out',
                        opacity: 1,
                        visibility: 'visible',
                    }}
                />
            </Collapse>
            <Button
                dir={'ltr'}
                sx={{ alignSelf: 'center', borderRadius: 2 }}
                onClick={() => setExpanded((prvState) => !prvState)}
                endIcon={
                    <SmallArrowIcon
                        style={{
                            transform: expanded
                                ? 'rotate(180deg)'
                                : 'rotate(0deg)',
                            transition: 'all .3s',
                        }}
                        color={theme.palette.secondary.main}
                    />
                }
                color={'secondary'}
                variant={'text'}>
                {expanded
                    ? props.expandedButtonText
                    : props.collapsedButtonText}
            </Button>
        </Box>
    );
};

export default VideoText;

export interface VideoTextProps {
    text: string;
    expandedButtonText: string;
    collapsedButtonText: string;
}
