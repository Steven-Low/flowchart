import React, { useRef, useEffect, useState, useCallback } from 'react';
import { 
  ReactFlow, 
  useNodesState, 
  useEdgesState,
  applyNodeChanges,
  applyEdgeChanges,
  useOnSelectionChange,
  useOnViewportChange,
  useStoreApi,
  
  type OnConnectStart,
  type OnNodeDrag,
  type OnConnectEnd,
  type OnNodesChange,
  type OnEdgesChange,
  type Node,
  type Edge,
  type Viewport,

} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// import './updatenode.css';


const initialNodes: Node[] = [
  { id: '1', data: { label: '-' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
const defaultViewport = { x: 0, y: 0, zoom: 1.5 };
const onNodeDragStart = (event:any, node: Node) => console.log('drag start', node);
const onNodeDragStop = (event:any, node: Node) => console.log('drag stop', node);


const UpdateNode = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  const [nodeName, setNodeName] = useState('Node 1');
  const [nodeBg, setNodeBg] = useState('#eee');
  const [nodeHidden, setNodeHidden] = useState(false);

  const connectingNodeId = useRef<string | null> (null);
  
  const onNodeClick = (event:any, node: Node) => {
    connectingNodeId.current = node.id;
    console.log('click node', node);
  } 
  const onPaneClick = (event:any) => connectingNodeId.current = null;
  

  const onNodeDrag: OnNodeDrag = (_, node) => {
    console.log('drag event', node.data);
  };

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === connectingNodeId.current) {
          // it's important that you create a new node object
          // in order to notify react flow about the change
          return {
            ...node,
            data: {
              ...node.data,
              label: nodeName,
            },
          };
        }

        return node;
      }),
    );
  }, [nodeName, setNodes]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === connectingNodeId.current) {
          // it's important that you create a new node object
          // in order to notify react flow about the change
          return {
            ...node,
            style: {
              ...node.style,
              backgroundColor: nodeBg,
            },
          };
        }

        return node;
      }),
    );
  }, [nodeBg, setNodes]);


  

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick || undefined}
      onNodeDragStart={onNodeDragStart}
      onNodeDragStop={onNodeDragStop}
      onPaneClick={onPaneClick || undefined}
      
      defaultViewport={defaultViewport}
      minZoom={0.2}
      maxZoom={4}
      attributionPosition="bottom-left"
      fitView
      fitViewOptions={{ padding: 0.5 }}
    >
      <div className="updatenode__controls">
        <label>label:</label>
        <input
          value={nodeName}
          onChange={(evt) => setNodeName(evt.target.value)}
        />

        <label className="updatenode__bglabel">background:</label>
        <input value={nodeBg} onChange={(evt) => setNodeBg(evt.target.value)} />

        <div className="updatenode__checkboxwrapper">
          <label>hidden:</label>
          <input
            type="checkbox"
            checked={nodeHidden}
            onChange={(evt) => setNodeHidden(evt.target.checked)}
          />
        </div>
      </div>
      
    </ReactFlow>
    
  );
};

export default UpdateNode;
