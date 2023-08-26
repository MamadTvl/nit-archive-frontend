import { Collapse, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import { useMemo, useState } from 'react';
import { Topic } from '../../types';
import getPersianStringNumber from '../../utils/persianNumber';
import SmallArrowIcon from '../icons/SmallArrowIcon';

const AccordionItem: React.FC<{
    topic: Topic;
    initialState: boolean;
    content: React.ReactElement;
    index: number;
}> = ({ topic, initialState = false, content, index }) => {
    const theme = useTheme();
    const [expanded, setExpanded] = useState(initialState);

    const sectionNumber = useMemo(() => {
        return `بخش ${getPersianStringNumber(index + 1)}:`;
    }, [index]);

    return (
        <>
            <Box
                onClick={() => setExpanded((prvState) => !prvState)}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                sx={{
                    border: '1px solid',
                    borderColor: 'secondary.main',
                    borderRadius: 2,
                    pl: {
                        xs: 1.5,
                        sm: 3,
                    },
                    pr: {
                        xs: 1.5,
                        sm: 3,
                    },
                    height: {
                        xs: 48,
                        sm: 64,
                    },
                    cursor: 'pointer',
                    background: '#fff',
                }}>
                <Box display={'flex'} alignItems={'center'}>
                    <SmallArrowIcon
                        color={theme.palette.secondary.main}
                        style={{
                            transform: `rotate(${expanded ? 180 : 0}deg)`,
                            transition: 'all .3s',
                        }}
                    />
                    <Typography
                        sx={{ mr: { xs: 1, sm: 2 } }}
                        variant='button'
                        color={'text.secondary'}>
                        {sectionNumber}
                        <Typography
                            variant={'h6'}
                            component={'span'}
                            color={'text.secondary'}>
                            {' ' + topic.title}
                        </Typography>
                    </Typography>
                </Box>

                <Typography variant={'subtitle2'} color={'text.dark'}>
                    {`${topic.videos.length} ویدیو`}
                </Typography>
            </Box>
            <Collapse in={expanded} unmountOnExit>{content}</Collapse>
        </>
    );
};

export default AccordionItem;
