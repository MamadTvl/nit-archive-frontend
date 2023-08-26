import { Box, BoxProps } from '@mui/system';

const Wall: React.FC<BoxProps> = (props) => {
    return (
        <Box
            sx={{
                background: '#fff',
                position: 'absolute',
                left: '-100%',
                right: '-100%',
                top: 0,
                bottom: 0,
                zIndex: -1,
            }}
            {...props}
        />
    );
};

export default Wall;
