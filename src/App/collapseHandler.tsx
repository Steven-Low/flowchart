// copyPasteHandler.js
import React from 'react';
import {useState} from 'react';


const CollapseHandler = ({collapse, setCollapse}:any) => {


    const handleToggle = () => {
        setCollapse(!collapse);
    };

    return (
        <div className={collapse? `hide-controls-collapse` : `hide-controls`} onClick={handleToggle}>
            <i onClick={handleToggle} className={`bx ${collapse ? 'bx-chevron-left' : 'bx-chevron-right'}`}></i>
        </div>
    );
};

export default CollapseHandler;