import React from 'react';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import {
  ReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
  Panel,
  reconnectEdge,
  ReactFlowProvider,
  Position,
  useUpdateNodeInternals,
  NodeTypes,
  
  type Node,
  type Edge,
  type FitViewOptions,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  type OnNodeDrag,
 
  type ReactFlowInstance,
  type DefaultEdgeOptions,
  type Viewport,
  
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import ResizableNodeSelected from './ResizableNodeSelected';
import { nanoid } from 'nanoid/non-secure';
import ColorSwatch from './colorSwatch';
import { getNodesBounds, } from 'reactflow';


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
    type: 'resizableNode',
    data: { label: 'Node 1' },
    position: { x: 320, y: 100 },
    className: 'light',
    style: {
      background: '#fff',
      border: '1px solid blue',
      borderRadius: 15,
      fontSize: 12,
    }
  },
  {
    id: '4',
    type: 'default',
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
    extent: 'parent',
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
  const { setViewport, getViewport, getIntersectingNodes } = useReactFlow();
  const edgeReconnectSuccessful = useRef(true);
  const [currentNodeLabel, setCurrentNodeLabel] = useState<String | any>('');
  const [currentNodeBg, setCurrentNodeBg] = useState<String | any>('');
  const [CurrentNodeDirec, setCurrentNodeDirec] = useState(false);
  const [currentNodeType, setCurrentNodeType] = useState('default');
  const updateNodeInternals = useUpdateNodeInternals();

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

  

  const onAdd = useCallback(() => {
    const {x, y, } = getViewport();
    const newNode = {
      id: nanoid(),
      data: { 
        label: 'Added node',
        targetHandle: Position.Left,
        sourceHandle: Position.Right,
       },
      type: 'resizableNode',
      style: {
        background: '#fff',
        border: '1px solid black',
        borderRadius: 15,
        fontSize: 12,
      },
      position: {
        x: x,
        y: y
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const onExport = () => {
    const content = JSON.stringify(rfInstance?.toObject(),null,2)
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
  
  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback((oldEdge: any, newConnection: any) => {
    edgeReconnectSuccessful.current = true;
    setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
  }, []);

  const onReconnectEnd = useCallback((_: any, edge: any) => {
    if (!edgeReconnectSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeReconnectSuccessful.current = true;
  }, []);

  const nodeTypes:any = useMemo(() => ({ resizableNode: ResizableNodeSelected }), []);
  
  const connectingNodeId = useRef<string | null> (null);
  
  const onNodeClick = (event:any, node: Node) => {
    connectingNodeId.current = node.id;
    console.log('click node', node);
    console.log('event', event);
    setCurrentNodeLabel(node.data.label||"");
    setCurrentNodeBg(node.style?.backgroundColor||"rgba(255, 255, 255, 1)");
    setCurrentNodeDirec(node.data.targetHandle === Position.Left || node.data.sourceHandle === Position.Right)
    setCurrentNodeType(node.type||"default");
  } 

  const onPaneClick = (event:any) => {
    connectingNodeId.current = null;
    setCurrentNodeLabel("")
    setCurrentNodeBg("");
    setCurrentNodeDirec(false);
    setCurrentNodeType("");
  }

  const onNodeDrag:any = useCallback((_: MouseEvent, node:Node)=> {
    const intersectionsId = getIntersectingNodes(node).map((n)=>n.id);
    const intersectionsNodes:Node[] = getIntersectingNodes(node);
    const rects = getNodesBounds(intersectionsNodes)
    
    setNodes((ns) => 
      ns.map((n)=> ({
      ...n,
      className: (true)? 'highlight' : '',
    })),
  );
  }, []);
  
  // *** EDITING TOOLBARS *** //
  // 1) Change Node Label Name
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === connectingNodeId.current) {
          return {
            ...node,
            data: {
              ...node.data,
              label: currentNodeLabel,
            },
          };
        }
        return node;
      }),
    );
  }, [currentNodeLabel, setNodes]);

  // 2) Change Node Handle Direction (LR/TB)
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === connectingNodeId.current) {
          return {
            ...node,
            data: {
              ...node.data,
              targetHandle: (CurrentNodeDirec) ? Position.Left : Position.Top,
              sourceHandle: (CurrentNodeDirec) ? Position.Right : Position.Bottom,
            },
          };
        }
        return node;
      }),
    );
    updateNodeInternals(connectingNodeId.current||"");
  }, [CurrentNodeDirec, setNodes]);

  // 3) Change Node Background Color 
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === connectingNodeId.current) {
          return {
            ...node,
            style: {
              ...node.style,
              backgroundColor: currentNodeBg,
            },
          };
        }
        return node;
      }),
    );
  }, [currentNodeBg, setNodes]);

  // 4) Change Node Type
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === connectingNodeId.current) {
          return {
            ...node,
            type: currentNodeType,
          };
        }
        return node;
      }),
    );
  }, [currentNodeType, setCurrentNodeType]);
  return (

    <ReactFlow
      color="#ccc"
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeDrag={onNodeDrag}
      onConnect={onConnect}
      className="react-flow-subflows-example"
      onInit={setRfInstance}
      fitView
      snapToGrid
      onReconnect={onReconnect}
      onReconnectStart={onReconnectStart}
      onReconnectEnd={onReconnectEnd}
      nodeTypes={nodeTypes}
      fitViewOptions={fitViewOptions}
      defaultEdgeOptions={defaultEdgeOptions}
      onNodeClick={onNodeClick}
      onPaneClick={onPaneClick}
      

    >
      <MiniMap />
      <Controls />
      <Background  variant={BackgroundVariant.Dots}/>
      
      <Panel position="bottom-left">
        <div className="button-2-container">
          <button className="button-2" onClick={onAdd}><i className='bx bx-shape-square' ></i></button>
        </div>
      </Panel>
    
      <Panel position="top-left">
      <div className='button-1-container'>
        <button className="button-1"  onClick={onImport}><i className='bx bx-folder-open' > Open</i></button>
        <div className="tooltip open">Open FlowChart Nodes from JSON Backup (Not Save Automatically)</div>
        <button className="button-1"  onClick={onSave}><i className='bx bx-save'></i> Save</button>
        <div className="tooltip save">Save FlowChart Nodes in Browser Storage</div>
        <button className="button-1"  onClick={onRestore}><i className='bx bx-undo' ></i> Restore</button>
        <div className="tooltip restore">Restore FlowChart Nodes from Browser Storage</div>
        <button className="button-1"  onClick={onExport}><i className='bx bx-export' ></i> Export</button>
        <div className="tooltip export">Export FLowChart Nodes to JSON or PNG format</div>
      </div>
      </Panel>
      <div className="updatenode__controls">
        <label className="updatenode__label">label:</label>
        <input value={currentNodeLabel} onChange={(evt) => setCurrentNodeLabel(evt.target.value)} />

        <label className="updatenode__label">background:</label>
        <input value={currentNodeBg} onChange={(evt) => setCurrentNodeBg(evt.target.value)} />
        <ColorSwatch />
        <div className="dropdown">
          <label className="updatenode__label">handle direction:</label>
          <button className="dropbtn">{(CurrentNodeDirec)?"left right":"top down"||"top down"}</button>
          <div className="dropdown-content">
            <button onClick={() => setCurrentNodeDirec(true)}>left right</button>
            <button onClick={() => setCurrentNodeDirec(false)}>top down</button>
          </div>
        </div>

        <div className="dropdown">
          <label className="updatenode__label">node type:</label>
          <button className="dropbtn">{currentNodeType||"default"}</button>
          <div className="dropdown-content">
            <button onClick={() => setCurrentNodeType("resizableNode")}>Resizable Node</button>
            <button onClick={() => setCurrentNodeType("default")}>Default Node</button>
          </div>
        </div>

        
      </div>
   
    </ReactFlow>

  );
};



const FlowWrapper = () => (
  <ReactFlowProvider>
    <NestedFlow />
  </ReactFlowProvider>
);

export default FlowWrapper;