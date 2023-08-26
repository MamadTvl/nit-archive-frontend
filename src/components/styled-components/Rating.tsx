import styled from '@emotion/styled';
import { NoSsr, Rating, RatingProps, Theme } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';

const StyledRate = styled(Rating)(({ theme }: { theme?: Theme }) => ({
    '& .MuiRating-iconFilled': {
        color: theme?.palette.golden?.main || theme?.palette.primary.main,
    },
    '& .MuiRating-iconHover': {
        color: theme?.palette.golden?.main || theme?.palette.primary.main,
    },
    '& .MuiRating-iconEmpty path': {
        fill: theme?.palette.golden?.main || theme?.palette.primary.main,
    },
    '& .MuiSvgIcon-fontSizeSmall': {
        fontSize: '1rem',
    },
    direction: 'ltr',
}));

const Rate: React.FC<RatingProps> = (props) => {
    return (
        <NoSsr>
            <StyledRate
                icon={<StarRoundedIcon fontSize={props.size} />}
                emptyIcon={<StarOutlineRoundedIcon fontSize={props.size} />}
                {...props}
            />
        </NoSsr>
    );
};

export default Rate;
