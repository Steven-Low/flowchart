import { memo } from 'react';
import React from 'react';
import { Handle, Position, NodeResizer, NodeToolbar} from '@xyflow/react';
import { SourceHandle, TargetHandle } from './customHandle';

const buttonStyle = {
  fontSize: 12,
  marginRight: 2,
  marginBottom: 1,
  borderradius: 50
};



const ResizableNodeSelected = ({ data, selected }:any) => {
  //      <Handle type="target" position={Position.Top} />
  return (
    <>
      <NodeToolbar isVisible={data.toolbarVisible} position={data.toolbarPosition}>
        <button style={buttonStyle}>delete</button>
      </NodeToolbar>
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />

      <TargetHandle position={data.targetHandle || Position.Top} />      
      <div style={{ padding: 10, textAlign: "center"}}>{data.label}</div>
      <SourceHandle position={data.sourceHandle || Position.Bottom}/>
    </>
  );
};

export default memo(ResizableNodeSelected);