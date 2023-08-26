import { InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';

const OutlinedInput = styled(InputBase)(({ theme, color, error }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 8,
        position: 'relative',
        backgroundColor: '#fff',
        border: `1px solid ${
            (color && theme.palette[color]?.main) || 'transparent'
        }`,
        ...(error ? { borderColor: theme.palette.error.main } : {}),
        fontSize: 12,
        padding: '16px 20px',
        color: theme.palette.text.secondary,
        transition: theme.transitions.create(
            ['border-color', 'background-color', 'box-shadow'],
            { duration: '.3s' }
        ),
        '&::placeholder': {
            color: theme.palette.text.dark,
        },
    },
    // borderColor: theme.palette.error.main,
}));

export default OutlinedInput;
