import { IconButton, IconButtonProps, SvgIcon } from '@mui/material';

const Arrow: React.FC<IconButtonProps> = (props) => {
    return (
        <IconButton {...props}>
            <SvgIcon
                width='21'
                height='32'
                viewBox='0 0 21 32'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                    d='M4.43938 0L0.692261 3.76L12.8638 16L0.692261 28.24L4.43938 32L20.3846 16L4.43938 0Z'
                    fill='#2CDDCB'
                />
            </SvgIcon>
        </IconButton>
    );
};

export default Arrow;
