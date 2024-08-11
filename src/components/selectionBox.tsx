import React , {useState, memo} from 'react'
import "./selection.css"



const SelectionBox = ({display, left, top, width, height}:any) => {
    return (
        <div 
            id="selectionBox" 
            className='selection-box'
            style={{
                
                display:display,
                left:left,
                top:top,
                width:width,
                height:height,   
            }}> </div>
    )
  };
  


export default memo(SelectionBox);
