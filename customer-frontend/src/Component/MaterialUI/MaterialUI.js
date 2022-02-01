import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import './style.css';
// modal
export const Modal = props => {
    if (!props.visible) {
        return null;
    }
    return (
        <div className="modalFixedBg">
            <div style={{ position: 'relative' }}>
                <div className="modalClose" onClick={props.onClose}>
                    <IoIosClose
                        style={{ fontSize: '50px', marginLeft: '50px' }}
                    />
                </div>
                <div className="modalContainer">{props.children}</div>
            </div>
        </div>
    );
};

//input

export const MaterialInput = props => {
    const [focus, setFocus] = useState(props.value === '' ? false : true);
    const [touch, setTouch] = useState(false);

    return (
        <div className="materialInput">
            <label
                className={`label ${focus ? 'focus' : ''}`}
                style={{
                    top: 0,
                    lineHeight: 'none',
                }}>
                {props.label && `Enter ${props.label}`}
            </label>
            <div
                className="inputStyle"
                style={{
                    display: 'flex',
                }}>
                <input
                    className="input"
                    type={props.type}
                    value={props.value}
                    onChange={props.onChange}
                    onFocus={e => {
                        setFocus(true);
                        setTouch(true);
                    }}
                    onBlur={e => {
                        if (e.target.value === '') {
                            setFocus(false);
                        } else {
                            setTouch(false);
                        }
                    }}
                />
                {props.rightElement ? props.rightElement : null}
            </div>
            {touch && (
                <div
                    style={{
                        fontSize: '10px',
                        color: 'red',
                        fontWeight: 500,
                    }}>{`${props.label} is Required`}</div>
            )}
        </div>
    );
};

// buttons
export const MaterialButton = ({
    title,
    bgColor,
    textColor,
    style,
    onClick,
}) => {
    const onClicks = () => {
        return onClick && onClick;
    };
    return (
        <div style={{ width: '90%', ...style }}>
            <button
                className="materialButton"
                style={{ color: textColor, background: bgColor }}
                onClick={onClicks()}>
                {title ? title : 'Save change'}
            </button>
        </div>
    );
};

//dropdowm
export const DropdownMenu = props => {
    return (
        <div className="headerDropdownContainer">
            {props.menu}
            <div className="dropdown">
                <div className="upArrowContainer">
                    <div className="upArrow"></div>
                </div>
                <div className="dropdownMenu">
                    {props.firstMenu}
                    <ul className="headerDropdownMenu">
                        {props.menus &&
                            props.menus.map((item, index) => (
                                <li key={index}>
                                    <a
                                        onClick={e => {
                                            if (item.onClick) {
                                                e.preventDefault();
                                                item.onClick && item.onClick();
                                            }
                                        }}
                                        href={`${item.href}`}>
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
