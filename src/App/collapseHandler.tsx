// copyPasteHandler.js
import React from 'react';
import {useState} from 'react';


const CollapseHandler = () => {
    const [collapsed, setCollapsed] = useState(false);

    const handleToggle = () => {
        setCollapsed(!collapsed);
        console.log(CollapseHandler);
    };

    return (
        <div className={`hide-controls`} onClick={handleToggle}>
            <i onClick={handleToggle} className={`bx ${collapsed ? 'bx-chevron-left' : 'bx-chevron-right'}`}></i>
        </div>
    );
};

export default CollapseHandler;