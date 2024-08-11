import React from 'react';
import { 
    Handle, 
    Position,
} from '@xyflow/react';

 
export const TargetHandle = ({position}:{position:Position}) => (
  <Handle
    type="target"
    position={position}
    //onConnect={(params) => console.log('handle onConnect', params)}
    style={{ background: 'rgba(5,5,5,0.5)' }}
  />
);

export const SourceHandle = ({position}:{position:Position}) => (
    <Handle
    type="source"
    position={position}
    //onConnect={(params) => console.log('handle onConnect', params)}
    style={{ background: 'rgba(5,5,5,0.5)' }}
  />
)