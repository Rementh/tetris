import React from 'react';
import { FaMusic } from 'react-icons/fa';

const IconButton = props =>
    <button style={{
        width: '36px',
        height: '36px',
        border: 'none',
        outline: 'none',
        borderRadius: '36px',
        display: 'flex',
        cursor: 'pointer',
        margin: 'auto 15px auto',
        background: '#fff',
        color: '#000'
    }} onClick={props.onClick}>
        <div style={{ margin: 'auto' }}>
            <FaMusic></FaMusic>
        </div>
    </button>;

export default IconButton;
