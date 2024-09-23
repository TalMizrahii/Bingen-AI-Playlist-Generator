import React from "react";
import "./Input.css";

const Input = ({ placeholder, changeHandler, onClickHandler, btnValue, value }) => {

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            onClickHandler();
        }
    };

    return (
        <div className="bingen__header-content__input">
            <input
                value={value}
                type="text"
                placeholder={placeholder}
                onChange={changeHandler}
                onKeyUp={handleKeyPress} // Add key press event listener
            />
            <button type="button" onClick={onClickHandler}>
                {btnValue}
            </button>
        </div>
    );
};

export default Input;
