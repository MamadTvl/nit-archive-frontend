import { styled } from '@mui/material/styles';

const Teaser = styled('video')(({ theme }) => ({
    height: '100%',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
    borderRadius: '8px',
}));
export default Teaser;
