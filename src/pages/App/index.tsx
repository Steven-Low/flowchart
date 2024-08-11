import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  SelectionMode,
  useReactFlow,
  Panel,
  reconnectEdge,
  Position,
  useUpdateNodeInternals,


  type Node,
  type FitViewOptions,
  type ReactFlowInstance,
  type DefaultEdgeOptions,
} from '@xyflow/react';

// import style
import '@xyflow/react/dist/style.css';
import './app.css';

// import components
import ResizableNodeSelected from '../../components/resizableNodeSelected';
import ColorSwatch from '../../components/colorSwatch';
import DownloadButton from '../../components/downloadButton';
import CollapseHandler from '../../components/collapseHandler';
import SelectionBox from '../../components/selectionBox';

// import utils
import copyPasteUtil from '../../utils/copyPasteUtil';
import useStorage from '../../utils/storage';
import useStore from '../../utils/store';
import { sortNodes, findAbsolutePosition } from '../../utils/functions';


const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};



const NestedFlow = () => {
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const { setViewport, getIntersectingNodes, screenToFlowPosition } = useReactFlow();
  const edgeReconnectSuccessful = useRef(true);
  const [currentNodeLabel, setCurrentNodeLabel] = useState<String | any>('');
  const [currentNodeBg, setCurrentNodeBg] = useState<String | any>('');
  const [CurrentNodeDirec, setCurrentNodeDirec] = useState(false);
  const [currentNodeType, setCurrentNodeType] = useState('default');
  const updateNodeInternals = useUpdateNodeInternals();
  const connectingNodeId = useRef<string | null> (null);
  const [intersectingNode, setIntersectingNode] = useState<Node | any>(null);
  const [collapse, setCollapse] = useState(false);
  const { addFlowKey } = useStorage();
  const { flowId } = useParams();
  const [isSelectionBox, setSelectionBox] = useState(false);
  const [display, setDisplay] = useState("none");
  const [left, setLeft] = useState('0px');
  const [top, setTop] = useState('0px');
  const [width, setWidth] = useState('0px');
  const [height, setHeight] = useState('0px');
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const nodeTypes:any = useMemo(() => ({ resizableNode: ResizableNodeSelected }), []);
  
  const { 
    nodes, 
    edges, 
    setNodes, 
    setEdges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect,
    onExport,
    onImport,
    onSave,
    onRestore,
    onAdd,
   } = useStore();


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

  const onNodeClick = (event:any, node: Node) => {
    connectingNodeId.current = node.id;
    setCurrentNodeLabel(node.data.label||"");
    setCurrentNodeBg(node.style?.backgroundColor||"rgba(255, 255, 255, 1)");
    setCurrentNodeDirec(node.data.targetHandle === Position.Left || node.data.sourceHandle === Position.Right)
    setCurrentNodeType(node.type||"default");
    console.log('click node', node);
  } 

  const onPaneClick = useCallback((event:any) => {
    connectingNodeId.current = null;
    setCurrentNodeLabel("")
    setCurrentNodeBg("");
    setCurrentNodeDirec(false);
    setCurrentNodeType("");
    setIntersectingNode(null);
  }, []);

  
  const onNodeDragStart = (evt:any, node:Node) => {
    connectingNodeId.current = node.id;
    setCurrentNodeLabel(node.data.label||"");
    setCurrentNodeBg(node.style?.backgroundColor||"rgba(255, 255, 255, 1)");
    setCurrentNodeDirec(node.data.targetHandle === Position.Left || node.data.sourceHandle === Position.Right)
    setCurrentNodeType(node.type||"default");
    // Reset the node parent property and position so that the getIntersectingNode() ...
    // ... function will work properly :D (I spent one whole week to discover this)
    setNodes((nodes) =>
      nodes.map((n) => {
        if (n.id === node.id) {
          const absolutePosition = findAbsolutePosition(n, nodes);
            return {
              ...n,
              parentId: '',
              position: absolutePosition,
            };
        }
        return n;
      })
    );
  };

  const onNodeDrag:any = (_: MouseEvent, node:Node)=> {
    connectingNodeId.current = node.id;
    setCurrentNodeLabel(node.data.label||"");
    setCurrentNodeBg(node.style?.backgroundColor||"rgba(255, 255, 255, 1)");
    setCurrentNodeDirec(node.data.targetHandle === Position.Left || node.data.sourceHandle === Position.Right)
    setCurrentNodeType(node.type||"default");
    const intersectingNodes = getIntersectingNodes(node, false);
    setIntersectingNode(intersectingNodes[intersectingNodes.length -1]);
  };


  const onNodeDragStop = (evt: any, node: Node) => {
    const connectingNodeIdCurrent = connectingNodeId?.current;
    const children = nodes.filter(n => n.parentId === node.id);
    let sortedNodes: Node[];
    if (children.length === 0){
        sortedNodes = [...nodes].sort((a, b) => {
        if (a.id === node.id) return 1;
        if (b.id === node.id) return -1;
        return 0;
      });
    }else{
        sortedNodes = sortNodes(node, nodes);
    }
    setNodes(sortedNodes);

    setNodes((nodes) =>
      nodes.map((n) => {
        if (n.id === connectingNodeIdCurrent) {
          const absolutePosition = findAbsolutePosition(n, nodes);
          if (!intersectingNode) {
            return {
              ...n,
              parentId: '',
              position: absolutePosition,
            };
          } else if(n.id !== intersectingNode.id){
            const targetAbsolutePosition = findAbsolutePosition(intersectingNode, nodes);
            return {
              ...n,
              parentId: intersectingNode.id,
              position: {
                x: absolutePosition.x - targetAbsolutePosition.x,
                y: absolutePosition.y - targetAbsolutePosition.y,
              },
            };
          }
        }
        return n;
      })
    );
  }

const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setSelectionBox(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
    setLeft(`${startX}px`)
    setTop(`${startY}px`)
  };

const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    let currentX = 0, currentY = 0;
    currentX = e.clientX;
    currentY = e.clientY;
    const width = currentX - startX;
    const height = currentY - startY;
    setWidth(Math.abs(width) + 'px')
    setHeight(Math.abs(height) + 'px');
    setLeft(`${width > 0 ? startX : currentX}px`)
    setTop(`${height > 0 ? startY : currentY}px`)
    setDisplay('block');
}

