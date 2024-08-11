import { create } from 'zustand';
import { nanoid } from 'nanoid/non-secure';

import initialNodes from './nodes';
import initialEdges from './edges';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Position,
  type Node,
  type Edge,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  type ReactFlowInstance,
  type XYPosition,
} from '@xyflow/react';

import { SetViewport } from 'reactflow';

type AppState = {
    nodes: Node[];
    edges: Edge[]
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    setNodes: (nodes: Node[] | ((nodes: Node[]) => Node[])) => void;
    setEdges: (edges: Edge[] | ((nodes: Edge[]) => Edge[])) => void;
    onExport: (rfInstance: ReactFlowInstance | null) => void;
    onImport: (setViewport:SetViewport) => void;
    onSave: (rfInstance: ReactFlowInstance | null, flowId: string | undefined, addFlowKey: (id: string) => Promise<void>) => void;
    onRestore: (flowId: string | undefined, setViewport: SetViewport) => void;
    onAdd: (screenToFlowPosition: (clientPosition: XYPosition, options?: { snapToGrid: boolean; }) => XYPosition) => void;
}



// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<AppState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: (nodes: Node[] | ((nodes: Node[]) => Node[])) => {
    // console.log("setnodes")
    set((state) => ({
        nodes: typeof nodes === 'function' ? nodes(state.nodes) : nodes
    }));
  },
  setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => {
    set((state) => ({
        edges: typeof edges === 'function' ? edges(state.edges) : edges
    }));
  },
  onExport: (rfInstance: ReactFlowInstance | null) => {
    const content = JSON.stringify(rfInstance?.toObject(),null,2)
    const blob = new Blob([content], {type:'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'backup.json';
    link.click();
    URL.revokeObjectURL(url);
  },
  onImport: (setViewport:SetViewport) => {
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
                get().setNodes(flow.nodes || []);
                get().setEdges(flow.edges || []);
                setViewport({ x, y, zoom });
              }
            };
            restoreFlow();
          };
        }
      }
    )
  },
  onSave: (rfInstance: ReactFlowInstance | null, flowId: string | undefined, addFlowKey) => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      if(flowId !== "flowKey"){
        addFlowKey(flowId||"default");
        localStorage.setItem(flowId||"default", JSON.stringify(flow));
      }
    }
  },
  onRestore: (flowId: string | undefined, setViewport: SetViewport) => {
    const restoreFlow = async () => {
      const storedData = localStorage.getItem(flowId||"default");
      const flow = storedData ? JSON.parse(storedData) : "";
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        get().setNodes(flow.nodes || []);
        get().setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };
    restoreFlow();
  },

  onAdd: (screenToFlowPosition) => {
    const {x, y, } = screenToFlowPosition({x:window.innerWidth/2, y:window.innerHeight/2});
    console.log(x,y);
    const newNode = {
      id: nanoid(),
      data: { 
        label: 'Added node',
        targetHandle: Position.Top,
        sourceHandle: Position.Bottom,
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
        y: y,
      },
    };
    get().setNodes((nds) => nds.concat(newNode));
  },

 
}));

export default useStore;
