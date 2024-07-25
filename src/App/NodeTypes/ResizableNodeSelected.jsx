import { memo } from 'react';

import { Handle, Position, NodeResizer, NodeToolbar} from '@xyflow/react';

const buttonStyle = {
  fontSize: 12,
  marginRight: 2,
  marginBottom: 1,
  borderradius: 50
};

const ResizableNodeSelected = ({ data, selected }) => {
  return (
    <>
      <NodeToolbar isVisible={data.toolbarVisible} position={data.toolbarPosition}>
        <button style={buttonStyle}>delete</button>
        <button style={buttonStyle}>copy</button>
      </NodeToolbar>
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
      <Handle type="target" position={Position.Left} />
      <div style={{ padding: 10 }}>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default memo(ResizableNodeSelected);