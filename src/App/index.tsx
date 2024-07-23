import React from 'react';

import { useState, useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
  Panel,
  
  type Node,
  type Edge,
  type FitViewOptions,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  type OnNodeDrag,
 
  type ReactFlowInstance,
  type NodeTypes,
  type DefaultEdgeOptions,
  
  useNodesState,
  useEdgesState,

} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const flowKey = 'backup-flow';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 0' },
    position: { x: 250, y: 5 },
    className: 'light',
  },
  {
    id: '2',
    type: 'default',
    data: { label: 'Group A' },
    position: { x: 100, y: 100 },
    className: 'light',
    style: { backgroundColor: 'rgba(255, 0, 0, 0.2)', width: 200, height: 200 },
  },
  {
    id: '2a',
    type: 'default',
    data: { label: 'Node A.1' },
    position: { x: 10, y: 50 },
    parentId: '2',
  },
  {
    id: '3',
    type: 'default',
    data: { label: 'Node 1' },
    position: { x: 320, y: 100 },
    className: 'light',
  },
  {
    id: '4',
    type: 'group',
    data: { label: 'Group B' },
    position: { x: 320, y: 200 },
    className: 'light',
    style: { backgroundColor: 'rgba(255, 0, 0, 0.2)', width: 300, height: 300 },
  },
  {
    id: '4a',
    type: 'default',
    data: { label: 'Node B.1' },
    position: { x: 15, y: 65 },
    className: 'light',
    parentId: '4',
    extent: 'parent',
  },
  {
    id: '4b',
    type: 'default',
    data: { label: 'Group B.A' },
    position: { x: 15, y: 120 },
    className: 'light',
    style: {
      backgroundColor: 'rgba(255, 0, 255, 0.2)',
      height: 150,
      width: 270,
    },
    parentId: '4',
  },
  {
    id: '4b1',
    type: 'default',
    data: { label: 'Node B.A.1' },
    position: { x: 20, y: 40 },
    className: 'light',
    parentId: '4b',
  },
  {
    id: '4b2',
    type: 'default',
    data: { label: 'Node B.A.2' },
    position: { x: 100, y: 100 },
    className: 'light',
    parentId: '4b',
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2a-4a', source: '2a', target: '4a' },
  { id: 'e3-4b', source: '3', target: '4b' },
  { id: 'e4a-4b1', source: '4a', target: '4b1' },
  { id: 'e4a-4b2', source: '4a', target: '4b2' },
  { id: 'e4b1-4b2', source: '4b1', target: '4b2' },
];

const onNodeDrag: OnNodeDrag = (_, node) => {
  console.log('drag event', node.data);
};

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

const NestedFlow = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const { setViewport } = useReactFlow();


  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect: OnConnect = useCallback((connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, [setEdges]);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      console.log(localStorage);
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const storedData = localStorage.getItem(flowKey);
      const flow = JSON.parse(storedData||"");
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };
    restoreFlow();
  }, [setNodes, setViewport]);

  const onExport = () => {
    const content = JSON.stringify(rfInstance?.toObject())
    const blob = new Blob([content], {type:'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'backup.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const onImport = () => {
    const inputElement = document.createElement('input')
    inputElement.setAttribute("type","file");
    inputElement.setAttribute("id","importNodes");
    inputElement.setAttribute("accept",".json,.txt");
    inputElement.style.display = "none";
    inputElement.click();
    inputElement.addEventListener('change', (e) => {
        const input = e.target as HTMLInputElement;
        if (input.files?.length){
          const reader = new FileReader();
          reader.readAsText(input.files[0])
          reader.onload = () => {
            const fileContent = reader.result?.toString() || "";
            console.log(fileContent); // Do something with the file content
            const restoreFlow = async () => {
              const flow = JSON.parse(fileContent);
              if (flow) {
                const { x = 0, y = 0, zoom = 1 } = flow.viewport;
                setNodes(flow.nodes || []);
                setEdges(flow.edges || []);
                setViewport({ x, y, zoom });
              }
            };
            restoreFlow();
          };
        }
      }
    )
  }
  

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeDrag={onNodeDrag}
      onConnect={onConnect}
      className="react-flow-subflows-example"
      onInit={setRfInstance}
      fitView
      fitViewOptions={fitViewOptions}
      defaultEdgeOptions={defaultEdgeOptions}
    >
      <MiniMap />
      <Controls />
      <Background />
      <Panel position="top-right">
        <button onClick={onSave}>save</button>
        <button onClick={onRestore}>restore</button>
        <button onClick={onExport}>export</button>
        <button onClick={onImport}>import</button>
      </Panel>
    </ReactFlow>
  );
};

export default NestedFlow;