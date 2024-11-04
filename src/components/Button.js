import React from 'react';

const Button = ({ text, style, icon, handleClick }) => {
    return (
        <button
            type="button"
            className={
                style
                    ? style
                    : 'py-1 px-4 rounded-l-full  rounded-r-full  border  bg-transparent'
            }
            onClick={handleClick}
        >
            {text && <span> {text} </span>}
            {icon && <span> {icon} </span>}
        </button>
    );
};

export default Button;