const onMouseUp: React.MouseEventHandler<HTMLDivElement> = (event) => {
    setSelectionBox(false);
    setDisplay('none');
}

  
  // *** EDITING TOOLBARS *** //
  /*
  1) Change Label
  2) Change Handle Direction
  3) Change Node Background Color
  4) Change Node Type

  */
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === connectingNodeId.current) {
          return {
            ...node,
            data: {
              ...node.data,
              label: currentNodeLabel,
              targetHandle: (CurrentNodeDirec) ? Position.Left : Position.Top,
              sourceHandle: (CurrentNodeDirec) ? Position.Right : Position.Bottom,
            },
            style: {
              ...node.style,
              backgroundColor: currentNodeBg,
            },
            type: currentNodeType,
          };
        }
        return node;
      }),
    );
    updateNodeInternals(connectingNodeId.current || "");
  }, [currentNodeLabel, CurrentNodeDirec, currentNodeBg, currentNodeType, setNodes, updateNodeInternals]);


  useEffect(() => {
    onRestore(flowId, setViewport);
  }, [onRestore, flowId, setViewport]);
  

  return (

    <ReactFlow
      color="#ccc"
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeDrag={onNodeDrag}
      onNodeDragStart={onNodeDragStart}
      onNodeDragStop={onNodeDragStop}
      onConnect={onConnect}
      className="react-flow-flowchart"
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
      deleteKeyCode={["Backspace","Delete"]}
      selectionMode={SelectionMode.Full}
      selectionKeyCode={null}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={isSelectionBox ? onMouseMove : undefined}
    

    >
      <MiniMap />
      <Controls />
      <Background  variant={BackgroundVariant.Dots}/>
      <Panel position="bottom-left">
        <div className="button-2-container">
          <button className="button-2" onClick={() => onAdd(screenToFlowPosition)}><i className='bx bxs-shapes'></i></button>
          <button className="button-2" onClick={() => {copyPasteUtil(rfInstance, setNodes, setEdges)}}><i className='bx bxs-duplicate' ></i></button>
        </div>
      </Panel>
    
      <Panel position="top-left">
      <div className='button-1-container'>
        <Link to="/"><button className='button-1' ><i className='bx bx-home'> Home</i></button></Link>
        <button className="button-1"  onClick={() => onImport(setViewport)}><i className='bx bx-folder-open' > Open</i></button>
        <div className="tooltip open">Open FlowChart Nodes from JSON Backup (Not Save Automatically)</div>
        <button className="button-1"  onClick={() => onSave(rfInstance, flowId, addFlowKey)}><i className='bx bx-save'></i> Save</button>
        <div className="tooltip save">Save FlowChart Nodes in Browser Storage</div>
        <button className="button-1"  onClick={() => onRestore(flowId, setViewport)}><i className='bx bx-undo' ></i> Restore</button>
        <div className="tooltip restore">Restore FlowChart Nodes from Browser Storage</div>
        
        <div className="dropdown">
          <button className="button-1" ><i className='bx bx-export' ></i> Export</button>
            <div className="dropdown-content">
              <button onClick={() => onExport(rfInstance)}><i className='bx bxs-file-json' > JSON</i></button>
              <DownloadButton />
            </div>
        </div>
        
      </div>
      </Panel>
    
      <div className={collapse ? "updatenode__controls-collapse": "updatenode__controls"}>
        <label className="updatenode__label">label:</label>
        <input value={currentNodeLabel} onChange={(evt) => setCurrentNodeLabel(evt.target.value)} />

        <label className="updatenode__label">background:</label>
        <input value={currentNodeBg} onChange={(evt) => setCurrentNodeBg(evt.target.value)} />
        <ColorSwatch setCurrentNodeBg={setCurrentNodeBg}/>
        <div className="dropdown">
          <label className="updatenode__label">handle direction:</label>
          <button className="dropbtn">{ CurrentNodeDirec ? "left right": "top down"}</button>
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
      <CollapseHandler collapse={collapse} setCollapse={setCollapse} />
      <SelectionBox 
        display={display} 
        left={left}
        top={top}
        width={width}
        height={height}/>
    </ReactFlow>

  );
};




export default NestedFlow;

