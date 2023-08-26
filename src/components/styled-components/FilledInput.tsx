import { InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';

const FilledInput = styled(InputBase)(({ theme, color, error }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 8,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid transparent',
        ...(error ? { borderColor: theme.palette.error.main } : {}),
        fontSize: 16,
        padding: '10px 20px',
        color: theme.palette.text.secondary,
        transition: theme.transitions.create(
            ['border-color', 'background-color', 'box-shadow'],
            { duration: '.3s' }
        ),
        // Use the system font instead of the default Roboto font.
        '&:focus': {
            borderColor: (color && theme.palette[color]?.main) || 'transparent',
        },
        '&::placeholder': {
            color: theme.palette.text.dark,
        },
    },
    // borderColor: theme.palette.error.main,
}));

export default FilledInput;
