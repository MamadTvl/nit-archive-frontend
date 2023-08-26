import { styled } from '@mui/material/styles';
import LinearProgress, {
    linearProgressClasses,
} from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 12,
    borderRadius: 8,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.background.paper,
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 8,
        backgroundColor: theme.palette.primary.main,
    },
    ...(props) => props.style,
}));

export default BorderLinearProgress;
