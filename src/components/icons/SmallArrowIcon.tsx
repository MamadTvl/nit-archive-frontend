const SmallArrowIcon: React.FC<{
    color: string;
    style?: React.CSSProperties;
}> = ({ color = '#FF6584', style }) => {
    return (
        <svg
            style={style}
            width='20'
            height='13'
            viewBox='0 0 20 13'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M20 2.34195L17.65 -1.02722e-07L10 7.60718L2.35 -7.71506e-07L-1.0237e-07 2.34195L10 12.3077L20 2.34195Z'
                fill={color}
            />
        </svg>
    );
};

export default SmallArrowIcon;
