import React from 'react';

const PaginationArrowIcon: React.FC<{ style?: React.CSSProperties }> = (
    props
) => {
    return (
        <svg
            style={{ fill: '#737373', ...props.style }}
            width='8'
            height='12'
            viewBox='0 0 8 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M5.97947 0L7.38464 1.41L2.82033 6L7.38464 10.59L5.97947 12L2.82723e-05 6L5.97947 0Z'
                fill='current-color'
            />
        </svg>
    );
};
export default PaginationArrowIcon;
